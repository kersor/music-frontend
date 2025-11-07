import Modal from '@/components/ui/modal/Modal'
import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '@/components/ui/button/Button'
import Image from 'next/image'
import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { User } from '@/types/auth.type'
import { queryClient } from '@/lib/queryClient'
import { useUser } from '@/store/useUser'
import { validImageMimeTypes } from '@/config/validImageTypes'
import { MAX_IMAGE_SIZE_MB } from '@/constant/maxSize'
import { uploadApi } from '@/lib/api/uploadApi'
import { userApi } from '@/lib/api/userApi'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const ModalUploadAvatar = ({
    isOpen,
    onClose
}: Props) => {
    const user = useUser(state => state.user)
    const [file, setFile] = useState<FormData | null>(null)
    const [preview, setPreview] = useState('')
    const ref = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const file = e.target.files[0]

        const type = file.type
        if (!validImageMimeTypes.includes(type)) return

        const size = file.size / 1024 / 1024
        if (size > MAX_IMAGE_SIZE_MB) return


        const url = URL.createObjectURL(file)

        const formData = new FormData();
        formData.append("file", file);

        setFile(formData)

        setPreview(url)
    }

    const mutationUpdateUser = useMutation({
        mutationKey: ['User'],
        mutationFn: userApi.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['User'] });
        }
    })

    
    const mutationSavePhoto = useMutation({
        mutationKey: ['User'],
        mutationFn: uploadApi.savePhoto,
        onSuccess: async (data) => {
            if (!user) return
            const fileName = data.fileName

            const payload: User = {
                ...user,
                avatar: fileName,
            }

            await mutationUpdateUser.mutateAsync({id: user.id, data: payload})
            resetState()
            onClose()
        }
    })

    const handleSavePhoto = async () => {
        if (!file) return
        await mutationSavePhoto.mutateAsync(file)
    }

    


    const handleFileOnClick = () => {
        ref.current?.click()
    }

    const resetState = () => {
        setPreview('')
        setFile(null)
    }

    const handleClose = () => {
        onClose()
        resetState()
    }
    

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title='Загрузка новой фотографии'
            size='lg'
        >
            <div className={styles.wrapper}>
                <div className='text-center'>
                    <div className='text-base'>Вы можете загрузить изображение в формате JPG, PNG</div>
                    <div className='text-xs'>Файл не должен превышать 5 МБ.</div>
                </div>
                {
                    preview ? (
                        <div className={styles.upload}>
                            <div className={styles.upload_avatar}>
                                <Image
                                    src={preview}
                                    alt="avatar"
                                    width={500}           // максимальная ширина
                                    height={500}          // максимальная высота
                                    style={{ objectFit: 'contain' }} // сохраняем пропорции
                                />
                            </div>

                            <div className='flex gap-3 justify-center mt-10'>
                                <Button onClick={handleSavePhoto}>Сохранить и продолжить</Button>
                                <Button onClick={resetState}>Вернуться назад</Button>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={handleFileOnClick}>
                            Выбрать файл
                            <input
                                type="file"
                                accept='image/png, image/jpeg, image/webp'
                                ref={ref}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </Button>
                    )
                }
            </div>
        </Modal>
    )
}

export default ModalUploadAvatar