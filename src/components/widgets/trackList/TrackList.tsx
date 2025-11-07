"use client"
import React, { useState } from 'react'
import styles from './styles.module.css'
import Track from '../track/Track'
import { IMusic } from '@/types/music.type'
import { useChooseTrack } from '@/store/useChooseTrack'

interface Props {
    musics: IMusic[]
}

const TrackList = ({
    musics
}: Props) => {  
    const trackId = useChooseTrack(state => state.track?.id)
    const actions = useChooseTrack(state => state.actions)


    const funncTogglePlay = React.useCallback((music: IMusic, playlist: IMusic[]) => {
        if (trackId !== music.id) {
            actions.setTrack(music, playlist)
        } else {
            actions.togglePlay()
        }
    }, [trackId, actions])

    if (!musics) return

  
  return (
    <div>
        {
            musics.length && musics.map((music) => (
                <Track
                  key={music.id}
                  music={music}
                  playlist={musics}
                  funncTogglePlay={funncTogglePlay}
                />
            ))
        }
    </div>
  )
}

export default TrackList