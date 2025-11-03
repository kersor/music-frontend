"use client"

import React, { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import { ButtonIcon } from '../button/ButtonIcon'
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

type type = 
    "text" |
    "email" |
    "password" 

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value"> {
    rootClassName?: string,
    wrapperClassName?: string,
    inputClassName?: string,

    variant?: variant
    size?: size
    radius?: radius
    type?: type

    disabled?: boolean
    error?: string

    fullWidth?: boolean

    label?: string
    asterisk?: boolean
    description?: string
    placeholder?: string

    value?: string

    clearButton?: boolean
    readOnly?: boolean
}

const Input = ({
    rootClassName,
    wrapperClassName,
    inputClassName,

    variant = "default",
    size = "sm",
    radius = "sm",
    type = "text",

    disabled = false,
    error,

    fullWidth = false,

    label,
    asterisk,
    description,
    placeholder,

    onChange,
    value = "",

    clearButton = false,
    readOnly = false,

    ...otherProps
}: Props) => {

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
        classNames_ident[size],
        isDisabled ? styles.input_disabled : styles.input_notdisabled,
        !!error?.length && styles.input_error,
        (label?.length || description?.length) && 'mt-1' ,
        !!error?.length && 'mb-1' ,
    )

    const inputClassNames = clsx(
        inputClassName,
        styles.input,
        classNames_size[size],
        classNames_radius[radius],
    )

    const handleClearValue = (e: React.MouseEvent) => {
        if(onChange) {
            const val = {
                target: {
                    value: ""
                }
            } as React.ChangeEvent<HTMLInputElement>

            onChange(val)
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
                    onChange={onChange}
                    value={value}
                    id='label'
                    className={inputClassNames}
                    disabled={isDisabled}
                    placeholder={placeholder}
                    type={type}
                    readOnly={!onChange}
                    {...otherProps}
                />
                {(clearButton && !!value.length) && (
                    <ButtonIcon onClick={handleClearValue} size={size} variant="subtle">
                        <X />
                    </ButtonIcon>
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

export default Input