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


export default function Collection () {
    const [collection, setCollection] = useState<ICollection | null>(null)
    const params = useParams()
    const id = params.id

    const {data} = useQuery({
        queryKey: ['Collection'],
        queryFn: () => collectionApi.getMyPlaylist(id),
        enabled: !!id
    });

    useEffect(() => {
        if (data) setCollection(data)
    }, [data])
    console.log(collection?.image)

    if (!collection) return null

    return (
        <div className={styles.wrapper}>
            <CollectionInfo collection={collection} />
        </div>
    )
}