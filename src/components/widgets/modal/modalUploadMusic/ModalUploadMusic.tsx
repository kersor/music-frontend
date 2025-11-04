import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './styles.module.css'
import Modal from '@/components/ui/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { MAX_MUSIC_SIZE_MB, MAX_MUSIC_SIZE_MB_CHUNK } from '@/constant/maxSize'
import { nanoid } from 'nanoid';
import { api } from '@/lib/axios'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const ModalUploadMusic = ({
    isOpen,
    onClose
}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef<HTMLInputElement | null>(null)
    const handleChooseFile = () => {
        ref.current?.click()
    }

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        if (!e.target.files) return

        const file = e.target.files[0]

        const size = file.size / 1024 / 1024
        if (size > MAX_MUSIC_SIZE_MB) return

        const CHUNK_SIZE = MAX_MUSIC_SIZE_MB_CHUNK * 1024 * 1024; 
        const totalChunks = file.size / CHUNK_SIZE
        const fileId = nanoid()
        const filename = file.name

        for (let i = 0; i <= totalChunks; i++) {
            const start = i * CHUNK_SIZE
            const end = Math.min(start + CHUNK_SIZE, file.size)
            const chunk = file.slice(start, end)

            const formData = new FormData()
            formData.append('chunk', chunk, `${fileId}_chunk_${i}`)
            formData.append('chunkIndex', String(i))
            formData.append('fileId', fileId)

            try {
                await api.post('/upload/chunk', formData)
            } catch (error) {
                console.log('Error', error)
            }
        }

        try {
            await api.post('/upload/merge', { fileId, totalChunks, filename })
        } catch (error) {
            console.log('Error', error)
        } finally {
            setIsLoading(false)
            onClose()
        }
    }

    return (
        <Modal
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
            title='Выберите аудиозапись на вашем компьютере'
        >
            <div className={styles.wrapper}>
                <div className={styles.music_title}>
                    Аудиофайл не должен превышать 200 МБ и должен быть в формате MP3.
                </div>
                <Button loading={isLoading} onClick={handleChooseFile}>
                    Выбрать файл
                </Button>
                <input accept="audio/mpeg" ref={ref} onChange={handleChangeFile} type='file' style={{display: 'none'}} />
            </div>
        </Modal>
    )
}

export default ModalUploadMusic