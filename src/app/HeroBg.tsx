'use client'

import { useEffect, useState } from 'react'
import styles from './HeroBg.module.css'

const FOTOS = [
  '/images/hero-bg.jpg',
  '/images/hero-bg2.jpg',
  '/images/hero-bg3.jpg',
]

export default function HeroBg() {
  const [atual, setAtual] = useState(0)
  const [proxima, setProxima] = useState<number | null>(null)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const intervalo = setInterval(() => {
      const prox = (atual + 1) % FOTOS.length
      setProxima(prox)
      setFadeIn(false)
      setTimeout(() => setFadeIn(true), 50)
      setTimeout(() => {
        setAtual(prox)
        setProxima(null)
        setFadeIn(false)
      }, 1000)
    }, 6000)
    return () => clearInterval(intervalo)
  }, [atual])

  return (
    <div className={styles.heroBgWrap} aria-hidden="true">
      <div
        key={'atual-' + atual}
        className={styles.heroBgSlide + ' ' + styles.heroBgAtiva}
        style={{ backgroundImage: `url(${FOTOS[atual]})` }}
      />
      {proxima !== null && (
        <div
          key={'prox-' + proxima}
          className={styles.heroBgSlide + ' ' + (fadeIn ? styles.heroBgVisivel : styles.heroBgOculta)}
          style={{ backgroundImage: `url(${FOTOS[proxima]})` }}
        />
      )}
    </div>
  )
}
