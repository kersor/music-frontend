import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import styles from './styles.module.css'
import { validImageMimeTypes } from '@/config/validImageTypes'
import { MAX_IMAGE_SIZE_MB } from '@/constant/maxSize'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleSavePhoto: (file: FormData) => void
}

const ModalUploadAvatar = ({ isOpen, onClose, handleSavePhoto }: Props) => {
  const [file, setFile] = useState<FormData | null>(null)
  const [preview, setPreview] = useState('')
  const ref = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const fileValue = e.target.files[0]

    if (!validImageMimeTypes.includes(fileValue.type)) return

    const size = fileValue.size / 1024 / 1024
    if (size > MAX_IMAGE_SIZE_MB) return

    const url = URL.createObjectURL(fileValue)

    const formData = new FormData()
    formData.append('file', fileValue)

    setFile(formData)
    setPreview(url)
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

  const handleSave = () => {
    if (!file) return
    handleSavePhoto(file)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Загрузка новой фотографии</DialogTitle>
        </DialogHeader>

        <div className={styles.wrapper}>
          <div className="text-center">
            <div className="text-base">Вы можете загрузить изображение в формате JPG, PNG</div>
            <div className="text-xs">Файл не должен превышать 5 МБ.</div>
          </div>

          {preview ? (
            <div className={styles.upload}>
              <div className={styles.upload_avatar}>
                <Image
                  src={preview}
                  alt="avatar"
                  width={500}
                  height={500}
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className="mt-10 flex justify-center gap-3">
                <Button onClick={handleSave}>Сохранить и продолжить</Button>
                <Button onClick={resetState}>Вернуться назад</Button>
              </div>
            </div>
          ) : (
            <Button onClick={handleFileOnClick}>
              Выбрать файл
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                ref={ref}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalUploadAvatar
