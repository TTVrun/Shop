import React, { memo } from 'react'
import styles from './navigation.module.scss'
import navigation from '@/constant/navigation'
import Link from 'next/link'

const Navigation: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {navigation.map((item) => {
                    return (
                        <Link className={styles.link} href={item.link} key={item.id}>
                            <i className={styles.icon}>
                                <item.icon />
                            </i>
                            <span className={styles.title}>{item.title}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default memo(Navigation)
