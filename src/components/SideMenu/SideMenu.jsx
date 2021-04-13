import React from 'react';
import styles from './SideMenu.module.css';

const SideMenu = ({display}) => {
    const displayType = display === 'none' ? styles.none : styles.block;
    return (
        <div className={`${styles.container} ${displayType}`}>
            <button><i className="fas fa-house-user"></i><span>홈</span></button>
            <button><i class="fas fa-compass"></i><span>탐색</span></button>
            <button><i class="fab fa-youtube"></i><span>구독</span></button>
            <button><i class="fas fa-archive"></i><span>보관함</span></button>
            <button><i class="fas fa-history"></i><span>시청 기록</span></button>
        </div>
    )
}

export default SideMenu;