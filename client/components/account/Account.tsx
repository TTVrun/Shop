import React from 'react'
import Link from 'next/link'
import { IoPerson } from 'react-icons/io5'
import styles from './account.module.scss'

const Account = () => {
    return (
        <Link className={styles.wrapper} href="/account">
            <i className={styles.icon}>
                <IoPerson />
            </i>
            <small>Account</small>
        </Link>
    )
}

export default Account
