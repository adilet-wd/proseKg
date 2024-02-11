import React from 'react'
import styles from './page.module.scss';
import { Container } from 'react-bootstrap';

export default function Colors() {
return (
<Container>
        <div className={styles.colorWrapper}>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#EA1E63' }}></div>
                        <div className={styles.colorName}>#EA1E63</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#00AEEF' }}></div>
                        <div className={styles.colorName}>#00AEEF</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#4CAF50' }}></div>
                        <div className={styles.colorName}>#4CAF50</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#2196F3' }}></div>
                        <div className={styles.colorName}>#2196F3</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#D2B48C' }}></div>
                        <div className={styles.colorName}>#D2B48C</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#00AEEF' }}></div>
                        <div className={styles.colorName}>#00AEEF</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#795548' }}></div>
                        <div className={styles.colorName}>#795548</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#FF9800' }}></div>
                        <div className={styles.colorName}>#FF9800</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#8B4513' }}></div>
                        <div className={styles.colorName}>#8B4513</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#9C27B0' }}></div>
                        <div className={styles.colorName}>#9C27B0</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#FFEB3B' }}></div>
                        <div className={styles.colorName}>#FFEB3B</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#B71C1C' }}></div>
                        <div className={styles.colorName}>#B71C1C</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#9E9E9E' }}></div>
                        <div className={styles.colorName}>#9E9E9E</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#607D8B' }}></div>
                        <div className={styles.colorName}>#607D8B</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#8BC34A' }}></div>
                        <div className={styles.colorName}>#8BC34A</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#E8112D' }}></div>
                        <div className={styles.colorName}>#E8112D</div> 
                </div>
                <div className={styles.colorItem}>
                        <div className={styles.colorBlock} style={{ backgroundColor: '#FFD700' }}></div>
                        <div className={styles.colorName}>#FFD700</div> 
                </div>
        </div>
</Container>
)
}
