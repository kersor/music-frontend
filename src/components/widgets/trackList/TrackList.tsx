"use client"
import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import Track from '../track/Track'
import { IMusic } from '@/types/music.type'
import { useChooseTrack } from '@/store/useChooseTrack'
import { useMutation, useQuery } from '@tanstack/react-query'
import { collectionApi } from '@/lib/api/collectionApi'
import { queryClient } from '@/lib/queryClient'
import { useRouter } from 'next/navigation'

interface Props {
    musics: IMusic[]
}

const TrackList = ({
    musics
}: Props) => { 
    const router = useRouter()
    const [collections, setCollections] = useState<any[]>([])
    
    const trackId = useChooseTrack(state => state.track?.id)
    const actions = useChooseTrack(state => state.actions)

    const {data} = useQuery({
        queryKey: ['Collection'],
        queryFn: collectionApi.getMyPlaylists,
    })

    
    const {mutateAsync} = useMutation({
        mutationFn: collectionApi.create,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['Collection'] });
        }
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

    const funcCreateNewCollection = useCallback(async () => {
        try {
            const result = await mutateAsync()
            console.log(result)
            router.push(`/collection/${result.id}`)
        } catch (error) {
            console.log('Error: ', error)
        }        
    }, [mutateAsync, router])

    const funcAddMusicInCollection = useCallback(async (collectionId: string, musicId: string) => {
        try {
            await collectionApi.addMusicInCollection(collectionId, musicId)

            router.push(`/collection/${collectionId}`)
        } catch (error) {
            console.log('Error: ', error)
        }        
    }, [router])


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
                        funcCreateNewCollection={funcCreateNewCollection}
                        funcAddMusicInCollection={funcAddMusicInCollection}
                    />
                ))
            }
        </div>
    )
}

export default TrackList