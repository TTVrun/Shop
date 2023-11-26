'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'

import styles from './page.module.scss'
import { InputAccount } from '@/components/inputaccount'
import { ContentAccount } from '@/components/contentaccount'
import { NotFoundStyle } from '@/components/notfound'
import { Modal } from '@/components/modal'
import { errorMethod, listInvalidPathAccount, listKeyName, pathAccount, keyNameObj } from '@/constant/account'
import { namePath } from '@/constant/common'
import { path } from '@/constant/common'
import { forgetpasswordApi, signinApi, signupApi } from '@/apis/user'
import { useAppDispatch } from '@/redux/hooks'
import { signin } from '@/redux/features/userSlide'
import { ResponseSuccess, ResponseSuccessSignin } from '@/types/api'
import { CheckError, CommonData, CommonError, SubmitData } from '@/types/account'

const Account = ({ params: { status } }: { params: { status: string } }) => {
    const dispatch = useAppDispatch()
    const [toggleSubmit, setToggleSubmit] = useState<boolean>(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isIconSuccess, setIsIconSuccess] = useState<boolean>(true)
    const [textModal, setTextModal] = useState<string>('')
    const [buttonText, setButtonText] = useState<string>(namePath.FOETGET_PASSWORD)
    const [buttonLink, setButtonLink] = useState<string>(path.HOME)
    const [commonData, setCommonData] = useState<CommonData>({
        name: '',
        username: '',
        email: '',
        password: ''
    })
    const [commonError, setCommonError] = useState<CommonError>({
        name: null,
        username: null,
        email: null,
        password: null
    })
    const isValidPath = useMemo(() => {
        return listInvalidPathAccount.includes(status)
    }, [status])
    const messagePathShow = useMemo(() => {
        return Object.values(namePath)[listInvalidPathAccount.indexOf(status)]
    }, [status])

    const handleError = useCallback(
        (keyName: string): void => {
            let message: null | string = null
            for (let fn of errorMethod[keyName as keyof typeof errorMethod]) {
                const mess = fn(commonData[keyName as keyof typeof commonData])
                if (mess) {
                    message = mess
                    break
                }
            }
            setCommonError((prev) => {
                return {
                    ...prev,
                    [keyName]: message
                }
            })
        },
        [commonData]
    )

    const handleSubmit = () => {
        listKeyName.forEach((keyName) => {
            handleError(keyName)
        })
        setToggleSubmit((prev) => !prev)
        setIsSubmit(true)
    }

    const openModal = (response: ResponseSuccess | ResponseSuccessSignin, buttonText: string, buttonLink: string) => {
        setIsOpenModal(true)
        setTextModal(response.mes)
        setButtonText(buttonText)
        setButtonLink(buttonLink)
        if (!response.success) {
            setIsIconSuccess(false)
        } else {
            setIsIconSuccess(true)
        }
    }

    useEffect(() => {
        const fetchSignupApi = async (data: SubmitData) => {
            const response: ResponseSuccess = await signupApi(data)
            openModal(response, namePath.SIGN_IN, path.SIGN_IN)
        }
        const fetchSigninApi = async (data: SubmitData) => {
            const response: ResponseSuccessSignin = await signinApi(data)
            if (response.success) {
                dispatch(signin(response.token))
            }
            openModal(response, namePath.HOME, path.HOME)
        }
        const fetchForgetpassword = async (data: SubmitData) => {
            const response: ResponseSuccess = await forgetpasswordApi(data)
            openModal(response, namePath.SIGN_IN, path.SIGN_IN)
        }

        if (isSubmit) {
            const checkError: CheckError = { ...commonError }
            if (status !== pathAccount.SIGN_UP) {
                delete checkError.name
                delete checkError.email
            }
            if (Object.values(checkError).every((value) => value === null)) {
                const submitData: SubmitData = { ...commonData }
                if (status !== pathAccount.SIGN_UP) {
                    delete submitData.name
                    delete submitData.email
                }
                if (status === pathAccount.SIGN_IN) {
                    fetchSigninApi(submitData)
                }
                if (status === pathAccount.SIGN_UP) {
                    fetchSignupApi(submitData)
                }
                if (status === pathAccount.FOETGET_PASSWORD) {
                    fetchForgetpassword(submitData)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleSubmit, isSubmit])

    return (
        <div>
            {isValidPath ? (
                <div className={styles.wrapper}>
                    {/* Left layout */}
                    <div className={styles.left}>
                        <ContentAccount status={status} />
                    </div>
                    {/* Handle account */}
                    <div className={styles.right}>
                        <div className={styles.filter}>
                            <form className={styles.form}>
                                <small className={styles.status}>{messagePathShow}</small>
                                {status === pathAccount.SIGN_UP && (
                                    <InputAccount
                                        commonData={commonData}
                                        setCommonData={setCommonData}
                                        commonError={commonError}
                                        keyName={keyNameObj.NAME}
                                        handleError={handleError}
                                        setCommonError={setCommonError}
                                    />
                                )}
                                <InputAccount
                                    commonData={commonData}
                                    setCommonData={setCommonData}
                                    commonError={commonError}
                                    keyName={keyNameObj.USERNAME}
                                    handleError={handleError}
                                    setCommonError={setCommonError}
                                />
                                {status === pathAccount.SIGN_UP && (
                                    <InputAccount
                                        commonData={commonData}
                                        setCommonData={setCommonData}
                                        commonError={commonError}
                                        keyName={keyNameObj.EMAIL}
                                        handleError={handleError}
                                        setCommonError={setCommonError}
                                    />
                                )}
                                <InputAccount
                                    commonData={commonData}
                                    setCommonData={setCommonData}
                                    commonError={commonError}
                                    keyName={keyNameObj.PASSWORD}
                                    handleError={handleError}
                                    setCommonError={setCommonError}
                                    type="password"
                                />
                                <div onClick={handleSubmit} className={styles.submit}>
                                    <div className={styles.btn}>
                                        <div>Submit</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Modal
                        isOpen={isOpenModal}
                        setOpen={setIsOpenModal}
                        text={textModal}
                        isSuccess={isIconSuccess}
                        buttonText={buttonText}
                        butttonLink={buttonLink}
                    />
                </div>
            ) : (
                <NotFoundStyle />
            )}
        </div>
    )
}

export default Account
