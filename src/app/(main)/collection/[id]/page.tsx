"use client"

import CollectionInfo from '@/components/widgets/common/collection/collectionInfo/CollectionInfo'
import styles from './styles.module.css'
import { api } from '@/lib/axios'
import { collectionApi } from '@/lib/api/collectionApi'
import { getCookie } from '@/utils/cookie/server-cookie'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ICollection } from '@/types/collection.type'
import { musicApi } from '@/lib/api/musicApi'
import Track from '@/components/widgets/track/Track'
import TrackList from '@/components/widgets/trackList/TrackList'
import { IMusic } from '@/types/music.type'


export default function Collection () {
    const [musics, setMusics] = useState<IMusic[]>([])
    const [collection, setCollection] = useState<ICollection | null>(null)
    const params = useParams()
    const id = params.id as string

    const {data} = useQuery({
        queryKey: ['Collection', id],
        queryFn: () => collectionApi.getMyPlaylist(id as string),
        enabled: !!id
    });

    useEffect(() => {
        if (data) setCollection(data)
        
        return () => {
            setCollection(null)
        }
    }, [data])

    useEffect(() => {
        if (!id) return

        const getMusics = async () => {
            const musics = await collectionApi.getAllMusicInCollection(id)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newMusics = musics.map((m: any) => {
                return {
                    id: m.music.id,
                    name: m.music.name,
                    author: {
                        name: m.music.author.name,
                        id: m.music.author.id
                    },
                    filename: m.music.filename,
                    image: m.music.image,
                    duration: m.music.duration,
                }
            })
            setMusics(newMusics)
        }

        getMusics()
    }, []) 

    if (!collection) return null

    return (
        <div className={styles.wrapper}>
            <CollectionInfo collection={collection} />
            <div className='mt-5'>
                <TrackList musics={musics} />
            </div>
        </div>
    )
}