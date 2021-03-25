import React from 'react';
import styles from './VideoItem.module.css';

const VideoItem = ({video, video : {snippet}, channelLogos, onVideoClick, display}) => {
    console.log("VideoItem channelLogos : ",channelLogos)
    const displayType = display === 'list' ? styles.list : styles.grid;
    return (
        <li className={`${styles.container} ${displayType}`} onClick={() => onVideoClick(video)}>
            <div>
                <img src={snippet.thumbnails.medium.url} alt="video thumbnail"/>
            </div>
            <div className={styles.metadata}>
                <img src={channelLogos[0]} alt="channel logo"/>
                <div className={styles.txt}>
                    <p className={styles.title}>{snippet.title}</p>
                    <p className={styles.channel_title}>{snippet.channelTitle}</p>
                    <span>{video.statistics.viewCount}회</span>
                    <span>{snippet.publishedAt}</span>
                </div>
            </div>
        </li>
    );
}

export default VideoItem;