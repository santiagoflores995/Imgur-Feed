'use client'

import Masonry from 'react-masonry-css'
import styles from './Feed.module.css'

type CardGridProps = {
  cards: JSX.Element[]
}

export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1100: 2,
    700: 1,
  }

  return (
    <div className={styles.feed}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.grid}
        columnClassName={styles.gridColumn}
      >
        {cards.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </Masonry>
    </div>
  )
}
