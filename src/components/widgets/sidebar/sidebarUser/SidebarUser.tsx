"use client"
import { useUser } from '@/store/useUser'
import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { ListPagesConfig } from '@/config/pages'
import { useTheme } from '@/store/useTheme'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Moon, Sun } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const SidebarUser = () => {
  const {
    theme,
    setTheme
  } = useTheme(state => state)
  const user = useUser(state => state.user)

  const func = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={styles.user}>
      <Link href={ListPagesConfig.PROFILE_PERSONAL.href} className={styles.avatar}>
        <Avatar size='lg'>
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_MEDIA}/${user?.avatar}`}
            alt={user?.name}
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </Link>
      <div className={styles.names}>
        <div className={styles.names_name}>{user?.name}</div>
        <div className={styles.names_email}>{user?.email}</div>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer">
        <Switch onCheckedChange={func} checked={theme === 'dark' ? true : false} id="airplane-mode" />
        <Label htmlFor="airplane-mode">
          {
            theme === 'dark' ? <Moon /> : <Sun />
          }
        </Label>
      </div>
    </div>
  )
}

export default SidebarUser