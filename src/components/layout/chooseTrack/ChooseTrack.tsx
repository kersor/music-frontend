"use client"

import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { ChevronFirst, ChevronLast, Heart, Pause, Play, Repeat, Repeat1, SkipBack, SkipForward, Volume2Icon, VolumeIcon, VolumeX } from 'lucide-react'
import styles from './styles.module.css'
import Image from 'next/image'
import { useChooseTrack } from '@/store/useChooseTrack'


const ChooseTrack = () => {
    const ref = useRef<HTMLAudioElement | null>(null)
    const progressRef = useRef<HTMLInputElement | null>(null)
    const volumeRef = useRef<HTMLInputElement | null>(null)

    const track = useChooseTrack(state => state)

    console.log(track)
    useEffect(() => {
      const music = ref.current
      if (!music) return

      console.log(music)
      if (track.options.isPlay) music.play()
      else music.pause()
    }, [track.options.isPlay, track.track])

    const handleProgress = (e: ChangeEvent<HTMLInputElement>) => {
        const music = ref.current
        if (!music) return
        
        const time = +e.target.value
        
        music.currentTime = time
        track.actions.setProgress(time)
    }

    const handleOnTimeUpdate = () => {
        const music = ref.current
        const refProgress = progressRef.current
        if (!music || !refProgress) return

        const progressValue = +music.currentTime / track.options.duration * 100
        refProgress.style.background = `linear-gradient(to right, #999797 ${progressValue}%, #e5e7eb ${progressValue}%)`

        if (music.duration === music.currentTime) {
          track.actions.setPlay(false)
        }
        track.actions.setProgress(music.currentTime)
    }

    const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
        const music = ref.current
        const volume = volumeRef.current
        if (!music || !volume) return

        const value = +volume.value
        const percent = value * 100
        volume.style.background = `linear-gradient(to right, #999797 ${percent}%, #e5e7eb ${percent}%)`


        if (percent === 0) track.actions.setMute(true)
        else track.actions.setMute(false)

        music.volume = value
        track.actions.setVolume(value)
    }
    
    const handleMute = () => {
      const music = ref.current
      const refVolume = volumeRef.current
      if (!music || !refVolume) return

      music.volume = !track.options.isMute ? 0 : track.options.volume
      track.actions.setMute(!track.options.isMute)
    }

    const handleRepeat = () => {
      const music = ref.current
      if (!music) return

      music.loop = !track.options.isRepeat
      track.actions.setRepeat(!track.options.isRepeat)
    }


    if (track.track === null) return null

    return (
      <div className={styles.track}>
        <input 
            ref={progressRef}
            className={styles.track_progress}
            type="range"
            min="0"
            max={track.options.duration}
            value={track.options.progress}
            onChange={handleProgress}
            step="0.1"
        />
        <div className='flex items-center gap-2'>
          <div className='relative w-20 h-20'>
              <Image
                  src={`http://localhost:8080/uploads/files/photo/${track.track.image}`}
                  alt='photo'
                  fill
                  objectFit='cover' 
                  className='rounded-md'
              />
          </div>
          <div className='font-bold'>
              <div className=' text-[#504f4f]'>{track.track?.name}</div>
              <div>{track.track?.author.name}</div>
          </div>
        </div>
        <div className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-3'>
              <button onClick={track.actions.prevTrack} className='cursor-pointer'>
                <SkipBack size={20} color='#504f4f' />
              </button>
              <button onClick={track.actions.togglePlay} className={styles.track_icon}>
                <div className='flex items-center justify-center w-full h-full'>
                    {
                        track.options.isPlay ? <Pause size={20} color='#504f4f'/> : <Play size={20} color='#504f4f'/>
                    }
                </div>
              </button>
              <button onClick={track.actions.nextTrack} className='cursor-pointer'>
                <SkipForward size={20} color='#504f4f' />
              </button>
            </div>

            <div className='flex items-center'>
              <button className='cursor-pointer' onClick={handleRepeat}>
                {
                  track.options.isRepeat 
                  ? <Repeat1 size={20} color='#504f4f' />
                  : <Repeat size={20} color='#504f4f' />
                }
              </button>
            </div>
          </div>
        </div>
        <div className={styles.settings}>
          <div className={styles.settings_volume} >
            <button className="cursor-pointer" onClick={handleMute}>
              {
                !track.options.isMute  
                ? <Volume2Icon size={20} color='#504f4f' /> 
                : <VolumeX size={20} color='#504f4f' />
              }
            </button>
            <div className={styles.track_volume} >
              <input 
                  ref={volumeRef}
                  type="range"
                  min={0}
                  max={1}
                  value={track.options.volume}
                  onChange={handleVolume}
                  step={0.1}
                  className={styles.track_volume__input}
              />
            </div>
          </div>      
        </div>

        <audio 
            onTimeUpdate={handleOnTimeUpdate}
            ref={ref}
            src={`http://localhost:8080/uploads/files/music/${track.track?.filename}`}
        ></audio>
      </div>
    )
}

export default ChooseTrack