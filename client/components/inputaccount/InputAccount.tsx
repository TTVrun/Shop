'use client'

import React, { useEffect, useState } from 'react'
import styles from './inputaccount.module.scss'
import { CommonData, CommonError } from '@/types/account'
import { MdClear } from 'react-icons/md'
import { listKeyName } from '@/constant/account'

interface Props {
    commonData: CommonData
    setCommonData: React.Dispatch<React.SetStateAction<CommonData>>
    keyName: string
    commonError: CommonError
    handleError: any
    setCommonError: React.Dispatch<React.SetStateAction<CommonError>>
    type?: string
}

const InputAccount = ({
    commonData,
    setCommonData,
    keyName,
    commonError,
    handleError,
    setCommonError,
    type = 'text'
}: Props) => {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommonData((prev) => {
            return {
                ...prev,
                [keyName]: e.target.value
            }
        })

        const clearElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.clear}`)
        if (clearElements.length > 0) {
            if (clearElements.length === 4) {
                const index: number = listKeyName.indexOf(keyName)

                clearElements[index].style.display = 'flex'
            } else {
                if (listKeyName.indexOf(keyName) === 1) {
                    clearElements[0].style.display = 'flex'
                } else {
                    clearElements[1].style.display = 'flex'
                }
            }
        }
    }

    const clearValue = (index: number) => {
        const clearElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.clear}`)
        const inputElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.input}`)

        clearElements[index].onclick = () => {
            setCommonData((prev) => {
                return {
                    ...prev,
                    [keyName]: ''
                }
            })
            inputElements[index].click()
            inputElements[index].focus()
            clearElements[index].style.display = 'none'
        }
    }

    const handleBlurInput = async () => {
        handleError(keyName)
        const clearElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.clear}`)
        const inputElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.input}`)

        if (inputElements.length > 0) {
            if (inputElements.length === 4) {
                const index: number = listKeyName.indexOf(keyName)
                clearValue(index)
            } else {
                if (listKeyName.indexOf(keyName) === 1) {
                    clearValue(0)
                } else {
                    clearValue(1)
                }
            }
        }
    }

    const handleClickInput = () => {
        setCommonError((prev) => {
            return {
                ...prev,
                [keyName]: null
            }
        })

        const inputElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.input}`)
        if (inputElements.length > 0) {
            if (inputElements.length === 4) {
                const index: number = listKeyName.indexOf(keyName)
                inputElements[index].style.border = '2px solid #A2FF86'
            } else {
                if (listKeyName.indexOf(keyName) === 1) {
                    inputElements[0].style.border = '2px solid #A2FF86'
                } else {
                    inputElements[1].style.border = '2px solid #A2FF86'
                }
            }
        }
    }

    useEffect(() => {
        if (commonError[keyName as keyof typeof commonError]) {
            const inputElements: NodeListOf<HTMLElement> | null = document.querySelectorAll(`.${styles.input}`)
            if (inputElements.length > 0) {
                if (inputElements.length === 4) {
                    const index: number = listKeyName.indexOf(keyName)
                    inputElements[index].style.border = '2px solid #C70039'
                } else {
                    if (listKeyName.indexOf(keyName) === 1) {
                        inputElements[0].style.border = '2px solid #C70039'
                    } else {
                        inputElements[1].style.border = '2px solid #C70039'
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commonError])

    return (
        <div className={styles.wrapper}>
            <input
                value={commonData[keyName as keyof CommonData]}
                className={styles.input}
                type={type}
                placeholder={keyName.charAt(0).toUpperCase() + keyName.slice(1)}
                autoComplete={type ? 'current-password' : 'off'}
                onChange={handleChangeValue}
                onBlur={handleBlurInput}
                onClick={handleClickInput}
            />
            {commonError[keyName as keyof typeof commonError] ? (
                <span className={styles.error}>{commonError[keyName as keyof typeof commonError]}</span>
            ) : (
                <span className={styles.errorhidden}>NoError</span>
            )}

            <i className={styles.clear}>
                <MdClear />
            </i>
        </div>
    )
}

export default InputAccount
