import React, { memo } from 'react';
import styles from './SideMenu.module.css';

const SideMenu = memo(() => {
    return (
        <div className={styles.container}>
            <button><i className="fas fa-house-user"></i><span>홈</span></button>
            <button><i className="fas fa-compass"></i><span>탐색</span></button>
            <button><i className="fab fa-youtube"></i><span>구독</span></button>
            <button><i className="fas fa-archive"></i><span>보관함</span></button>
            <button><i className="fas fa-history"></i><span>시청 기록</span></button>
        </div>
    )
});

export default SideMenu;