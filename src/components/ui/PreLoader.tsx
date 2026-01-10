'use client';

import { useEffect, useState } from 'react';
import styles from './PreLoader.module.css';

export default function PreLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const minDisplayTime = 2000; // Мінімальний час показу: 2 секунди

    // Hide loader after page is fully loaded
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        // Start fade out
        setIsFading(true);
        // Remove from DOM after fade animation completes
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }, remainingTime);
    };

    // Перевіряємо стан завантаження
    if (typeof window !== 'undefined') {
      // Завжди показуємо loader мінімальний час, навіть якщо сторінка вже завантажена
      // Це забезпечує, що користувач завжди побачить анімацію
      if (document.readyState === 'complete') {
        // Якщо сторінка вже завантажена, все одно показуємо loader мінімальний час
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        // Також додаємо fallback на випадок, якщо load event не спрацює
        const timeout = setTimeout(() => {
          handleLoad();
        }, minDisplayTime + 1000);
        
        return () => {
          window.removeEventListener('load', handleLoad);
          clearTimeout(timeout);
        };
      }
    }
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
