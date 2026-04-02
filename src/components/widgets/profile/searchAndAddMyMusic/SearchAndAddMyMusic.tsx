"use client"

import React, { useState } from 'react'
import styles from './styles.module.css'
import Input from '@/components/ui/inputs/input/Input'
import { ArrowUpFromLine } from 'lucide-react'
import ModalUploadMusic from '../../modal/modalUploadMusic/ModalUploadMusic'
import { Button } from '@/components/ui/button'

const SearchAndAddMyMusic = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className='flex-1'>
                <Input placeholder='Поиск музыки...' clearButton/>
            </div>
            <Button onClick={() => setIsOpen(true)} size='lg'>
                <ArrowUpFromLine />
            </Button>
            <ModalUploadMusic isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </div>
    )
}

export default SearchAndAddMyMusic
