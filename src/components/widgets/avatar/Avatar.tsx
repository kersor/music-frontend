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

    const mutation = useMutation({
        mutationKey: ['User'],
        mutationFn: handleSubmit,
        onSuccess: (data) => {
            const fileName = data.fileName;
            
            if (onChangePhoto) {
                onChangePhoto(fileName); // отправляем имя файла родителю
            }
        },
        onError: (error: AxiosError) => {

        }
    })

    const classNames_size: Record<size, string> = {
        xs: styles.avatar_size__xs,
        sm: styles.avatar_size__sm, 
        md: styles.avatar_size__md,
        lg: styles.avatar_size__lg, 
        xl: styles.avatar_size__xl,
        '2xl': styles.avatar_size__2xl,
    }


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        await mutation.mutateAsync(formData)
    };

   
    const avatarSrc = user?.avatar || null;

    if (!user?.avatar) {
        return (
            <div className={clsx(
                styles.avatar,
                classNames_size[size]
            )}>
                <span>{user?.name[0]}</span>
                {
                    changePhoto && (
                        <div className={styles.avatar_change}>
                            <Camera size={20} color='#FFF' />
                            <input onChange={handleFileChange} className={styles.avatar_file} type="file" />
                        </div>
                    )
                }
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
            {
                changePhoto && (
                    <div className={styles.avatar_change}>
                        <Camera size={20} color='#FFF' />
                        <input onChange={handleFileChange} className={styles.avatar_file} type="file" />
                    </div>
                )
            }      
        </div>
    )
}

export default Avatar