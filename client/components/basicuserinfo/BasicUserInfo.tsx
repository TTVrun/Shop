import React, { useState } from 'react'
import styles from './basicuserinfo.module.scss'
import { InfoUser } from '@/types/data'
import { InteractiveUserInfo } from '../interactiveuserinfo'
import { interactiveKeyName } from '@/constant/interactiveuserinfo'
import { TBasicUserInfo, TError } from '@/types/personal'
import { updateBasicInfoApi } from '@/apis/user'
import { useAppSelector } from '@/redux/hooks'
import { ResponseSuccess } from '@/types/api'
import { Modal } from '../modal'
import { checkValueMethod } from '@/constant/basicuserinfo'

interface Props {
    userInfo: InfoUser
}

const BasicUserInfo = ({ userInfo }: Props) => {
    const token = useAppSelector((state) => state.userReducer.token)
    const [isEdit, setEdit] = useState<boolean>(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [textModal, setTextModal] = useState('')
    const [editData, setEditData] = useState<TBasicUserInfo>({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone
    })
    const [tempData, setTempData] = useState<TBasicUserInfo>({ ...editData })
    const [error, setError] = useState<TError>({
        name: null,
        email: null,
        phone: null
    })

    const checkValue = (key: string) => {
        let err: string | null = null
        checkValueMethod[key as keyof typeof checkValueMethod].find((fn) => {
            const messeage = fn(tempData[key as keyof typeof checkValueMethod])
            setError((prev) => {
                return {
                    ...prev,
                    [key]: messeage
                }
            })
            err = messeage
            return messeage
        })
        return err
    }

    const handleCancelChange = () => {
        setTempData(editData)
        setEdit(false)
        setError({
            name: null,
            email: null,
            phone: null
        })
    }

    const handleSave = async () => {
        const listError = Object.keys(tempData).map((key) => {
            return checkValue(key)
        })
        if (
            listError.every((item) => item === null) &&
            !Object.keys(tempData).every(
                (key) => tempData[key as keyof typeof tempData] === editData[key as keyof typeof editData]
            )
        ) {
            const response: ResponseSuccess = await updateBasicInfoApi(token as string, tempData)
            if (response.success) {
                setIsOpenModal(true)
                setTextModal(response.mes)
                setIsSuccess(true)
                setEditData(tempData)
                setEdit(false)
            } else {
                setIsOpenModal(true)
                setTextModal(response.mes)
                setIsSuccess(false)
            }
        } else if (
            listError.every((item) => item === null) &&
            Object.keys(tempData).every(
                (key) => tempData[key as keyof typeof tempData] === editData[key as keyof typeof editData]
            )
        ) {
            handleCancelChange()
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <InteractiveUserInfo
                    setErrorMessage={setError}
                    errorMessage={error}
                    checkValue={checkValue}
                    keyName={interactiveKeyName.NAME}
                    isEdit={isEdit}
                    data={tempData}
                    setData={setTempData}
                />
                <InteractiveUserInfo
                    setErrorMessage={setError}
                    errorMessage={error}
                    checkValue={checkValue}
                    keyName={interactiveKeyName.EMAIL}
                    isEdit={isEdit}
                    data={tempData}
                    setData={setTempData}
                />
                <div className={styles.wbalance}>
                    <h4 className={styles.title}>Account Balance</h4>
                    <span className={styles.content}>{`$${userInfo.accountBalance} USD`}</span>
                </div>
                <InteractiveUserInfo
                    setErrorMessage={setError}
                    errorMessage={error}
                    checkValue={checkValue}
                    keyName={interactiveKeyName.PHONE}
                    isEdit={isEdit}
                    data={tempData}
                    setData={setTempData}
                />
                <div className={styles.wbtn}>
                    {!isEdit ? (
                        <button className={styles.btn} onClick={() => setEdit(true)}>
                            Change
                        </button>
                    ) : (
                        <>
                            <button onClick={handleCancelChange} className={styles.btn}>
                                Cancel
                            </button>
                            <button className={styles.btn} onClick={handleSave}>
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
            <Modal isOpen={isOpenModal} setOpen={setIsOpenModal} text={textModal} isSuccess={isSuccess} />
        </div>
    )
}

export default BasicUserInfo
