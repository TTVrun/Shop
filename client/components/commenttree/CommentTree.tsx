import React from 'react'
import { Comment } from '../comment'
import { TComment } from '@/types/data'

interface Props {
    listComment: TComment[]
}

const CommentTree = ({ listComment }: Props) => {
    return (
        <div>
            {listComment.length > 0 ? (
                listComment.map((comment, index) => {
                    return <Comment key={index} comment={comment} depth={0} />
                })
            ) : (
                <span>No Comment</span>
            )}
        </div>
    )
}

export default CommentTree
