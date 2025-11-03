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
import ModalEditProfile from '@/components/widgets/modal/modalEditProfile/ModalEditProfile';

interface UpdateUserPayload {
  id: string;
  data: User;
}

const handleSubmit = async ({ id, data }: UpdateUserPayload) => {
  const { data: response } = await api.patch(`/user/${id}`, data);
  return response;
}

export default function Personal() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUser(state => state.user)
  
  const mutation = useMutation({
    mutationKey: ['User'],
    mutationFn: handleSubmit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['User'] });
    },
    onError: (error: AxiosError) => {

    }
  })

  const onChangePhoto = async (fileName: string) => {
    if (!user) return
    const payload: User = {
      ...user,
      avatar: fileName,
    }
    await mutation.mutateAsync({ id: user.id, data: payload })
  }
  
  return (
    <div className={styles.profile}>
      <div className='flex gap-5 items-center justify-between'>
        <Avatar changePhoto onChangePhoto={onChangePhoto} size='md' />
        <div className='flex gap-2'>
          <Button size='sm' onClick={() => setIsOpen(prev => true)}>Обновить</Button>
          <Button size='sm'>Удалить</Button>
        </div>
      </div>
      <ModalEditProfile isOpen={isOpen} onClose={() => setIsOpen(prev => false)}/>
      <PersonalInfo />
      {/* <Button component='a' href='/logout'>Выйти</Button> */}
    </div>
  );
}
