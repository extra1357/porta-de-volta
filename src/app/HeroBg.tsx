'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
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
      {FOTOS.map((foto, i) => (
        <div
          key={foto}
          className={[
            styles.heroBgSlide,
            i === atual ? styles.heroBgAtiva : '',
            i === proxima ? (fadeIn ? styles.heroBgVisivel : styles.heroBgOculta) : '',
          ].join(' ')}
        >
          <Image
            src={foto}
            alt=""
            fill
            sizes="100vw"
            quality={i === 0 ? 85 : 75}
            priority={i === 0}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}
    </div>
  )
}
