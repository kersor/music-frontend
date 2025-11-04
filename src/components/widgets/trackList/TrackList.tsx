"use client"
import React, { useState } from 'react'
import styles from './styles.module.css'
import Track from '../track/Track'
import { IMusic } from '@/types/music.type'
import { useChooseTrack } from '@/store/useChooseTrack'

const TrackList = () => {
    const [musics, setMusics] = useState<IMusic[]>([
      {
          id: "3894y7hfr38942",
          name: "Berserk: Guts",
          author: "Eliott Tordo Erhu",
          link: "2.mp3",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHeElOl8JW_xRRsceP7C65hSJ8v-JdOkCGUg&s",
          duration: 215
      },
      {
          id: "894f05h7jgt034pt",
          name: "паспорт",
          author: "интакто",
          link: "интакто - паспорт.mp3",
          image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0b/db/d4/0bdbd4b8-3837-f5cc-f3dd-1d9420b6ecd5/cover.jpg/600x600bf-60.jpg",
          duration: 148
      }
  ])
  
    const trackId = useChooseTrack(state => state.track?.id)
    const actions = useChooseTrack(state => state.actions)


    const funncTogglePlay = React.useCallback((music: IMusic, playlist: IMusic[]) => {
        if (trackId !== music.id) {
            actions.setTrack(music, playlist)
        } else {
            actions.togglePlay()
        }
    }, [trackId, actions])
  
  return (
    <div>
        {
            musics.map((music) => (
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