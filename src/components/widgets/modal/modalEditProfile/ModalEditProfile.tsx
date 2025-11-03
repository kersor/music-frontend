import React, { useState } from 'react'
import styles from './styles.module.css'
import Modal from '@/components/ui/modal/Modal'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const ModalEditProfile = ({
    isOpen,
    onClose
}: Props) => {
  return (
    <Modal
        onClose={onClose}
        isOpen={isOpen}
        title='Обновить информацию'
        size='xl'
    >

    </Modal>
  )
}

export default ModalEditProfile