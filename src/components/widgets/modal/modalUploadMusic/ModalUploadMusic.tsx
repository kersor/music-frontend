import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import Modal from '@/components/ui/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { MAX_IMAGE_SIZE_MB, MAX_MUSIC_SIZE_MB, MAX_MUSIC_SIZE_MB_CHUNK } from '@/constant/maxSize'
import { nanoid } from 'nanoid';
import { api } from '@/lib/axios'
import * as uuid from 'uuid'
import { useUser } from '@/store/useUser'
import Input from '@/components/ui/inputs/input/Input'
import FileInput from '@/components/ui/inputs/fileInput/FileInput'
import { validImageMimeTypes } from '@/config/validImageTypes'
import { useMutation } from '@tanstack/react-query'
import { uploadApi } from '@/lib/api/uploadApi'
import { musicApi } from '@/lib/api/musicApi'
import * as yup from 'yup'
import Alert from '@/components/ui/alert/Alert'
import { alertEmmiter } from '@/lib/alert'
import { queryClient } from '@/lib/queryClient'

interface Props {
    isOpen: boolean
    onClose: () => void
}

interface IForm {
    name: string
    photoValue: FormData | null
}

interface IFormErrors {
    name: string
    photoValue: string
}

const schema = yup.object({
  photoValue: yup.mixed().required('Ввыберите обложку для трека'),
  name: yup.string().required('Введите название'),
})

const ModalUploadMusic = ({
    isOpen,
    onClose
}: Props) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<IForm>({
        name: '',
        photoValue: null
    })
    const [errors, setErrors] = useState<IFormErrors>({
        name: '',
        photoValue: '',
    })



    const mutationSavePhoto = useMutation({
        mutationFn: uploadApi.savePhoto,
    })
    const mutationCreateMusic = useMutation({
        mutationFn: musicApi.create,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['Music']})
    })

    const handleChooseFile = () => ref.current?.click()

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            await schema.validate(form, {abortEarly: false})
            setErrors({name: '', photoValue: ''})
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errors: IFormErrors = {name: '', photoValue: ''}
                error.inner.forEach((e) => errors[e.path as keyof IFormErrors] = e.message);
                setErrors(prev => errors)
            }
            return
        }
        

        setIsLoading(true)

        if (!e.target.files) return
        const file = e.target.files[0]

        const size = file.size / 1024 / 1024
        if (size > MAX_MUSIC_SIZE_MB) {
            return alertEmmiter({text: "Максимальный размер 200мб", type: 'error'})
        }

        const CHUNK_SIZE = MAX_MUSIC_SIZE_MB_CHUNK * 1024 * 1024; 
        const totalChunks = file.size / CHUNK_SIZE
        const fileId = uuid.v4()
        const filename = uuid.v4() + '.mp3'

        for (let i = 0; i <= totalChunks; i++) {
            const start = i * CHUNK_SIZE
            const end = Math.min(start + CHUNK_SIZE, file.size)
            const chunk = file.slice(start, end)

            const formData = new FormData()
            formData.append('chunk', chunk, `${fileId}_chunk_${i}`)
            formData.append('chunkIndex', String(i))
            formData.append('fileId', fileId)

            try {
                await uploadApi.addChunk(formData)
            } catch (error) {
                console.log('Error', error)
            }
        }

        try {
            await uploadApi.mergeChunks({fileId, totalChunks, filename})
            const duration = await handleGetDuration(file) || 0
            const image = await addPhoto()

            const payload = {
                name: form.name,
                filename: filename,
                image: image,
                duration: duration
            }
            await mutationCreateMusic.mutateAsync(payload)
        } catch (error) {
            console.log('Error', error)
        } finally {
            setIsLoading(false)
            onClose()
        }
    }

    const addPhoto = async () => {
        if (!form.photoValue) return

        const file = form.photoValue.get('file');
        if (file instanceof File) {
            const formData = new FormData();
            formData.append('file', file);
            const data = await mutationSavePhoto.mutateAsync(formData)
            
            if (data.fileName) return data.fileName
        }
    }

    const handleOnChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setErrors(prev => ({...prev, photoValue: ''}))

        const file = e.target.files[0]
        if (!file) return setForm(prev => ({...prev, photoValue: null}))

        const type = file.type
        if (!validImageMimeTypes.includes(type)) return

        const size = file.size / 1024 / 1024
        if (size > MAX_IMAGE_SIZE_MB) return

        const formData = new FormData()
        formData.append('file', file)

        setForm(prev => ({...prev, photoValue: formData}))
    }

    const handleGetDuration = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        const audioCtx = new AudioContext();

        try {
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            return audioBuffer.duration;
        } catch (err) {
            console.error('Ошибка при декодировании аудио:', err);
            return null;
        }
    };

    const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(prev => ({...prev, name: ''}))
        setForm(prev => ({...prev, name: e.target.value}))
    }

    return (
        <Modal
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
            title='Выберите аудиозапись на вашем компьютере'
        >
            <div className={styles.wrapper}>
                <Alert />
                <div className={styles.music_title}>
                    Аудиофайл не должен превышать 200 МБ и должен быть в формате MP3.
                </div>
                <div className={styles.music_inputs}>
                    <div className={styles.music_inputs__line}>
                        <Input
                            error={errors.name}
                            onChange={handleOnChangeName}
                            value={form.name}
                            fullWidth
                            label='Название'
                        />
                    </div>
                    <div className={styles.music_inputs__line}>
                        <FileInput
                            error={errors.photoValue}
                            fullWidth
                            label='Обложка'
                            clearButton
                            value={form.photoValue}
                            onChange={handleOnChangePhoto}
                        />
                    </div>
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