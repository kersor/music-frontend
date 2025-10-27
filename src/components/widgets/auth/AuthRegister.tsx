import React, { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import Input from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { mode } from './AuthWrapper'
import { IRegister } from '@/types/auth.type'

interface Props {
  handleMode: () => void
}

const AuthRegister = ({
  handleMode
}: Props) => {
  const [register, setRegister] = useState<IRegister>({
    email: "",
    password: "",
    name: ""
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className='flex flex-col gap-2'>
          <Input clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister(prev => ({...prev, name: e.target.value}))} value={register.name} label='Имя' />
          <Input clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister(prev => ({...prev, email: e.target.value}))} value={register.email} label='Почта' />
          <Input clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => setRegister(prev => ({...prev, password: e.target.value}))} value={register.password} label='Пароль' />
        </div>
        <div className={styles.button}>
          <Button fullWidth>Зарегестрироваться</Button>
          <div className={styles.hepler}>
            Есть аккаунт? <span onClick={handleMode}>Войти</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthRegister