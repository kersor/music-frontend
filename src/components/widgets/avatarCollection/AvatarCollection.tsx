"use client"

import React, { useState } from 'react'
import styles from "./styles.module.css";
import { useUser } from '@/store/useUser';
import Image from 'next/image';
import clsx from 'clsx';
import { Camera, Music } from 'lucide-react';
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
    link?: string
}

const AvatarCollection = ({
    size = "2xl",
    link
}: Props) => {
    const classNames_size: Record<size, string> = {
        xs: styles.avatar_size__xs,
        sm: styles.avatar_size__sm, 
        md: styles.avatar_size__md,
        lg: styles.avatar_size__lg, 
        xl: styles.avatar_size__xl,
        '2xl': styles.avatar_size__2xl,
    }

    
    return (
        <div className={clsx(
            styles.collection,
            classNames_size[size]
        )}>
                {
                    !!link?.length ? (
                        <Image
                            src={`http://localhost:8080/uploads/files/photo/${link}`}
                            fill
                            objectFit='cover'
                            alt='back'
                        />
                    ) : (
                        <Music />
                    )
                }
        </div>
    )
}

export default AvatarCollection