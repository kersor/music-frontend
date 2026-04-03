import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { useUser } from '@/store/useUser'
import { User } from '@/types/auth.type'
import { api } from '@/lib/axios'
import { userApi } from '@/lib/api/userApi'

type PersonalInfoForm = {
  name: string
  surname: string
  email: string
  phone: string
}

const initState: PersonalInfoForm = {
  name: '',
  surname: '',
  email: '',
  phone: '',
}

const PersonalInfo = () => {
  const user = useUser((state) => state.user)
  const setUser = useUser((state) => state.actions.setUser)

  const [form, setForm] = useState<PersonalInfoForm>(initState)
  const [errors] = useState<PersonalInfoForm>(initState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm({
      name: user?.name || '',
      surname: user?.surname || '',
      email: user?.email || '',
      phone: user?.phone || '',
    })
  }, [user])

  const handleUser = (key: keyof PersonalInfoForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onClickUpdateUser = async () => {
    try {
      if (!user) return

      setLoading(true)

      const payload: User = {
        ...user,
        ...form,
      }

      const { data } = await userApi.updateUser({id: user.id, data: payload})
      setUser(data)
    } catch (error) {
      console.error('Ошибка обновления профиля', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="personal-name">Имя</FieldLabel>
          <Input
            id="personal-name"
            onChange={(e) => handleUser('name', e.target.value)}
            value={form.name}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>

        <Field data-invalid={!!errors.surname}>
          <FieldLabel htmlFor="personal-surname">Фамилия</FieldLabel>
          <Input
            id="personal-surname"
            onChange={(e) => handleUser('surname', e.target.value)}
            value={form.surname}
          />
          <FieldError>{errors.surname}</FieldError>
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="personal-email">Email</FieldLabel>
          <Input
            id="personal-email"
            type="email"
            onChange={(e) => handleUser('email', e.target.value)}
            value={form.email}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="personal-phone">Телефон</FieldLabel>
          <Input
            id="personal-phone"
            onChange={(e) => handleUser('phone', e.target.value)}
            value={form.phone}
          />
          <FieldError>{errors.phone}</FieldError>
        </Field>
      </div>

      <div className={styles.buttons}>
        <Button disabled={loading} onClick={onClickUpdateUser} size="xs">
          Обновить данные
          {loading && <Spinner data-icon="inline-start" />}
        </Button>
        <Button variant="outline" size="xs">
          Удалить
        </Button>
      </div>
    </div>
  )
}

export default PersonalInfo
