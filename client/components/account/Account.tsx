import React, { memo } from 'react'
import Link from 'next/link'
import styles from './account.module.scss'
import Image from 'next/image'

interface Props {
    avatar: string
    name: string
    _id: string
}

const Account: React.FC<Props> = ({ avatar, name, _id }: Props) => {
    return (
        <Link className={styles.wrapper} href={`/personal/${_id}`}>
            {avatar && <Image className={styles.avatar} src={avatar} height={40} width={40} alt="Avatar" />}
            <small className={styles.title}>{name}</small>
        </Link>
    )
}

export default memo(Account)
