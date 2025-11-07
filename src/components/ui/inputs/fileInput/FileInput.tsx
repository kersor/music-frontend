"use client"

import React, { InputHTMLAttributes, MouseEvent, MouseEventHandler, useRef } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import { ButtonIcon } from '../../button/ButtonIcon'
import { X } from 'lucide-react'

type variant = 
    "default" |
    "filled" |
    "unstyled"

type size = 
    "xs" |
    "sm" | 
    "md" |
    "lg" | 
    "xl"

type radius = 
    "xs" |
    "sm" | 
    "md" |
    "lg" | 
    "xl"

type accept =
    | ''
    | 'image/*'
    | 'video/*'
    | 'audio/*'
    | 'application/pdf'
    | 'text/plain';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value"> {
    rootClassName?: string,
    wrapperClassName?: string,
    inputClassName?: string,

    variant?: variant
    size?: size
    radius?: radius
    label?: string
    asterisk?: boolean
    description?: string
    placeholder?: string
    error?: string

    multiple?: boolean
    accept?: accept
    clearButton?: boolean

    disabled?: boolean
    fullWidth?: boolean

    readOnly?: boolean
    value?: FormData | null
}

const FileInput = ({
    rootClassName,
    wrapperClassName,
    inputClassName,

    variant = "default",
    size = "sm",
    radius = "sm",

    multiple = false,
    accept = "image/*",




    disabled = false,
    error,

    fullWidth = false,

    label,
    asterisk,
    description,
    placeholder = 'Загрузить файл',

    clearButton = false,
    readOnly = false,
    onChange,
    value,

    ...otherProps
}: Props) => {
    const ref = useRef<HTMLInputElement | null>(null)

    const classNames_variant: Record<variant, string> = {
        default: styles.input_default,
        filled: styles.input_filled,
        unstyled: styles.input_unstyled,
    }

    const classNames_size: Record<size, string> = {
        xs: styles.input_size__xs,
        sm: styles.input_size__sm, 
        md: styles.input_size__md,
        lg: styles.input_size__lg, 
        xl: styles.input_size__xl,
    }

    const classNames_radius: Record<radius, string> = {
        xs: styles.input_radius__xs,
        sm: styles.input_radius__sm, 
        md: styles.input_radius__md,
        lg: styles.input_radius__lg, 
        xl: styles.input_radius__xl,
    }

    const classNames_ident: Record<size, string> = {
        xs: styles.input_ident__xs,
        sm: styles.input_ident__sm, 
        md: styles.input_ident__md,
        lg: styles.input_ident__lg, 
        xl: styles.input_ident__xl,
    }

    const isDisabled = disabled

    const rootClassNames = clsx(
        rootClassName,
        classNames_size[size]
    )

    const wrapperClassNames = clsx(
        wrapperClassName,
        styles.wrapper,
        classNames_variant[variant],
        classNames_size[size],
        classNames_radius[radius],
        
        isDisabled ? styles.input_disabled : styles.input_notdisabled,
        !!error?.length && styles.input_error,
        (label?.length || description?.length) && 'mt-1' ,
        !!error?.length && 'mb-1' ,
    )

    const inputClassNames = clsx(
        inputClassName,
        styles.input,
        classNames_size[size],
        classNames_ident[size],
        classNames_radius[radius],
    )

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        ref.current?.click()
    }

    const Values = () => {
        let val = ''

        if (value && value.get('file')) {
            const file = value.get('file');
            if (file instanceof File) {
                val = file.name
            }
        } else {
            val = placeholder
        }
        
        return (
            <span className='line-clamp-1'>{val}</span>
        )
    }

    const handleClearValue = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (ref.current) {
            ref.current.value = ""; // очищаем input
            if (onChange) {
                const event = {
                    target: ref.current
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }
        }
    }

    return (
        <div className={clsx(
            styles.root,
            rootClassNames,
            fullWidth && "flex-1"
        )}>
            {
                label && (
                    <label className={styles.label} htmlFor="label">
                        {label}
                        {
                            asterisk && ( <span className='text-[#fa5252]'> *</span> )
                        }
                    </label>
                )
            }
            {
                description && (
                    <p className={styles.description}>{description}</p>
                )
            }


            <div className={clsx(
                wrapperClassNames
            )}>
                <input 
                    ref={ref}
                    disabled={isDisabled}
                    placeholder={placeholder}
                    accept={accept}
                    type="file"
                    {...otherProps}
                    style={{display: 'none'}}
                    onChange={onChange}
                />
                <button onClick={handleOnClick} className={inputClassNames}>
                    <Values /> 
                </button>
                
                    {(clearButton && value?.get('file')) && (
                        <div className={clsx(classNames_ident[size])}>
                            <ButtonIcon onClick={handleClearValue} size={size} variant="subtle">
                                <X />
                            </ButtonIcon>
                        </div>
                    )}

            </div>

            {
                error && (
                    <p className={styles.error}>{error}</p>
                )
            }
        </div>
    )
}

export default FileInput