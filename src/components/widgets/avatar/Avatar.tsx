"use client"

import React from 'react'
import styles from "./styles.module.css";
import { useUser } from '@/store/useUser';
import Image from 'next/image';
import clsx from 'clsx';

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

const Avatar = ({
    size = "md",
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

   
    const avatarSrc = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_MEDIA}/${user?.avatar}` || '/photo/avatar-default.svg';

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
                src={avatarSrc}
                alt='avatar'
                fill
                objectFit='cover'
            />           
        </div>
    )
}

export default Avatar