import { Heart, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import React, { memo, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { IMusic } from '@/types/music.type'
import { useChooseTrack } from '@/store/useChooseTrack'
import clsx from 'clsx'
import { formatTime } from '@/utils/format/formatTime'

interface Props {
    music: IMusic
    playlist: IMusic[]
    funncTogglePlay: (music: IMusic, playlist: IMusic[]) => void
}

const Track = ({
    music,
    playlist,
    funncTogglePlay
}: Props) => {    
    const trackId = useChooseTrack(state => state.track?.id)
    const isPlay = useChooseTrack(state => state.options.isPlay)

    const time = formatTime(music.duration)

    const IconPlay = () => {
        if (trackId !== music.id) {
            return (
                <button onClick={() => funncTogglePlay(music, playlist)} className={styles.track_icon}>
                    <div className='flex items-center justify-center w-full h-full rounded-full bg-white'>
                        <Play size={15} />
                    </div>
                </button>
            )
        } else {
            
            return (
                <button onClick={() => funncTogglePlay(music, playlist)} className={
                    clsx(
                        styles.track_icon,
                        trackId === music.id
                            && styles.track_icon__visible 
                    )
                }>
                    {/* Play */}
                    <div className={clsx(
                        styles.track_icon__play,
                        'rounded-full bg-white',
                        isPlay ? 'opacity-100' : 'opacity-0'
                    )}>
                        <div className={styles.track_icon__circle_inner} />
                    </div>

                    {/* Hover/Static */}
                    <div className={
                        clsx(
                            styles.track_icon__hst,
                            !isPlay && 'bg-white rounded-full'
                        )
                    }>
                        {isPlay ? <Pause size={15} /> : <Play size={15} />}
                    </div>

                </button>
            )
        }
    }

    return (
        <div className={styles.track}>
            <div className='flex items-center text-sm justify-between'>
                <div className='flex gap-2'>
                    <div className='relative w-10 h-10'>
                        <Image 
                            src={music.image}
                            alt='photo'
                            fill
                            objectFit='cover' 
                            className='rounded-md'
                        />
                        <IconPlay />
                    </div>
                    <div className='font-bold'>
                        <div className=' text-[#504f4f]'>{music.name}</div>
                        <div>{music.author}</div>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <Heart size={20} />
                    <div className='font-bold'>{time}</div>
                </div>
            </div>
        </div>
    )
}

export default memo(Track)