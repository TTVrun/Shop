import React, { memo } from 'react'
import styles from './comments.module.scss'

const Comments = () => {
    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Comments</h4>
            <div className={styles.content}>
                <div>Comment</div>
                <div>Comment</div>
                <div>Comment</div>
                <div>Comment</div>
            </div>
        </div>
    )
}

export default memo(Comments)
