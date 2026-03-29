'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import CollectionCreate from '../collection/CollectionCreate'
import Collecetion from '../collection/Collecetion'
import { useQuery } from '@tanstack/react-query'
import { collectionApi } from '@/lib/api/collectionApi'
import InfoEmptyMusic from '../info/infoEmptyMusic/InfoEmptyMusic'
import { ICollection } from '@/types/collection.type'

const CollectionList = () => {
    const [collections, setCollections] = useState<ICollection[]>([])

    const {data} = useQuery({
        queryKey: ['Collection'],
        queryFn: collectionApi.getMyPlaylists,
    })

    useEffect(() => {
        if (data) setCollections(data)
    }, [data])

    return (
        <div className={styles.collection_list}>
            <CollectionCreate />
            {
                !!collections.length &&
                    collections.map((playlist: ICollection) => (
                        <Collecetion key={playlist.id} collection={playlist} />
                    ))
            }
        </div>
    )
}

export default CollectionList