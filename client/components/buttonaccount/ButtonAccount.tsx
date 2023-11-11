import React from 'react'
import styles from './buttonaccount.module.scss'
import { useRouter } from 'next/navigation'

interface Props {
    text: string
    link: string
}

const ButtonAccount = ({ text, link }: Props) => {
    const router = useRouter()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        return router.push(link)
    }
    return (
        <button onClick={handleClick} className={styles.wrapper}>
            {text}
        </button>
    )
}

export default ButtonAccount
