"use client"

import React, { memo } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { Music, Pause, Play } from 'lucide-react'
import { useChooseTrack } from '@/store/useChooseTrack'
import Link from 'next/link'

interface Props {
    collection: any
}

const Collecetion = ({
    collection
}: Props) => {
    const track = useChooseTrack(state => state)
  return (
    <Link href={`/collection/${collection.id}`} className={styles.collection}>
        <div className={styles.collection_back}>
            {
                collection.image ? (
                    <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDUZqyAjDc-cVBLEZ-ulHqYeNrLzvTyheolw&s'
                        fill
                        objectFit='cover'
                        alt='back'
                    />
                ) : (
                    <Music />
                )
            }
            <div className={styles.collection_background}>
                <button onClick={
                    // track.actions.togglePlay
                    e => {
                        e.preventDefault();
                        console.log(123)
                    }
                } className={styles.collection_icon}>
                    <div className='flex items-center justify-center w-full h-full'>
                        {track.options.isPlay ? <Pause size={20} color='#504f4f'/> : <Play size={20} color='#504f4f'/>}
                    </div>
                </button>
            </div>
        </div>
        <div className={styles.collection_name}>
            {collection.name}
        </div>
    </Link>
  )
}

export default memo(Collecetion)