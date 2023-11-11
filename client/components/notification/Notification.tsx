import React from 'react'
import styles from './notification.module.scss'
import { IoNotificationsSharp } from 'react-icons/io5'

const Notification = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <IoNotificationsSharp />
                <span className={styles.number}>1</span>
            </div>
        </div>
    )
}

export default Notification
