'use client'

import React, { useEffect, useState } from 'react'
import styles from './comment.module.scss'
import { TComment } from '@/types/data'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'
import { getCommentApi, replyCommentApi } from '@/apis/comment'
import { ResponseSuccess } from '@/types/api'

interface Props {
    comment: TComment
    depth: number
}

interface GetComment {
    success: boolean
    populatedComment: TComment
}

const Comment = ({ comment, depth }: Props) => {
    const token = useAppSelector((state) => state.userReducer.token)
    const [isOpenReplyInput, setIsOpenReplyInput] = useState(false)
    const [data, setData] = useState<TComment | null>(comment)
    const [valueReplyInput, setValueReplyInput] = useState<string>('')

    const handleClickComment = () => {
        setIsOpenReplyInput((prev) => !prev)
        if (!isOpenReplyInput) {
            setValueReplyInput('')
        }
    }

    const handleClickReplyComment = async () => {
        if (valueReplyInput.trim().length > 0) {
            const response: ResponseSuccess = await replyCommentApi(token as string, comment._id, valueReplyInput)
            if (response.success) {
                const result: GetComment = await getCommentApi(comment._id)
                if (result.success) {
                    setData(result.populatedComment)
                    setIsOpenReplyInput(false)
                    setValueReplyInput('')
                }
            }
        }
    }

    useEffect(() => {
        setData(comment)
    }, [comment])

    return (
        <div className={`${styles.line} ${depth > 0 ? styles.row : ''}`}>
            {data && (
                <>
                    <div onClick={handleClickComment} className={styles.wrapper}>
                        <Image
                            className={styles.avatar}
                            src={data.commentBy.avatar}
                            width={40}
                            height={40}
                            alt="Avatar"
                        />
                        <div className={styles.container}>
                            <div className={styles.info}>
                                <small className={styles.name}>{data.commentBy.name}</small>
                                {data.commentBy.role === 'admin' && <small className={styles.role}>Admin</small>}
                            </div>
                            <small className={styles.content}>{data.content}</small>
                        </div>
                    </div>
                    {isOpenReplyInput && (
                        <div className={styles.reply}>
                            <input
                                value={valueReplyInput}
                                onChange={(e) => setValueReplyInput(e.target.value)}
                                type="text"
                                className={styles.input}
                                style={{ display: 'block' }}
                                placeholder="Write your comment"
                            />
                            <button onClick={handleClickReplyComment} className={styles.send}>
                                Send
                            </button>
                        </div>
                    )}
                    {data.replies && data.replies.length > 0 && (
                        <div>
                            {data.replies.map((reply, index) => (
                                <Comment key={index} comment={reply} depth={depth + 1} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Comment
