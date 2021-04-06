import React from 'react';
import Search from '../Search/Search';
import logoImg from '../../images/logo.png';
import styles from './Header.module.css'

const Header = ({onSearch}) => {
    return (
       <div className={styles.header}>
           <div className={styles.headerLeft}>
                <button className={styles.guide}><i className="fas fa-bars"></i></button>
                <a href="https://www.youtube.com/">
                    <img className={styles.logo} src={logoImg} alt="Youtube logo"/>
                </a>
                <span className={styles.regionCode}>KR</span>
           </div>
           <Search onSearch={onSearch}/>
           <div className={styles.headerRight}>
                <button className={styles.app}><i className="fas fa-th"></i></button>
                <button className={styles.setting}><i className="fas fa-ellipsis-v"></i></button>
                <button className={styles.notice}><i className="fas fa-bell"></i></button>
           </div>
       </div>
    )
}

export default Header;