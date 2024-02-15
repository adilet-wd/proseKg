import React from 'react'
import { Container } from 'react-bootstrap'

export default function HeaderLoadingScreen() {
  return (
    <header className="header header-loading-screen">
      <Container>
        <div className="header-loading-screen__block">
        <div className="loading-screen__left">
          <div className="loading-bar loading-bar__logo">
          </div>
        </div>
        <div className="loading-screen__right">
          <div className="loading-bar">
          </div>
          <div className="loading-bar">
          </div>
        </div>
        </div>
      </Container>
    </header>
    )
}
