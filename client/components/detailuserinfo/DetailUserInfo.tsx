import React, { useState } from 'react'
import styles from './detailuserinfo.module.scss'
import { InfoUser } from '@/types/data'
import { Avatar } from '../avatar'
import { BasicUserInfo } from '../basicuserinfo'
import { Location } from '../location'

interface Props {
    userInfo: InfoUser
}

const DetailUserInfo = ({ userInfo }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar userInfo={userInfo} />
            </div>
            <div className={styles.info}>
                <BasicUserInfo userInfo={userInfo} />
            </div>
            <div className={styles.location}>
                <Location />
            </div>
        </div>
    )
}

export default DetailUserInfo
