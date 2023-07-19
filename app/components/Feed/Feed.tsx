'use client'

import {
  useSelector,
  useDispatch,
  selectImages,
  fetchMoreImagesAsync,
} from '@/lib/redux'
import { CardGrid } from './CardGrid'
import styles from './Feed.module.css';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export const Feed = () => {
  const images = useSelector(selectImages)
  const cards = images.feedGalleries.map(
    (gallery, index) => {
    return <a href={`/${gallery.id}?isAlbum=${gallery.isAlbum}`}>
      <div 
          key={gallery.id} 
          className={styles.card}
        >
          <LazyLoadMedia 
            src={gallery.cover.link} 
            type={gallery.cover.type} 
            height={gallery.cover.height}
            isLast={index === images.feedGalleries.length - 1}
          />
        <div className={styles.title}>
          <span>{gallery.title}</span>
        </div>
      </div>
    </a>
    }
  )

  return (
    <>
      <CardGrid cards={cards} />
      {true && 
        <div className={styles.loaderContainer}>
          <div className={styles.loader}/>
        </div>
      }
    </>
  )
}

type LazyLoadMediaProps = {
  height: number;
  src: string;
  type: string;
  isLast: boolean;
}

function LazyLoadMedia({src, type, height, isLast}: LazyLoadMediaProps) {
  const dispatch = useDispatch()
  const { loading } = useSelector(selectImages)
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    rootMargin: "200px 0px"
  })

  const [showBackground, setShowBackground] = useState(true)
  
  function handleLoad() {
    setShowBackground(false)
  }

  if(isLast && inView && !loading) {
    console.log('last is visible, fetch more', entry)
    dispatch(fetchMoreImagesAsync())
  }

  return <div 
    ref={ref} 
    className={styles.media} 
    style={showBackground 
      ? {height: `${height > 517 ? 517 : height}px`, background: "linear-gradient(rgb(67, 208, 189), rgb(46, 48, 53))"} 
      : {}
    }
  >
   {
      inView && 
      type === "video/mp4"
        ? <video src={src} autoPlay muted loop onCanPlay={handleLoad}/>
        : <img src={src} loading="lazy" onLoad={handleLoad}/>
   }
  </div>
}