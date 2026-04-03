"use client"
import { useUser } from '@/store/useUser'
import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { ListPagesConfig } from '@/config/pages'
import Avatar from '../../avatar/Avatar'
import { useTheme } from '@/store/useTheme'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Moon, Sun } from 'lucide-react'

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
        <Avatar size='xs' />
      </Link>
      <div className={styles.names}>
        <div className={styles.names_name}>{user?.name}</div>
        <div className={styles.names_email}>{user?.email}</div>
      </div>
      <div className="flex items-center space-x-2">
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