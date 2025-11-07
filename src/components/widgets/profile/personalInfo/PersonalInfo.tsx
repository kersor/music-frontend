import Input from '@/components/ui/inputs/input/Input'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useUser } from '@/store/useUser'
import { Button } from '@/components/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import { User } from '@/types/auth.type'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/queryClient'
import { userApi } from '@/lib/api/userApi'

const PersonalInfo = () => {
  const user = useUser(state => state.user)

  const [initUser, setInitUser] = useState({
    name: "",
    surname:  "",
    email: "",
    phone: ""
  })

  const mutationUpdateUser = useMutation({
      mutationKey: ['User'],
      mutationFn: userApi.updateUser,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['User'] });
      }
  })

  useEffect(() => {
    setInitUser(prev => ({
      ...prev,
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      phone: user?.phone || ""
    }))
  }, [user])

  if (!user) return

  const handleUser = (key: string, value: string) => {
    setInitUser(prev => ({...prev, [key]: value}))
  }

  const onClickUpdateUser = async () => {
    const payload: User = {
        ...user,
        ...initUser,
    }
    await mutationUpdateUser.mutateAsync({id: user?.id, data: payload})
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
          <Input onChange={e => handleUser("name", e.target.value)} value={initUser?.name} label='Имя' />
          <Input onChange={e => handleUser("surname", e.target.value)} value={initUser?.surname} label='Фамилия'/>
          <Input onChange={e => handleUser("email", e.target.value)} value={initUser?.email} label='Почта'/>
          <Input onChange={e => handleUser("phone", e.target.value)} value={initUser?.phone} label='Номер телефона'/>
      </div>
      <div className={styles.buttons}>
        <Button loading={mutationUpdateUser.isPending} onClick={onClickUpdateUser} size='xs'>Обновить данные</Button>
        <Button variant='outline' size='xs'>Удалить</Button>
      </div>
    </div>
  )
}

export default PersonalInfo