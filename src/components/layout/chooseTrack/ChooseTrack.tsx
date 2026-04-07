"use client"

import React, { ChangeEvent, useEffect, useRef } from 'react'
import { Pause, Play, Repeat, Repeat1, SkipBack, SkipForward, Volume2Icon, VolumeX } from 'lucide-react'
import Image from 'next/image'
import { useChooseTrack } from '@/store/useChooseTrack'


const ChooseTrack = () => {
    const ref = useRef<HTMLAudioElement | null>(null)
    const progressRef = useRef<HTMLInputElement | null>(null)
    const volumeRef = useRef<HTMLInputElement | null>(null)

    const track = useChooseTrack(state => state)

    useEffect(() => {
      const music = ref.current
      if (!music) return

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
        refProgress.style.background = `linear-gradient(to right, var(--card-foreground) ${progressValue}%, var(--muted) ${progressValue}%)`

        if (music.duration === music.currentTime) {
          track.actions.setPlay(false)
        }
        track.actions.setProgress(music.currentTime)
    }

    const handleVolume = () => {
        const music = ref.current
        const volume = volumeRef.current
        if (!music || !volume) return

        const value = +volume.value
        const percent = value * 100
        volume.style.background = `linear-gradient(to right, var(--card-foreground) ${percent}%, var(--muted) ${percent}%)`


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
      <div className='relative mt-auto mx-[var(--margin-main)] pt-3 p-2 flex items-center justify-between rounded-[10px] border border-foreground/10 bg-card text-card-foreground'>
        <input 
            ref={progressRef}
            className='appearance-none absolute top-0 translate-y-[75%] w-[calc(100%-var(--margin-main))] h-[5px] bg-muted outline-none rounded-[10px] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:bg-transparent'
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
          <div className='font-bold text-card-foreground'>
              <div className='text-card-foreground'>{track.track?.name}</div>
              <div className='text-muted-foreground'>{track.track?.author.name}</div>
          </div>
        </div>
        <div className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-3'>
              <button onClick={track.actions.prevTrack} className='cursor-pointer'>
                <SkipBack size={20} className='text-card-foreground' />
              </button>
              <button onClick={track.actions.togglePlay} className='size-[50px] bg-muted rounded-full cursor-pointer'>
                <div className='flex items-center justify-center w-full h-full text-card-foreground'>
                    {
                        track.options.isPlay ? <Pause size={20} /> : <Play size={20} />
                    }
                </div>
              </button>
              <button onClick={track.actions.nextTrack} className='cursor-pointer'>
                <SkipForward size={20} className='text-card-foreground' />
              </button>
            </div>

            <div className='flex items-center'>
              <button className='cursor-pointer' onClick={handleRepeat}>
                {
                  track.options.isRepeat 
                  ? <Repeat1 size={20} className='text-card-foreground' />
                  : <Repeat size={20} className='text-card-foreground' />
                }
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='relative group'>
            <button className="cursor-pointer" onClick={handleMute}>
              {
                !track.options.isMute  
                ? <Volume2Icon size={20} className='text-card-foreground' /> 
                : <VolumeX size={20} className='text-card-foreground' />
              }
            </button>
            <div className='absolute top-[-5px] left-0 w-[20px] h-[200px] -translate-y-full bg-card border border-foreground/10 rounded-[10px] p-[5px] z-[-1] opacity-0 transition-all duration-300 group-hover:z-10 group-hover:opacity-100 flex items-center justify-center'>
              <input 
                  ref={volumeRef}
                  type="range"
                  min={0}
                  max={1}
                  value={track.options.volume}
                  onChange={handleVolume}
                  step={0.1}
                  className='absolute appearance-none w-[180px] h-[5px] -rotate-90 cursor-pointer rounded-[10px] bg-muted'
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
