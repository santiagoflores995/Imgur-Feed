'use client'

import { useSelector, selectImages } from '@/lib/redux'
import { CardGrid } from './CardGrid'
import styles from './Feed.module.css'
import { LazyLoadCardMedia } from './LazyLoadCardMedia'

export const Feed = () => {
  const images = useSelector(selectImages)
  const cards = images.feedGalleries.map((gallery, index) => {
    return (
      <a key={index} href={`/${gallery.id}?isAlbum=${gallery.isAlbum}`}>
        <div key={gallery.id} className={styles.card}>
          <LazyLoadCardMedia
            title={gallery.title}
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
    )
  })

  return (
    <>
      <CardGrid cards={cards} />
      {images.loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader} />
        </div>
      )}
    </>
  )
}
