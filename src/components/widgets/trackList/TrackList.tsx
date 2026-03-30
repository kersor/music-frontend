"use client"
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Track from '../track/Track'
import { IMusic } from '@/types/music.type'
import { useChooseTrack } from '@/store/useChooseTrack'
import { useQuery } from '@tanstack/react-query'
import { collectionApi } from '@/lib/api/collectionApi'

interface Props {
    musics: IMusic[]
}

const TrackList = ({
    musics
}: Props) => { 
    const [collections, setCollections] = useState<any[]>([])
    
    const trackId = useChooseTrack(state => state.track?.id)
    const actions = useChooseTrack(state => state.actions)

    const {data} = useQuery({
        queryKey: ['Collection'],
        queryFn: collectionApi.getMyPlaylists,
    })

    useEffect(() => {
        if (!data) return

        setCollections(data)
    }, [data])



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
                        collections={collections}
                    />
                ))
            }
        </div>
    )
}

export default TrackList