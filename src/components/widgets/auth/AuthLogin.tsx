import React, { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import Input from '@/components/ui/inputs/input/Input'
import { Button } from '@/components/ui/button/Button'
import { mode } from './AuthWrapper'
import { ILogin } from '@/types/auth.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import * as yup from 'yup'
import { AxiosError } from 'axios'
import { Bounce, toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { getCookie, setCookie } from '@/utils/cookie/client-cookie'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import { authApi } from '@/lib/api/authApi'

interface Props {
  handleMode: () => void
}

const initState = {
  email: "",
  password: ""
}

const schema = yup.object({
  email: yup.string().email('Некорректный Email').required('Введите Email'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
})

const AuthLogin = ({
  handleMode
}: Props) => {
    const setUser = useUser(state => state.actions.setUser)
    const router = useRouter()
    const [login, setLogin] = useState<ILogin>(initState)
    const [errors, setErrors] = useState<ILogin>(initState)

    const mutation = useMutation({
      mutationFn: authApi.login,
      onSuccess: (data) => {
        const {access_token, ...otherUser} = data

        setCookie('access_token', access_token)
        setUser(otherUser)
        
        router.push('/')
      },
      onError: (error: AxiosError) => {
      if (error.status === 401) {
        toast.error('Неверная почта или пароль', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
    })

    const handle = async () => {
      try {
        await schema.validate(login, { abortEarly: false })
        setErrors(prev => initState)
        await mutation.mutateAsync(login)
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors: ILogin = {...initState}
          error.inner.forEach((e) => errors[e.path as keyof ILogin] = e.message);
          setErrors(prev => errors)
        }
      }
    }
  
  
    const handleOnChange = (key: string, value: string) => {
      setLogin(prev => ({...prev, [key]: value}))
      setErrors(prev => ({...prev, [key]: ""}))
    }

    return (
      <div className={styles.wrapper}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className={styles.container}>
          <div className='flex flex-col gap-2'>
            <Input type='email' error={errors.email} clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange('email', e.target.value)} value={login.email} label='Почта' />
            <Input type='password' error={errors.password} clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange('password', e.target.value)} value={login.password} label='Пароль' />
          </div>
          <div className={styles.button}>
            <Button onClick={handle} fullWidth>Войти</Button>
            <div className={styles.hepler}>
              Нет аккаунта? <span onClick={handleMode}>Регистрация</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AuthLogin