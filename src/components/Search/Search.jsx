import React, { useRef } from 'react';
import styles from './Search.module.css';

const Search = ({onSearch}) => {
    const inputRef = useRef();
    const handleSearch = () => {
        const value = inputRef.current.value;
        onSearch(value);
    }
    
    const onClick = () => {
        handleSearch();
    }

    const onKeyPress = (event) => {
        if(event.key === 'Enter') {
            handleSearch();
        }
    }
    
    return(
        <div className={styles.search}>
            <input ref={inputRef} type="search" placeholder="검색" onKeyPress={onKeyPress}/>
            <button className={styles.button} type="submit" onClick={onClick}><i className="fas fa-search"></i></button>
        </div>
    )
}

export default Search;