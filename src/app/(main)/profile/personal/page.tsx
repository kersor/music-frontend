"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'
import { useUser } from '@/store/useUser'
import { User } from '@/types/auth.type'
import { Button } from '@/components/ui/button'
import PersonalInfo from '@/components/widgets/profile/personalInfo/PersonalInfo'
import { LogOutIcon, Trash2 } from 'lucide-react'
import ModalUploadAvatar from '@/components/widgets/modal/modalUploadAvatar/ModalUploadAvatar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { userApi } from '@/lib/api/userApi'
import { uploadApi } from '@/lib/api/uploadApi'

export default function Personal() {
  const [changeAvatar, setChangeAvatar] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const user = useUser((state) => state.user)
  const setUser = useUser((state) => state.actions.setUser)

  const removeAvatar = async () => {
    if (!user) return

    try {
      setAvatarLoading(true)

      const payload: User = {
        ...user,
        avatar: null,
      }

      const data = await userApi.updateUser({ id: user.id, data: payload })
      setUser(data)
    } catch (error) {
      console.error('Ошибка удаления аватара', error)
    } finally {
      setAvatarLoading(false)
    }
  }

  const handleSavePhoto = async (file: FormData) => {
    if (!user) return

    try {
      setAvatarLoading(true)

      const uploadData = await uploadApi.savePhoto(file)
      if (!uploadData?.fileName) return

      const payload: User = {
        ...user,
        avatar: uploadData.fileName,
      }

      const data = await userApi.updateUser({ id: user.id, data: payload })
      setUser(data)
    } catch (error) {
      console.error('Ошибка обновления аватара', error)
    } finally {
      setAvatarLoading(false)
    }
  }

  const avatarUrl =
    typeof user?.avatar === 'string' && user.avatar.length > 0
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_MEDIA}/${user.avatar}`
      : '/photo/avatar-default.svg'

  return (
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={avatarUrl}
            alt="Avatar"
            className="rounded-md object-cover"
            width={150}
            height={150}
          />
        </AspectRatio>

        <div className={styles.profile_avatar__settings}>
          <div className="flex gap-2">
            <Button
              disabled={avatarLoading}
              onClick={() => setChangeAvatar(true)}
              size="xs"
              classNames="gap-2 items-center"
            >
              <div className="-rotate-90">
                <LogOutIcon size={15} />
              </div>
              Обновить фото
            </Button>

            <Button
              disabled={avatarLoading}
              onClick={removeAvatar}
              variant="outline"
              size="xs"
              classNames="gap-2 items-center"
            >
              <Trash2 size={15} />
              Удалить
            </Button>
          </div>

          <div className={styles.profile_avatar__settings_description}>
            Мы используем PNG, JPEG и WEBP максимальным размером 5Mb
          </div>
        </div>
      </div>

      <ModalUploadAvatar
        isOpen={changeAvatar}
        onClose={() => setChangeAvatar(false)}
        handleSavePhoto={handleSavePhoto}
      />

      <PersonalInfo />

      <Button>
        <Link href="/logout">Выйти</Link>
      </Button>
    </div>
  )
}
