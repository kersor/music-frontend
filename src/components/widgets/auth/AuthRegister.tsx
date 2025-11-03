import React, { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import Input from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { mode } from './AuthWrapper'
import { IRegister } from '@/types/auth.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { api } from '@/lib/axios'
import * as yup from 'yup'
import { Bounce, toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { setCookie } from '@/utils/cookie/client-cookie'
import { useUser } from '@/store/useUser'
import { useRouter } from 'next/navigation'

interface Props {
  handleMode: () => void
}

const handleSubmit = async (register: IRegister) => {
  const {data} = await api.post(
    '/auth/register', 
    register
  )
  
  return data
}

const initState = {
  email: "",
  password: "",
  name: ""
}

const schema = yup.object({
  email: yup.string().email('Некорректный Email').required('Введите Email'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
  name: yup.string().min(3, 'Минимум 3 символа').required('Введите имя'),
})

const AuthRegister = ({
  handleMode
}: Props) => {
  const setUser = useUser(state => state.actions.setUser)
  const router = useRouter()
  const [register, setRegister] = useState<IRegister>(initState)
  const [errors, setErrors] = useState<IRegister>(initState)

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: (data) => {
        const {access_token, ...otherUser} = data

        setCookie('access_token', access_token, 0.01)
        setUser(otherUser)
        
        router.push('/')
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        toast.error('Пользователь уже существует', {
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
      await schema.validate(register, { abortEarly: false })
      setErrors(prev => initState)
      await mutation.mutate(register)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: IRegister = {...initState}
        error.inner.forEach((e) => errors[e.path as keyof IRegister] = e.message);
        setErrors(prev => errors)
      }
    }
  }


  const handleOnChange = (key: string, value: string) => {
    setRegister(prev => ({...prev, [key]: value}))
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
          <Input error={errors.name} clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange('name', e.target.value)} value={register.name} label='Имя' />
          <Input type='email' error={errors.email} clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange('email', e.target.value)} value={register.email} label='Почта' />
          <Input type='password' error={errors.password} clearButton onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange('password', e.target.value)} value={register.password} label='Пароль' />
        </div>
        <div className={styles.button}>
          <Button onClick={handle} fullWidth>Зарегестрироваться</Button>
          <div className={styles.hepler}>
            Есть аккаунт? <span onClick={handleMode}>Войти</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthRegister