'use client'

import React, { useEffect } from 'react'
import styles from './configmodal.module.scss'

interface Props {
    isOpen: boolean
    setIsOpen: any
    children: React.ReactNode
}

const ConfigModal: React.FC<Props> = ({ isOpen, setIsOpen, children }) => {
    const handleClickClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (isOpen) {
            const bodyElement = document.querySelector('body')
            if (bodyElement) {
                bodyElement.style.height = '100vh'
                bodyElement.style.overflowY = 'hidden'
            }
        } else {
            const bodyElement = document.querySelector('body')
            if (bodyElement) {
                bodyElement.style.removeProperty('height')
                bodyElement.style.removeProperty('overflowY')
            }
        }
    }, [isOpen])

    return (
        <>
            {isOpen && (
                <div onClick={handleClickClose} className={styles.wrapper}>
                    <div onClick={(e) => e.stopPropagation()}>{children}</div>
                </div>
            )}
        </>
    )
}

export default ConfigModal
