import React, { useRef, useState } from 'react';
import styles from './Search.module.css';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const history = useHistory();
    const inputRef = useRef();
    const [showSearchWrap, setShowSearchWrap] = useState(false);

    const handleSearch = () => {
        setShowSearchWrap(false)
        const value = inputRef.current.value;
        onSearch(value);
    };

    const onSearch = (value) => {
      history.push(`/search?query=${value}`);
    };
    
    const onClick = () => {
        handleSearch();
    };

    const onKeyPress = (event) => {
        if(event.key === 'Enter') {
            handleSearch();
        }
    };

    const onSearchWrap = () => {
        showSearchWrap ? setShowSearchWrap(false) : setShowSearchWrap(true)
    }

    const offSearchWrap = () => {
        setShowSearchWrap(false)
    }
    const isToggle = showSearchWrap ? styles.on : ""

    return(
        <div className={styles.search_container}>
            <div className={`${styles.search_wrap} ${isToggle}`}>
                <button className={styles.btn_close} onClick={offSearchWrap}><i className="fas fa-arrow-left"></i></button>
                <div className={styles.input_wrap}>
                    <input ref={inputRef} type="search" placeholder="검색" onKeyPress={onKeyPress}/>
                    <button className={styles.button} type="submit" onClick={onClick}><i className="fas fa-search"></i></button>
                </div>
            </div>
            
            <button className={styles.mo_search_button} onClick={onSearchWrap}>
                <i className="fas fa-search"></i></button>
        </div>
    )
};

export default Search;