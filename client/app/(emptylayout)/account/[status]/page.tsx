'use client'

import { NotFoundStyle } from '@/components/notfound'
import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { InputAccount } from '@/components/inputaccount'
import { CheckError, CommonData, CommonError, SubmitData } from '@/types/account'
import { errorMethod, invalidPathAccount, listKeyName, messagePath, namePath } from '@/constant/account'
import { forgetpasswordApi, signinApi, signupApi } from '@/apis/user'
import { Modal } from '@/components/modal'
import { ResponseSuccess, ResponseSuccessSignin } from '@/types/api'
import { useAppDispatch } from '@/redux/hooks'
import { signin } from '@/redux/features/userSlide'
import path from '@/constant/path'

const Account = ({ params }: { params: { status: string } }) => {
    const isValidPath = invalidPathAccount.includes(params.status)
    const dispatch = useAppDispatch()
    const [toggleSubmit, setToggleSubmit] = useState<boolean>(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isIconSuccess, setIsIconSuccess] = useState<boolean>(true)
    const [textModal, setTextModal] = useState<string>('')
    const [buttonText, setButtonText] = useState<string>('Back home')
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
    const messagePathShow = messagePath[invalidPathAccount.indexOf(params.status)]

    const handleError = (keyName: string): void => {
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
    }

    const handleSubmit = () => {
        listKeyName.forEach((keyName) => {
            handleError(keyName)
        })
        setToggleSubmit((prev) => !prev)
        setIsSubmit(true)
    }

    useEffect(() => {
        const fetchSignupApi = async (data: SubmitData) => {
            const response: ResponseSuccess = await signupApi(data)
            setButtonText(namePath.SIGN_IN)
            setButtonLink(path.SIGN_IN)
            setIsOpenModal(true)
            setTextModal(response.mes)
            if (!response.success) {
                setIsIconSuccess(false)
            } else {
                setIsIconSuccess(true)
            }
        }
        const fetchSigninApi = async (data: SubmitData) => {
            const response: ResponseSuccessSignin = await signinApi(data)
            setIsOpenModal(true)
            setTextModal(response.mes)
            if (!response.success) {
                setIsIconSuccess(false)
            } else {
                setIsIconSuccess(true)
                dispatch(signin(response.token))
            }
        }
        const fetchForgetpassword = async (data: SubmitData) => {
            const response: ResponseSuccess = await forgetpasswordApi(data)
            setButtonText(namePath.SIGN_IN)
            setButtonLink(path.SIGN_IN)
            setIsOpenModal(true)
            setTextModal(response.mes)
            if (!response.success) {
                setIsIconSuccess(false)
            } else {
                setIsIconSuccess(true)
            }
        }

        if (isSubmit) {
            const checkError: CheckError = { ...commonError }
            if (params.status !== invalidPathAccount[1]) {
                delete checkError.name
                delete checkError.email
            }
            if (Object.values(checkError).every((value) => value === null)) {
                const submitData: SubmitData = { ...commonData }
                if (params.status !== invalidPathAccount[1]) {
                    delete submitData.name
                    delete submitData.email
                }
                if (params.status === invalidPathAccount[0]) {
                    fetchSigninApi(submitData)
                }
                if (params.status === invalidPathAccount[1]) {
                    fetchSignupApi(submitData)
                }
                if (params.status === invalidPathAccount[2]) {
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
                        {/* Back home button */}
                        <div className={styles.header}>
                            <Link href={path.HOME} className={styles.btnheader}>
                                <i className={styles.icon}>
                                    <AiOutlineArrowLeft />
                                </i>
                                <span className={styles.content}>Back Home</span>
                            </Link>
                        </div>
                        {/* Container below a back home button */}
                        <div className={styles.wbottom}>
                            {/* Content */}
                            <div className={styles.title}>Welcome back!</div>
                            {params.status === invalidPathAccount[0] && (
                                <div className={styles.subtitle}>
                                    To keep connected with us please login with your personal info
                                </div>
                            )}
                            {params.status === invalidPathAccount[1] && (
                                <div className={styles.subtitle}>
                                    Enter your personal details and start journey with us
                                </div>
                            )}
                            {params.status === invalidPathAccount[2] && (
                                <div className={styles.subtitle}>
                                    Enter your registered email address to reset your password and continue your journey
                                    with us
                                </div>
                            )}
                            {/* Button to navigation */}
                            {!(params.status === invalidPathAccount[0]) && (
                                <Link href={path.SIGN_IN} className={styles.btn}>
                                    Sing in
                                </Link>
                            )}
                            {!(params.status === invalidPathAccount[1]) && (
                                <Link href={path.SIGN_UP} className={styles.btn}>
                                    Sing up
                                </Link>
                            )}
                            {!(params.status === invalidPathAccount[2]) && (
                                <Link href={path.FOETGET_PASSWORD} className={styles.btn}>
                                    Forget passwrod
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* Handle account */}
                    <div className={styles.right}>
                        <div className={styles.filter}>
                            <form className={styles.form}>
                                <small className={styles.status}>{messagePathShow}</small>
                                {params.status === 'signup' && (
                                    <InputAccount
                                        commonData={commonData}
                                        setCommonData={setCommonData}
                                        commonError={commonError}
                                        keyName="name"
                                        handleError={handleError}
                                        setCommonError={setCommonError}
                                    />
                                )}
                                <InputAccount
                                    commonData={commonData}
                                    setCommonData={setCommonData}
                                    commonError={commonError}
                                    keyName="username"
                                    handleError={handleError}
                                    setCommonError={setCommonError}
                                />
                                {params.status === 'signup' && (
                                    <InputAccount
                                        commonData={commonData}
                                        setCommonData={setCommonData}
                                        commonError={commonError}
                                        keyName="email"
                                        handleError={handleError}
                                        setCommonError={setCommonError}
                                    />
                                )}
                                <InputAccount
                                    commonData={commonData}
                                    setCommonData={setCommonData}
                                    commonError={commonError}
                                    keyName="password"
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
