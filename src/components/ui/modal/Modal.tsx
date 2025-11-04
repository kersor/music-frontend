import React, { MouseEvent, MouseEventHandler, PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import Input from '../inputs/input/Input'
import { ButtonIcon } from '../button/ButtonIcon'
import { X } from 'lucide-react'
import clsx from 'clsx'
import ReactDOM from "react-dom";

type size = 
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'

interface Props {
    isOpen: boolean
    onClose: () => void

    title?: string
    size?: size
}

const Modal = ({
    isOpen,
    onClose,

    title,
    size = 'md',
    children
}: PropsWithChildren<Props>) => {
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState(false);

    useLayoutEffect(() => {
        if (isOpen) {
            setMounted(true);
        }
    }, [isOpen]);

    useLayoutEffect(() => {
        if (mounted && isOpen) {
            requestAnimationFrame(() => setActive(true));
        } else {
            setActive(false);
        }
    }, [mounted, isOpen]);

    useEffect(() => {
        if (!isOpen && mounted) {
            const timeout = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, mounted]);

    if (!mounted) return null;

    const classNames_size: Record<size, string> = {
        xs: styles.modal_size__xs,
        sm: styles.modal_size__sm, 
        md: styles.modal_size__md,
        lg: styles.modal_size__lg, 
        xl: styles.modal_size__xl,
    }

    const classNamesModal = clsx(
        styles.modal, 
        active && styles.open,
        classNames_size[size]
    )

    return ReactDOM.createPortal(
        <div 
            className={clsx(
                styles.wrapper,
                active && styles.open
            )}
            onClick={() => onClose()}
        >
            <div className={styles.modal_wrapper}>
                <div 
                    onClick={e => e.stopPropagation()} 
                    className={classNamesModal}
                >
                    {
                        title?.length && (
                            <div className={styles.modal_header}>
                                <div className={styles.modal_title}>
                                    {title}
                                </div>
                                <ButtonIcon onClick={() => onClose()} variant='subtle'>
                                    <X />
                                </ButtonIcon>
                            </div>
                        )
                    }
                    <div className={clsx(
                        styles.modal_body,
                        !title?.length && 'pt-5!'
                    )}>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal