"use client"

import React, { useState } from 'react'
import styles from "./styles.module.css";
import { useUser } from '@/store/useUser';
import Image from 'next/image';
import clsx from 'clsx';
import { Camera } from 'lucide-react';
import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type size = 
    "xs" |
    "sm" | 
    "md" |
    "lg" | 
    "xl" |
    "2xl"

interface Props {
    size?: size
    changePhoto?: boolean
    onChangePhoto?: (fileName: string) => void
}

const handleSubmit = async (photo: FormData) => {
  const {data} = await api.post(
    '/upload',
    photo
  )
  
  return data
}

const Avatar = ({
    size = "md",
    changePhoto = false,
    onChangePhoto
}: Props) => {
    const user = useUser(state => state.user)

    const classNames_size: Record<size, string> = {
        xs: styles.avatar_size__xs,
        sm: styles.avatar_size__sm, 
        md: styles.avatar_size__md,
        lg: styles.avatar_size__lg, 
        xl: styles.avatar_size__xl,
        '2xl': styles.avatar_size__2xl,
    }

   
    const avatarSrc = user?.avatar || null;

    if (!user?.avatar) {
        return (
            <div className={clsx(
                styles.avatar,
                classNames_size[size]
            )}>
                <span>{user?.name[0]}</span>
            </div>
        )
    }
    
    return (
        <div className={clsx(
            styles.avatar,
            classNames_size[size]
        )}>
            <Image 
                src={`http://localhost:8080/uploads/${avatarSrc}`}
                alt='avatar'
                fill
                objectFit='cover'
            />           
        </div>
    )
}

export default Avatar