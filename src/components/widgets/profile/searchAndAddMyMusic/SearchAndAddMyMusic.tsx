"use client"

import React, { useState } from 'react'
import styles from './styles.module.css'
import Input from '@/components/ui/inputs/input/Input'
import { ButtonIcon } from '@/components/ui/button/ButtonIcon'
import { ArrowUpFromLine } from 'lucide-react'
import ModalUploadMusic from '../../modal/modalUploadMusic/ModalUploadMusic'

const SearchAndAddMyMusic = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className='flex-1'>
                <Input placeholder='Поиск музыки...' clearButton/>
            </div>
            <ButtonIcon onClick={() => setIsOpen(true)} variant='light' size='lg'>
                <ArrowUpFromLine />
            </ButtonIcon>
            <ModalUploadMusic isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </div>
    )
}

export default SearchAndAddMyMusic