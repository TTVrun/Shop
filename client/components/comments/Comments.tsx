'use client'

import React, { memo, useEffect, useState } from 'react'
import styles from './comments.module.scss'
import { useAppSelector } from '@/redux/hooks'
import { Modal } from '../modal'
import { commentProductApi } from '@/apis/comment'
import { TComment, Product } from '@/types/data'
import { getProductApi } from '@/apis/product'
import { Comment } from '../comment'
import { CommentTree } from '../commenttree'

interface Props {
    pid: string
}

interface Response {
    success: boolean
    data: Product
}

const Comments = ({ pid }: Props) => {
    const [valueInput, setValueInput] = useState<string>('')
    const [listComment, setListComment] = useState<TComment[] | []>([])
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [textModal, setTextModal] = useState<string>('')
    const token = useAppSelector((state) => state.userReducer.token)

    const handleComment = async () => {
        if (valueInput) {
            if (!token) {
                setIsOpenModal(true)
                setTextModal('Please sign in to comment')
                setIsSuccess(false)
            } else {
                const response = await commentProductApi(token, pid, valueInput)
                if (response.success) {
                    setToggleUpdate((prev) => !prev)
                    setValueInput('')
                }
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await getProductApi(pid as string)
            if (response.success) {
                setListComment(response.data.comment)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleUpdate])

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Comments</h4>
            <div className={styles.content}>
                <CommentTree listComment={listComment} />
            </div>
            <div className={styles.comment}>
                <input
                    className={styles.input}
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    type="text"
                    placeholder="Write your comment"
                />
                <button onClick={handleComment} className={styles.btn}>
                    Send
                </button>
            </div>
            <Modal isOpen={isOpenModal} setOpen={setIsOpenModal} text={textModal} isSuccess={isSuccess} />
        </div>
    )
}

export default memo(Comments)
