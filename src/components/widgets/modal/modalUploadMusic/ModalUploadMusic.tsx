import React, { ChangeEvent, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MAX_IMAGE_SIZE_MB, MAX_MUSIC_SIZE_MB, MAX_MUSIC_SIZE_MB_CHUNK } from '@/constant/maxSize'
import * as uuid from 'uuid'
import { Input } from '@/components/ui/input'
import FileInput from '@/components/ui/inputs/fileInput/FileInput'
import { validImageMimeTypes } from '@/config/validImageTypes'
import { useMutation } from '@tanstack/react-query'
import { uploadApi } from '@/lib/api/uploadApi'
import { musicApi } from '@/lib/api/musicApi'
import * as yup from 'yup'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { queryClient } from '@/lib/queryClient'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { useGlobalAlert } from '@/store/useGlobalAlert'

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
  photoValue: yup.mixed().required('Выберите обложку для трека'),
  name: yup.string().required('Введите название'),
})

const ModalUploadMusic = ({ isOpen, onClose }: Props) => {
    const alert = useGlobalAlert(state => state)
    const ref = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<IForm>({
        name: '',
        photoValue: null,
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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Music'] }),
    })

    const handleChooseFile = () => ref.current?.click()

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            await schema.validate(form, { abortEarly: false })
            setErrors({ name: '', photoValue: '' })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const nextErrors: IFormErrors = { name: '', photoValue: '' }
                error.inner.forEach((err) => {
                nextErrors[err.path as keyof IFormErrors] = err.message
            })
            setErrors(nextErrors)
        }
        return
    }

    setIsLoading(true)

    if (!e.target.files) return
    const file = e.target.files[0]

    const size = file.size / 1024 / 1024
        if (size > MAX_MUSIC_SIZE_MB) {
        return alert.show({ title: 'Ограничение по памяти', description: 'Максимальный размер 200мб', variant: 'destructive' })
    }

    const CHUNK_SIZE = MAX_MUSIC_SIZE_MB_CHUNK * 1024 * 1024
    const totalChunks = file.size / CHUNK_SIZE
    const fileId = uuid.v4()
    const filename = `${uuid.v4()}.mp3`

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
        await uploadApi.mergeChunks({ fileId, totalChunks, filename })
        const duration = (await handleGetDuration(file)) || 0
        if (duration < 10) {
            alert.show({ title: 'Ограничение по памяти', description: 'Минимальная длина трека — 10 секунд', variant: 'destructive' })
            setIsLoading(false)
            setForm({
                name: '',
                photoValue: null
            })
            return
        }
        const image = await addPhoto()

        await mutationCreateMusic.mutateAsync({
            name: form.name,
            filename,
            image,
            duration,
        })
    } catch (error) {
        console.log('Error', error)
    } finally {
        setIsLoading(false)
        onClose()
    }
}

const addPhoto = async () => {
    if (!form.photoValue) return

    const file = form.photoValue.get('file')
    if (file instanceof File) {
        const formData = new FormData()
        formData.append('file', file)
        const data = await mutationSavePhoto.mutateAsync(formData)

        if (data.fileName) return data.fileName
    }
}

const handleOnChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setErrors((prev) => ({ ...prev, photoValue: '' }))

    const file = e.target.files[0]
    if (!file) return setForm((prev) => ({ ...prev, photoValue: null }))

    const type = file.type
    if (!validImageMimeTypes.includes(type)) return

    const size = file.size / 1024 / 1024
    if (size > MAX_IMAGE_SIZE_MB) return

    const formData = new FormData()
    formData.append('file', file)

    setForm((prev) => ({ ...prev, photoValue: formData }))
}

const handleGetDuration = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer()
    const audioCtx = new AudioContext()

    try {
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
        return audioBuffer.duration
    } catch (err) {
        console.error('Ошибка при декодировании аудио:', err)
        return null
    }
}

const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, name: '' }))
    setForm((prev) => ({ ...prev, name: e.target.value }))
}

return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Выберите аудиозапись на вашем компьютере</DialogTitle>
            </DialogHeader>

            <div className='flex flex-col'>
                <Alert>
                    <AlertTitle>Важно</AlertTitle>
                    <AlertDescription>
                        Аудиофайл не должен превышать 200 МБ и должен быть в формате MP3.
                    </AlertDescription>
                </Alert>

                <div className='flex gap-2 mt-5'>
                <Field>
                    <FieldLabel htmlFor="name">Название</FieldLabel>
                    <Input onChange={handleOnChangeName} value={form.name} />
                    <FieldError>{errors.name}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="photoValue">Обложка</FieldLabel>
                    <Input type='file' accept='image/*' onChange={handleOnChangePhoto} />
                    <FieldError>{errors.photoValue}</FieldError>
                </Field>
            </div>

            <div className='flex mt-2'>
                <Button classNames='flex-1' disabled={isLoading} onClick={handleChooseFile}>
                    Выбрать музыку
                    {isLoading && <Spinner data-icon="inline-start" />}
                </Button>

                <input
                    accept="audio/mpeg"
                    ref={ref}
                    onChange={handleChangeFile}
                    type="file"
                    style={{ display: 'none' }}
                />
            </div>
            </div>
        </DialogContent>
    </Dialog>
)
}

export default ModalUploadMusic
