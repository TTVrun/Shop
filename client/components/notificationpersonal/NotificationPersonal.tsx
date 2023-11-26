import React, { useState, useEffect } from 'react'
import styles from './notificationpersonal.module.scss'
import layoutNotification from '@/constant/notificationpersonal'
import { Notification } from '@/types/data'
import Image from 'next/image'

interface Props {
    listNotification: Notification[]
}

const NotificationPersonal: React.FC<Props> = ({ listNotification }: Props) => {
    const [layoutNumber, setLayoutNumber] = useState<number>(0)

    useEffect(() => {
        const layoutElements: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.itemicon}`)
        if (layoutElements) {
            layoutElements[layoutNumber].style.backgroundColor = '#ccc'
            for (let index = 0; index < layoutElements.length; index++) {
                if (index !== layoutNumber) {
                    layoutElements[index].removeAttribute('style')
                }
            }
        }
    }, [layoutNumber])

    useEffect(() => {
        const layoutElement: HTMLElement | null = document.querySelector(`.${styles.layout}`)
        if (layoutElement) {
            layoutElement.classList.add(styles[`layout${layoutNumber}`])
            for (let index = 0; index < 3; index++) {
                if (index !== layoutNumber) {
                    layoutElement.classList.remove(styles[`layout${index}`])
                }
            }
        }
    }, [layoutNumber])

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <span className={styles.title}>Notification</span>
                <ul className={styles.wicon}>
                    {layoutNotification.map((item) => {
                        return (
                            <li onClick={() => setLayoutNumber(item.id)} className={styles.itemicon} key={item.id}>
                                <i className={styles.icon}>
                                    <item.icon />
                                </i>
                            </li>
                        )
                    })}
                </ul>
            </header>
            <ul className={styles.layout}>
                {listNotification.map((item, index) => {
                    return (
                        <li className={styles.itemlayout} key={index}>
                            <Image className={styles.img} src={item.image} height={60} width={60} alt="image" />
                            <div className={styles.content}>
                                <small className={styles.name}>{item.title}</small>
                                <p className={styles.sub}>{item.subtitle}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default NotificationPersonal
