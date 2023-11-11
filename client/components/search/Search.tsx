import React from 'react'
import styles from './search.module.scss'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
    return (
        <div className={styles.wrapper}>
            <input className={styles.input} type="text" placeholder="Search something" />
            <i className={styles.icon}>
                <BsSearch />
            </i>
        </div>
    )
}

export default Search
