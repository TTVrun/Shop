'use client'

import React, { memo, useState, useEffect } from 'react'
import styles from './notification.module.scss'
import { IoNotificationsSharp } from 'react-icons/io5'
import { Notification } from '@/types/data'
import { ShowModal } from '../showmodal'
import Image from 'next/image'
import { resetCount } from '@/apis/user'

interface Props {
    countNotification: number
    listNotification: Array<Notification>
}

const Notification: React.FC<Props> = ({ countNotification, listNotification }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [count, setCount] = useState<number>(countNotification)

    const handleOpenModal = async () => {
        setIsOpen(true)
        setCount(0)
        await resetCount()
    }

    return (
        <div className={styles.wrapper}>
            <div onClick={handleOpenModal} className={styles.icon}>
                <IoNotificationsSharp />
                {count > 0 ? (
                    <span className={styles.number}>{count}</span>
                ) : (
                    <span className={styles.none}>{count}</span>
                )}
            </div>
            <ShowModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className={styles.container}>
                    <h3 className={styles.title}>Notification</h3>
                    <ul className={styles.listitem}>
                        {listNotification.map((element, index) => {
                            return (
                                <li className={styles.item} key={index}>
                                    <Image
                                        className={styles.img}
                                        src={element.image}
                                        height={60}
                                        width={60}
                                        alt="Avatar"
                                    />
                                    <div className={styles.content}>
                                        <small className={styles.name}>{element.title}</small>
                                        <p className={styles.sub}>{element.subtitle}</p>
                                    </div>
                                    {index < countNotification && <span className={styles.new}>new</span>}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </ShowModal>
        </div>
    )
}

export default memo(Notification)
