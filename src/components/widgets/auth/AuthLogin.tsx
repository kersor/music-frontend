import React, { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import Input from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { mode } from './AuthWrapper'
import { ILogin } from '@/types/auth.type'

interface Props {
  handleMode: () => void
}

const AuthLogin = ({
  handleMode
}: Props) => {
    const [login, setLogin] = useState<ILogin>({
      email: "",
      password: "",
    })

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className='flex flex-col gap-2'>
            <Input clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(prev => ({...prev, email: e.target.value}))} value={login.email} label='Почта' />
            <Input clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(prev => ({...prev, password: e.target.value}))} value={login.password} label='Пароль' />
          </div>
          <div className={styles.button}>
            <Button fullWidth>Войти</Button>
            <div className={styles.hepler}>
              Нет аккаунта? <span onClick={handleMode}>Регистрация</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AuthLogin