import React, { useEffect } from 'react'
import styles from './navpersonal.module.scss'
import Link from 'next/link'
import { path } from '@/constant/common'
import { FaArrowLeft } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import Image from 'next/image'
import pathPersonal from '@/constant/personal'
import { ResponseSuccess } from '@/types/api'
import { logoutApi } from '@/apis/user'
import { useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/features/userSlide'
import { useRouter } from 'next/navigation'

interface Props {
    id: number
    setId: any
}

const NavPersonal: React.FC<Props> = ({ setId, id }: Props) => {
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
                        <span className={styles.text}>Back home</span>
                    </Link>
                </div>
                <small className={styles.title}>User Profile</small>
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
