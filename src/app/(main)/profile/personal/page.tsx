"use client"

import styles from './styles.module.css'
import { useState } from 'react';
import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useUser } from '@/store/useUser';
import { User } from '@/types/auth.type';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import PersonalInfo from '@/components/widgets/profile/personalInfo/PersonalInfo';
import Modal from '@/components/ui/modal/Modal';
import { LogOutIcon, Trash2 } from 'lucide-react';
import ModalUploadAvatar from '@/components/widgets/modal/modalUploadAvatar/ModalUploadAvatar';
import { userApi } from '@/lib/api/userApi';
import { uploadApi } from '@/lib/api/uploadApi';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

export default function Personal() {
  const [changeAvatar, setChangeAvatar] = useState(false)
  const user = useUser(state => state.user)

  const mutationUpdateUser = useMutation({
    mutationKey: ['User'],
    mutationFn: userApi.updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['User'] });
    }
  })

  const removeAvatar = async () => {
    if (!user) return
    const payload: User = {
      ...user,
      avatar: null,
    }
    await mutationUpdateUser.mutateAsync({ id: user.id, data: payload })
  }

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
      }
  })

    const handleSavePhoto = async (file: FormData) => {
        await mutationSavePhoto.mutateAsync(file)
    }

  const avatarUrl =
  typeof user?.avatar === "string" && user.avatar.length > 0
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_MEDIA}/${user.avatar}` 
    : "/photo/avatar-default.svg"
    
  return (
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
  
        <AspectRatio ratio={1 / 1}>
           <Image src={avatarUrl} alt="Image" className="rounded-md object-cover" width={200} height={200}/>
        </AspectRatio>
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
              Удалить
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
      <PersonalInfo />
      <Button >
        <Link href='/logout'>Выйти</Link>
      </Button>
    </div>
  );
}

