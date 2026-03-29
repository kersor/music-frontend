"use client"

import React from 'react'
import styles from './styles.module.css'
import { Plus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { collectionApi } from '@/lib/api/collectionApi'
import { useRouter } from 'next/navigation'
import { ListPagesConfig } from '@/config/pages'
import { queryClient } from '@/lib/queryClient'

const CollectionCreate = () => {
    const router = useRouter()

    const mutationCreateCollection = useMutation({
        mutationFn: collectionApi.create,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['Collection'] });
        }
    })

    const handle = async () => {
        await mutationCreateCollection.mutateAsync()
    }

    return (
        <div onClick={handle} className={styles.collection}>
            <div className={styles.collection_back__add}>
                <Plus />
            </div>
            <div className={styles.collection_name}>
                Новый плейлист
            </div>
        </div>
    )
}

export default CollectionCreate