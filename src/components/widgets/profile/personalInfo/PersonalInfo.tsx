import Input from '@/components/ui/input/Input'
import React from 'react'
import styles from './styles.module.css'
import { useUser } from '@/store/useUser'

const PersonalInfo = () => {
  const user = useUser(state => state.user)

  return (
    <div className={styles.wrapper}>
        <Input value={user?.name} label='Имя' />
        <Input value={user?.surname} label='Фамилия'/>
        <Input value={user?.email} label='Почта'/>
        <Input value={user?.phone} label='Номер телефона'/>
    </div>
  )
}

export default PersonalInfo