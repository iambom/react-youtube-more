import React from 'react';
import styles from './SideMenu.module.css';

const SideMenu = ({display}) => {
    const displayType = display === 'none' ? styles.none : styles.block;
    return (
        <div className={`${styles.container} ${displayType}`}>side menu</div>
    )
}

export default SideMenu;