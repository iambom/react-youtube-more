import React from 'react';
import styles from './Search.module.css';

const Search = (props) => {
    return(
        <div className={styles.search}>
            <input type="search" placeholder="검색"/>
            <button className={styles.button}>search button</button>
        </div>
    )
}

export default Search;