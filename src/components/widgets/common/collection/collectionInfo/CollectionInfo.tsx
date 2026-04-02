"use client"

import AvatarCollection from '@/components/widgets/avatarCollection/AvatarCollection'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '@/components/ui/button/Button'
import { Edit, LogOutIcon, Trash2 } from 'lucide-react'
import ModalUploadAvatar from '@/components/widgets/modal/modalUploadAvatar/ModalUploadAvatar'
import { useMutation } from '@tanstack/react-query'
import { userApi } from '@/lib/api/userApi'
import { queryClient } from '@/lib/queryClient'
import { uploadApi } from '@/lib/api/uploadApi'
import { ICollection, ICollectionUpdate } from '@/types/collection.type'
import { collectionApi } from '@/lib/api/collectionApi'
import { ButtonIcon } from '@/components/ui/button/ButtonIcon'
import Input from '@/components/ui/inputs/input/Input'

interface Props {
    collection: ICollection
}

const CollectionInfo = ({
    collection
}: Props) => {
    const [isCollectionName, setIsCollectionName] = useState(false)
    const [collectionName, setCollectionName] = useState(collection.name)
    const [changeAvatar, setChangeAvatar] = useState(false)

    const ref = useRef<HTMLInputElement | null>(null)

    const mutationUpdateCollection = useMutation({
        mutationKey: ['Collection'],
        mutationFn: (payload: ICollectionUpdate) => collectionApi.updatePlayList(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['Collection'] });
        }
    })

    const removeAvatar = async () => {

    }

    const mutationSavePhoto = useMutation({
        mutationKey: ['Collection'],
        mutationFn: uploadApi.savePhoto,
        onSuccess: async (data) => {
            const fileName = data.fileName

            const payload: ICollectionUpdate = {
                ...collection,
                image: fileName,
            }

            await mutationUpdateCollection.mutateAsync(payload)
        }
    })
    
    const handleSavePhoto = async (file: FormData) => {
        await mutationSavePhoto.mutateAsync(file)
    }

    const handleEditName = () => {
        setIsCollectionName(true)
    }

    const handleOnBlur = async () => {
        if (!ref?.current) return

        const payload: ICollectionUpdate = {
            ...collection,
            name: collectionName
        }

        await mutationUpdateCollection.mutateAsync(payload)
        setIsCollectionName(false)
    }
 
    useEffect(() => {
        if (!ref?.current) return
        if (isCollectionName) ref?.current?.focus();
    }, [isCollectionName])


    return (
        <div className='flex gap-5'>
            <AvatarCollection link={collection.image ?? ""} />
            <div className={styles.info}>
                <div>
                    <div className={styles.info_type}>Плейлист</div>
                    <div className={styles.info_name}>
                        <input
                            ref={ref}
                            autoComplete='off'
                            name='name'
                            type="text"
                            onChange={(e) => setCollectionName(e.target.value)}
                            onBlur={handleOnBlur}
                            value={collectionName}
                            style={{
                                width: '100%',
                                display: isCollectionName ? 'block' : 'none'
                            }}
                        />

                        {!isCollectionName && collectionName}

                        <div className={styles.info_btnEdit}>
                            <ButtonIcon onClick={handleEditName} radius='md' size='md'>
                                <Edit size={20}/>
                            </ButtonIcon>
                        </div>
                    </div>  
                </div>
                <div className={styles.profile_avatar__settings}>
                    <div className='flex gap-2'>
                        <Button onClick={() => setChangeAvatar(true)} size='xs' classNames='gap-2 items-center'>
                        <div className='-rotate-90'>
                            <LogOutIcon size={15} />
                        </div>
                        Обновить фото
                        </Button>
                        <Button onClick={removeAvatar} variant='outline' size='xs' classNames='gap-2 items-center'>
                        <Trash2 size={15} />
                            Удалить фото
                        </Button>
                    </div>
                    <div className={styles.profile_avatar__settings_description}>
                        Мы используем PNG, JPEGs и WEBP максимальным размером 5Мb
                    </div>
                </div>
            </div>
            <ModalUploadAvatar
                isOpen={changeAvatar}
                onClose={() => setChangeAvatar(false)}
                handleSavePhoto={handleSavePhoto}
            />
        </div>
    )
}

export default CollectionInfo