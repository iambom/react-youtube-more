import React from 'react';
import Search from '../Search/Search';
import logoImg from '../../images/logo.png';
import styles from './Header.module.css'

const Header = ({onSearch}) => {
    return (
       <div className={styles.container}>
           <div className={styles.headerLeft}>
                <button className={styles.guide}>guide</button>
                <a href="https://www.youtube.com/">
                    <img className={styles.logo} src={logoImg} alt="Youtube logo"/>
                </a>
                <span className={styles.regionCode}>KR</span>
           </div>
           <Search onSearch={onSearch}/>
           <div className={styles.headerRight}>
                <button className={styles.app}>App</button>
                <button className={styles.setting}>Setting</button>
                <button className={styles.notice}>Notice</button>
           </div>
       </div>
    )
}

export default Header;