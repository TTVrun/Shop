'use client'

import React, { Suspense, useState } from 'react'
import { memo, useEffect } from 'react'
import { path, namePath } from '@/constant/common'
import { Cart } from '../cart'
import { Notification } from '../notification'
import { Account } from '../account'
import { ButtonAccount } from '../buttonaccount'
import { useAppSelector } from '@/redux/hooks'
import { getCurrentApi } from '@/apis/user'
import { TGetCurrent } from '@/types/api'
import { InfoUser } from '@/types/data'

const Action: React.FC = () => {
    const isSignin = useAppSelector((state) => state.userReducer.isSignin)
    const token = useAppSelector((state) => state.userReducer.token)
    const [data, setData] = useState<InfoUser | null>(null)
    useEffect(() => {
        const fetchGetCurrent = async () => {
            const response: TGetCurrent = await getCurrentApi(token as string)
            if (response.success) {
                setData(response.data)
            }
        }

        if (isSignin) {
            fetchGetCurrent()
        }
    }, [isSignin, token])

    return (
        <>
            {isSignin ? (
                <>
                    <Cart />
                    {data && (
                        <Notification
                            countNotification={data.countNewNotification}
                            listNotification={data.notification}
                        />
                    )}
                    {data && <Account name={data.name} avatar={data.avatar} _id={data._id} />}
                </>
            ) : (
                <>
                    <ButtonAccount text={namePath.SIGN_UP} link={path.SIGN_UP} />
                    <ButtonAccount text={namePath.SIGN_IN} link={path.SIGN_IN} />
                </>
            )}
        </>
    )
}

export default memo(Action)
