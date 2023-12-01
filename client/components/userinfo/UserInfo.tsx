import React, { useState } from 'react'
import styles from './userinfo.module.scss'
import { InfoUser } from '@/types/data'
import Image, { StaticImageData } from 'next/image'
import { TbExchange } from 'react-icons/tb'
import { ConfigModal } from '../configmodal'
import upload from '@/assets/images/upload.webp'
import { changeAvatarApi } from '@/apis/user'
import { useAppSelector } from '@/redux/hooks'
import Loading from '@/app/loading'

interface Props {
    userInfo: InfoUser
    setToggleUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInfo = ({ userInfo, setToggleUpdate }: Props) => {
    const token: string | null = useAppSelector((state) => state.userReducer.token)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [image, setImage] = useState<File | null>(null)
    const [link, setLink] = useState<string | StaticImageData>(upload)

    const handleClickChangeAvt = () => {
        setIsOpenModal(true)
    }

    const handleImportAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setImage(e.target.files[0])
        if (e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0])
            setLink(url)
        }
    }

    const handleChangeAvatar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!image) return
        const fromData = new FormData()
        fromData.append('image', image as File)
        setIsLoading(true)
        const response = await changeAvatarApi(token as string, fromData)
        setIsLoading(false)
        if (response.success) {
            setToggleUpdate((prev) => !prev)
            setIsOpenModal(false)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <div className={styles.wimage}>
                    <Image className={styles.image} src={userInfo.avatar} alt="Avatar" width={80} height={80} />
                    <i onClick={handleClickChangeAvt} className={styles.icon}>
                        <TbExchange />
                    </i>
                </div>
                <small className={styles.name}>{userInfo.name}</small>
            </div>
            <ConfigModal setIsOpen={setIsOpenModal} isOpen={isOpenModal}>
                <div className={styles.notification}>
                    <h3 className={styles.title}>Change avatar</h3>
                    <label htmlFor="upload-input" className={styles.wimage}>
                        <Image className={styles.image} src={link} alt="Upload" width={140} height={140} />
                    </label>
                    <input onChange={handleImportAvatar} id="upload-input" style={{ display: 'none' }} type="file" />
                    <button onClick={handleChangeAvatar} className={styles.btnchange}>
                        Send
                    </button>
                </div>
            </ConfigModal>
            {isLoading && <Loading />}
        </div>
    )
}

export default UserInfo
