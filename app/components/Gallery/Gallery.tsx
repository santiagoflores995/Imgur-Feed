'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  useSelector,
  useDispatch,
  selectImages,
  fetchGalleryAsync,
} from '@/lib/redux'
import styles from './Gallery.module.css';
import { MdArrowBack, MdArrowUpward, MdArrowDownward, MdScoreboard } from 'react-icons/md';

export const Gallery = () => {
  const [_, id] = usePathname().split('/')
  const searchParams = useSearchParams()
  const isAlbum = searchParams.get('isAlbum') !== "false"
  
  const dispatch = useDispatch()
  const {selected} = useSelector(selectImages)
  
  useEffect(() => {
    dispatch(fetchGalleryAsync(id, isAlbum))
  }, [id, isAlbum])

  return (
    <>
      {
        selected &&
        <div className={styles.page}>
          <div className={styles.header}>
            <div className={styles.backSection}>
            <a href="/">
              <MdArrowBack />
            </a>
            </div>
            <div className={styles.titleSection}>
              <div className={styles.topSection}>
                <span>{selected.title}</span>
              </div>
              <div className={styles.bottomSection}>
                <div className={styles.statsSection}>
                  <MdArrowUpward />
                  <span>{selected.ups}</span>
                </div>
                <div className={styles.statsSection}>
                  <MdArrowDownward />
                  <span>{selected.downs}</span>
                </div>
                <div className={styles.statsSection}>
                  <MdScoreboard />
                  <span>{selected.score}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.galleryContent}>
            {
              isAlbum && selected.images && selected.images.map((image, index) => {
                return <div className={styles.galleryMedia} key={index}>
                      {
                        image.type === "video/mp4"
                        ? <video src={image.link} muted loop autoPlay controls/>
                        : <img src={image.link} loading="lazy" />
                      }
                    <p>{image.description}</p>
                  </div>
              })
            }
            {
              !isAlbum && 
              <div className={styles.galleryMedia}>
                {
                  selected.type === "video/mp4"
                  ? <video src={selected.link} muted loop autoPlay controls/>
                  : <img src={selected.link} loading="lazy" />
                }
                <p>{selected.description}</p>
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}