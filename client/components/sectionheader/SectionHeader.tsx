import React from 'react'
import styles from './sectionheader.module.scss'
import Link from 'next/link'
import { path } from '@/constant/common'

interface Props {
    title: string
}

const SectionHeader = ({ title }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <small className={styles.title}>{title}</small>
                <Link href={path.HOME} className={styles.link}>
                    Back home
                </Link>
            </div>
        </div>
    )
}

export default SectionHeader
