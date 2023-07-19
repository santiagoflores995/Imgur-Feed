'use client'

import { ChangeEvent, useEffect } from 'react'
import {
  useSelector,
  useDispatch,
  fetchImagesAsync,
  imgurSlice,
} from '@/lib/redux'
import { selectImages } from '@/lib/redux/slices/imgurSlice'
import { Feed } from '../Feed/Feed'
import styles from './Home.module.css';

export const Home = () => {
  const dispatch = useDispatch()
  const {section, window, showViral, sort} = useSelector(selectImages)

  const handleSectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(imgurSlice.actions.setSection(e.target.value))
  } 
  const handleWindowChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(imgurSlice.actions.setWindow(e.target.value))
  } 
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(imgurSlice.actions.setSort(e.target.value))
  }
  const handleShowViralChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(imgurSlice.actions.setShowViral(e.target.checked))
  }

  useEffect(() => {
    dispatch(fetchImagesAsync())
  }, [section, window, showViral, sort])

  return (
    <div style={{maxWidth: '100%'}}>
      <div className={styles.header}>
        <div className={styles.inputs}>
            <select className={styles.dropdown} value={section} onChange={handleSectionChange}>
              <option value="hot">Most Viral</option>
              <option value="top">Highest Scoring</option>
              <option value="user">User Submitted</option>
            </select>
            {section === 'top' && (
              <select className={styles.dropdown} value={window} onChange={handleWindowChange}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="all">All</option>
              </select>
            )}
            <select className={styles.dropdown} value={sort} onChange={handleSortChange}>
              <option value="top">Top</option>
              <option value="viral">Viral</option>
              <option value="time">Newest</option>
              {section === 'user' && (
                <option value="rising">Rising</option>
              )}
            </select>
          <div className={styles.checkbox}>
            <input type="checkbox" checked={showViral} onChange={handleShowViralChange}/>
            <label>Show Viral</label>
          </div>
        </div>
      </div>
      <Feed />
    </div>
  )
}
