import React from 'react'
import styles from './notfound.module.scss'
import Link from 'next/link'

const NotFoundStyle = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                4<span>0</span>4
            </header>
            <p className={styles.text}>Page not found</p>
            <Link className={styles.link} href="/">
                Back Home
            </Link>
        </div>
    )
}

export default NotFoundStyle
