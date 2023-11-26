import React, { memo } from 'react'
import styles from './header.module.scss'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import { Search } from '../search'
import { Action } from '../action'
import Link from 'next/link'
import { path } from '@/constant/common'

const Header = async () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Link href={path.HOME} className={styles.logo}>
                    <Image priority className={styles.image} src={logo} width={234} height={24} alt="Logo" />
                </Link>
                <div className={styles.search}>
                    <Search />
                </div>
                <div className={styles.action}>
                    <Action />
                </div>
            </header>
        </div>
    )
}

export default memo(Header)
