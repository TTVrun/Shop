'use client'

import { getCurrentApi } from '@/apis/user'
import { useAppSelector } from '@/redux/hooks'
import { InfoUser } from '@/types/data'
import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import { NavPersonal } from '@/components/navpersonal'
import { NotificationPersonal } from '@/components/notificationpersonal'
import { DetailUserInfo } from '@/components/detailuserinfo'

interface Response {
    success: boolean
    data: InfoUser
}

const Personal = ({ params: { uid } }: { params: { uid: string } }) => {
    const token = useAppSelector((state) => state.userReducer.token)
    const [data, setData] = useState<InfoUser | null>(null)
    const [idShow, setIdShow] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await getCurrentApi(token as string)
            if (response.success) {
                setData(response.data)
            }
        }
        if (token) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.wrapper}>
            {data && (
                <>
                    <div className={styles.left}>
                        <NavPersonal id={idShow} setId={setIdShow} />
                    </div>
                    <div className={styles.right}>
                        {idShow === 0 && <DetailUserInfo userInfo={data} />}
                        {idShow === 1 && <div>Cart</div>}
                        {idShow === 2 && <div>Whislit</div>}
                        {idShow === 3 && <NotificationPersonal listNotification={data.notification} />}
                    </div>
                </>
            )}
        </div>
    )
}

export default Personal
