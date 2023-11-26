import React, { useEffect } from 'react'
import styles from './navpersonal.module.scss'
import Link from 'next/link'
import { path } from '@/constant/common'
import { FaArrowLeft } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import Image from 'next/image'
import pathPersonal from '@/constant/personal'
import { ResponseSuccess } from '@/types/api'
import { logoutApi } from '@/apis/user'
import { useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/features/userSlide'
import { useRouter } from 'next/navigation'

interface Props {
    avatar: string
    id: number
    setId: any
    name: string
}

const NavPersonal: React.FC<Props> = ({ avatar, setId, id, name }: Props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleClickLogout = () => {
        const fetchApiLogout = async () => {
            const response: ResponseSuccess = await logoutApi()
            if (response.success) {
                dispatch(logout())
                router.push(path.HOME)
            }
        }

        fetchApiLogout()
    }

    useEffect(() => {
        const itemElements: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.item}`)
        if (itemElements) {
            itemElements[id].classList.add(styles.active)
            for (let index = 0; index < pathPersonal.length; index++) {
                if (index !== id) {
                    itemElements[index].classList.remove(styles.active)
                }
            }
        }
    }, [id])

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.header}>
                    <Link className={styles.btnheader} href={path.HOME}>
                        <i className={styles.icon}>
                            <FaArrowLeft />
                        </i>
                        <span className={styles.title}>Back home</span>
                    </Link>
                </div>
                <div className={styles.avatar}>
                    <Image className={styles.image} src={avatar} height={80} width={80} alt="Avatar" />
                    <div className={styles.name}>{name}</div>
                </div>
                <div className={styles.action}>
                    {pathPersonal.map((item) => {
                        return (
                            <div onClick={() => setId(item.id)} key={item.id} className={styles.item}>
                                <i className={styles.iconitem}>
                                    <item.icon />
                                </i>
                                <span className={styles.info}>{item.title}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.logout}>
                <div onClick={handleClickLogout} className={styles.wlogout}>
                    <i className={styles.icon}>
                        <FiLogOut />
                    </i>
                    <span className={styles.name}>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default NavPersonal
