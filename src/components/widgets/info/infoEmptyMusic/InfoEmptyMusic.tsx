import React from 'react'
import styles from './styles.module.css'

const InfoEmptyMusic = () => {
  return (
    <div className={styles.container}>
        <div className={styles.info}>
            Музыки пока нет 😔
        </div>
    </div>
  )
}

export default InfoEmptyMusic