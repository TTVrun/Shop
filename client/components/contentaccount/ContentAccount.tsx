import React, { memo } from 'react'
import Link from 'next/link'

import styles from './contentaccount.module.scss'
import { path } from '@/constant/common'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { namePath } from '@/constant/common'
import { pathAccount } from '@/constant/account'
import { content } from '@/constant/account'

interface Props {
    status: string
}

const ContentAccount = ({ status }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Link href={path.HOME} className={styles.btnheader}>
                    <i className={styles.icon}>
                        <AiOutlineArrowLeft />
                    </i>
                    <span className={styles.content}>{namePath.HOME}</span>
                </Link>
            </div>
            {/* Container below a back home button */}
            <div className={styles.wbottom}>
                {/* Content */}
                <div className={styles.title}>{content.TITLE}</div>
                {status === pathAccount.SIGN_IN && <div className={styles.subtitle}>{content.SIGN_IN}</div>}
                {status === pathAccount.SIGN_UP && <div className={styles.subtitle}>{content.SIGN_UP}</div>}
                {status === pathAccount.FOETGET_PASSWORD && (
                    <div className={styles.subtitle}>{content.FOETGET_PASSWORD}</div>
                )}
                {/* Button to navigation */}
                {!(status === pathAccount.SIGN_IN) && (
                    <Link href={path.SIGN_IN} className={styles.btn}>
                        {namePath.SIGN_IN}
                    </Link>
                )}
                {!(status === pathAccount.SIGN_UP) && (
                    <Link href={path.SIGN_UP} className={styles.btn}>
                        {namePath.SIGN_UP}
                    </Link>
                )}
                {!(status === pathAccount.FOETGET_PASSWORD) && (
                    <Link href={path.FOETGET_PASSWORD} className={styles.btn}>
                        {namePath.FOETGET_PASSWORD}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default memo(ContentAccount)
