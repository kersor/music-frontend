import React, { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ILogin } from '@/types/auth.type'
import * as yup from 'yup'
import { AxiosError } from 'axios'
import { setCookie } from '@/utils/cookie/client-cookie'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import { authApi } from '@/lib/api/authApi'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGlobalAlert } from '@/store/useGlobalAlert'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

interface Props {
  handleMode: () => void
}

const initState: ILogin = {
  email: '',
  password: '',
}

const schema = yup.object({
  email: yup.string().email('Некорректный Email').required('Введите Email'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
})

const AuthLogin = ({ handleMode }: Props) => {
  const setUser = useUser((state) => state.actions.setUser)
  const showGlobalAlert = useGlobalAlert((state) => state.show)
  const router = useRouter()
  const [login, setLogin] = useState<ILogin>(initState)
  const [errors, setErrors] = useState<ILogin>(initState)
  const [loading, setLoading] = useState(false)

  const handleOnChange = (key: keyof ILogin, value: string) => {
    setLogin((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogin = async () => {
    try {
      setErrors(initState)
      setLoading(true)
      await schema.validate(login, { abortEarly: false })

      const res = await authApi.login(login)

      if (!('error' in res)) {
        const { access_token, ...otherUser } = res.data

        setCookie('access_token', access_token)
        setUser(otherUser)
        router.push('/')
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: ILogin = { email: "", password: "" }

        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof ILogin] = err.message
          }
        })

        setErrors(newErrors)
        return
      }


      const err = error as AxiosError

      if (err.status === 401) {
        showGlobalAlert({
          title: 'Ошибка входа',
          description: 'Неверная почта или пароль',
          variant: 'destructive',
        })
        return
      }

      showGlobalAlert({
        title: 'Ошибка',
        description: 'Произошла ошибка. Попробуйте снова.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                id="login-email"
                type="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange('email', e.target.value)
                }
                value={login.email}
              />
              <FieldError>{errors.email}</FieldError>
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="login-password">Пароль</FieldLabel>
              <Input
                id="login-password"
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange('password', e.target.value)
                }
                value={login.password}
              />
              <FieldError>{errors.password}</FieldError>
            </Field>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <Button disabled={loading} classNames="cursor-pointer" onClick={handleLogin}>
              Войти
              {loading && <Spinner />}
            </Button>
            <div className={styles.hepler}>
              Нет аккаунта?{' '}
              <span className="cursor-pointer" onClick={handleMode}>
                Регистрация
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthLogin
