"use client"

import Avatar from '@/components/widgets/avatar/Avatar';
import styles from './styles.module.css'
import { useState } from 'react';
import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useUser } from '@/store/useUser';
import { User } from '@/types/auth.type';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button/Button';
import PersonalInfo from '@/components/widgets/profile/personalInfo/PersonalInfo';
import Modal from '@/components/ui/modal/Modal';
import { LogOutIcon, Trash2 } from 'lucide-react';
import ModalUploadAvatar from '@/components/widgets/modal/modalUploadAvatar/ModalUploadAvatar';
import { userApi } from '@/lib/api/userApi';

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
  
  return (
    <div className={styles.profile}>
      <div className={styles.profile_avatar}>
        <Avatar size='lg' />
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
      <ModalUploadAvatar isOpen={changeAvatar} onClose={() => setChangeAvatar(false)} />
      <PersonalInfo />
      <Button component='a' href='/logout'>Выйти</Button>
    </div>
  );
}
