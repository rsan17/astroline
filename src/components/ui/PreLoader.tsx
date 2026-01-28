'use client';

import { useEffect, useState } from 'react';
import styles from './PreLoader.module.css';

export default function PreLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Простий та надійний підхід - завжди ховаємо через 3 секунди
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.gameLoader} ${isFading ? styles.fading : ''}`}>
      <div className={styles.gameLoaderPlanet}>
        <div className={styles.loaderRadius1}></div>
        <div className={styles.loaderRadius2}></div>
        <div className={styles.loaderRadius3}></div>
        <div className={styles.loaderRadius4}></div>
        <div className={styles.loaderMini1}></div>
        <div className={styles.loaderMini2}></div>
        <div className={styles.loaderMini3}></div>
        <div className={styles.loaderMini4}></div>
      </div>
    </div>
  );
}
