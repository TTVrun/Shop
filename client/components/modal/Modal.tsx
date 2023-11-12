'use client'

import React, { useEffect } from 'react'
import styles from './modal.module.scss'
import { TiTick } from 'react-icons/ti'
import { BsExclamationLg } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

interface Props {
    isOpen: boolean
    setOpen: any
    isSuccess?: boolean
    butttonLink?: string
    buttonText?: string
    text: string
}

const Modal = ({ isOpen, setOpen, text, isSuccess = true, butttonLink = '/', buttonText = 'Back home' }: Props) => {
    const router = useRouter()
    const handleClickClose = () => {
        setOpen(false)
    }

    const handleClickButtonDirection = () => {
        setOpen(false)
        router.push(butttonLink)
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
                bodyElement.style.removeProperty('overflowX')
            }
        }
    }, [isOpen])

    return (
        <>
            {isOpen && (
                <div className={styles.wrapper} onClick={handleClickClose}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.container}>
                        {isSuccess ? (
                            <i className={styles.iconsuccess}>
                                <TiTick />
                            </i>
                        ) : (
                            <i className={styles.iconfail}>
                                <BsExclamationLg />
                            </i>
                        )}
                        {isSuccess ? (
                            <h3 className={styles.titlesuccess}>Completed</h3>
                        ) : (
                            <h3 className={styles.titlefail}>Confirm</h3>
                        )}

                        <p className={styles.text}>{text}</p>
                        <div className={styles.wbutton}>
                            <button onClick={handleClickClose} className={styles.button}>
                                Ok, close
                            </button>
                            {butttonLink === '/' ? (
                                <button onClick={handleClickButtonDirection} className={styles.button}>
                                    {buttonText}
                                </button>
                            ) : (
                                <button onClick={handleClickButtonDirection} className={styles.button}>
                                    {buttonText}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
