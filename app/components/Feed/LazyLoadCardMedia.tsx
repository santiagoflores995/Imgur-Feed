'use client'

import {
  useSelector,
  useDispatch,
  selectImages,
  fetchMoreImagesAsync,
} from '@/lib/redux'
import styles from './Feed.module.css'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

type LazyLoadMediaProps = {
  title: string
  height: number
  src: string
  type: string
  isLast: boolean
}

export function LazyLoadCardMedia({
  src,
  type,
  height,
  isLast,
  title,
}: LazyLoadMediaProps) {
  const dispatch = useDispatch()
  const { loading } = useSelector(selectImages)
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    rootMargin: '200px 0px',
  })

  const [showBackground, setShowBackground] = useState(true)

  function handleLoad() {
    setShowBackground(false)
  }

  if (isLast && inView && !loading) {
    dispatch(fetchMoreImagesAsync())
  }
  
  return (
    <div
      ref={ref}
      className={styles.media}
      style={
        showBackground
          ? {
              height: `${height > 517 ? 517 : height}px`,
              background: 'linear-gradient(#555, rgb(46, 48, 53))',
            }
          : {}
      }
    >
      {
        inView && type.includes('video') ? (
          <video src={src} autoPlay muted loop onCanPlay={handleLoad} />
        ) : (
          <img src={src} onLoad={handleLoad} alt={title} />
        )
        // : <></>
      }
    </div>
  )
}
