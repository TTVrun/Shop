import React from 'react'
import styles from './interactiveuserinfo.module.scss'
import { TBasicUserInfo, TError } from '@/types/personal'

interface Props {
    keyName: string
    isEdit: boolean
    data: TBasicUserInfo
    setData: React.Dispatch<React.SetStateAction<TBasicUserInfo>>
    checkValue: any
    errorMessage: TError
    setErrorMessage: React.Dispatch<React.SetStateAction<TError>>
    typeInput?: string
}

const InteractiveUserInfo = ({
    keyName,
    isEdit,
    data,
    setData,
    checkValue,
    errorMessage,
    setErrorMessage,
    typeInput = 'text'
}: Props) => {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => {
            return {
                ...prev,
                [keyName]: e.target.value
            }
        })
    }

    const handleClearError = () => {
        setErrorMessage((prev) => {
            return {
                ...prev,
                [keyName]: null
            }
        })
    }

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{keyName.charAt(0).toUpperCase() + keyName.slice(1)}</h4>
            {isEdit ? (
                <input
                    onBlur={() => checkValue(keyName)}
                    onClick={handleClearError}
                    className={`${styles.input} ${errorMessage[keyName as keyof TError] ? styles.errorinput : ''}`}
                    // style={{ borderColor: '#16FF00', backgroundColor: 'transparent' }}
                    onChange={handleChangeValue}
                    value={data[keyName as keyof TBasicUserInfo]}
                />
            ) : (
                <small className={styles.content}>{data[keyName as keyof TBasicUserInfo]}</small>
            )}
            <span className={errorMessage[keyName as keyof TError] ? styles.errshow : styles.errhide}>
                {errorMessage[keyName as keyof TError] || 'error'}
            </span>
        </div>
    )
}

export default InteractiveUserInfo
