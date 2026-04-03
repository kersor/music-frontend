import React, { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IRegister } from '@/types/auth.type'
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

const initState: IRegister = {
  email: '',
  password: '',
  name: '',
}

const schema = yup.object({
  email: yup.string().email('Некорректный Email').required('Введите Email'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
  name: yup.string().min(3, 'Минимум 3 символа').max(10, 'Максимум 10 символов').required('Введите имя'),
})

const AuthRegister = ({ handleMode }: Props) => {
  const setUser = useUser((state) => state.actions.setUser)
  const showGlobalAlert = useGlobalAlert((state) => state.show)
  const router = useRouter()
  const [register, setRegister] = useState<IRegister>(initState)
  const [errors, setErrors] = useState<IRegister>(initState)
  const [loading, setLoading] = useState(false)

  const handleOnChange = (key: keyof IRegister, value: string) => {
    setRegister((prev) => ({ ...prev, [key]: value }))
  }

  const handleRegister = async () => {
    try {
      setErrors(initState)
      setLoading(true)
      await schema.validate(register, { abortEarly: false })

      const res = await authApi.register(register)

      if (!('error' in res)) {
        const { access_token, ...otherUser } = res

        setCookie('access_token', access_token)
        setUser(otherUser)
        router.push('/')
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: IRegister = { email: '', password: '', name: '' }

        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof IRegister] = err.message
          }
        })

        setErrors(newErrors)
        return
      }

      const err = error as AxiosError

      if (err.status === 409) {
        showGlobalAlert({
          title: 'Ошибка регистрации',
          description: 'Пользователь уже существует',
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
          <CardTitle>Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="register-name">Имя</FieldLabel>
              <Input
                id="register-name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange('name', e.target.value)
                }
                value={register.name}
              />
              <FieldError>{errors.name}</FieldError>
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="register-email">Email</FieldLabel>
              <Input
                id="register-email"
                type="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange('email', e.target.value)
                }
                value={register.email}
              />
              <FieldError>{errors.email}</FieldError>
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="register-password">Пароль</FieldLabel>
              <Input
                id="register-password"
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange('password', e.target.value)
                }
                value={register.password}
              />
              <FieldError>{errors.password}</FieldError>
            </Field>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <Button disabled={loading} classNames="cursor-pointer" onClick={handleRegister}>
              Зарегистрироваться
              {loading && <Spinner />}
            </Button>
            <div className={styles.hepler}>
              Есть аккаунт?{' '}
              <span className="cursor-pointer" onClick={handleMode}>
                Войти
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthRegister
