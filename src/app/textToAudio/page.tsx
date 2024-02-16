"use client";
import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/authContext';
import { Container } from 'react-bootstrap';
import axios from 'axios';

export default function Page() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const { refreshToken, setRefreshToken } = authContext || {};
  const { accessToken, setAccessToken } = authContext || {};
  const [audio, setAudio] = useState('');
  const [audioLoading, setAudioLoading] = useState(false);
  const [textForm, setTextForm] = useState('');

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextForm(e.target.value);
  }

  async function ttsRequest(data: string) {
    try {
      setAudioLoading(true);
      const res = await axios.post(
        `${process.env.API_ROUTE}/content/user_gen_text/`,
        {text : data}
      );
      if(res.status === 200) {
        setAudioLoading(false);
        setAudio(`http://217.151.230.35:999${res.data.audio_url}`)
      }
      console.log(res);
      return res;
    } catch (error) {
      if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
      return (error as any)?.response;
    }
  }
  function handleSubmit(){
    if(textForm.length > 0) {
      console.log('Отправка запроса');
      ttsRequest(textForm);
    };
  }
  return (
    <Container className='tts-container'>
      <div className='tts-title'><h1>Текстти аудиого которуу</h1></div>
      <div className='tts-content'>
        <div className='tts-left'>
          <textarea
            className='tts-textarea'
            placeholder='Текстти жазыңыз'
            value={textForm}
            onChange={handleTextChange}
            maxLength={2000}
          ></textarea>
        </div>
        <div className="tts-right">
          <button className="tts-send__button" onClick={handleSubmit}>Отправить</button>
          {audioLoading && <div className='tts-loader'>Загрузка</div>}
          {audio !== "" ? <>
          <div className='tts-audio'>
            <audio controls className='tts-audio-control' key={audio}>
              Сиздин браузерде аудио файлдарды ойнотууга мүмкүнчүлүк бар эмес
              <source src={`${audio}`} type='audio/mpeg'/>              
            </audio>
          </div>
          </> : null}
        </div>
      </div>
    </Container>
  )
}
