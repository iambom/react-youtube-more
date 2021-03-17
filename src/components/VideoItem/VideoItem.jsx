import React from 'react';
import styles from './VideoItem.module.css';

const VideoItem = ({video, video : {snippet}, onVideoClick}) => {
    // console.log(video)
    return (
        <li className={styles.container} onClick={() => onVideoClick(video)}>
            <div>
                <img src={snippet.thumbnails.medium.url} alt="video thumbnail"/>
            </div>
            <div className={styles.metadata}>
                <p className={styles.title}>{snippet.title}</p>
                <p>{snippet.channelTitle}</p>
                <span>조회수</span>
                <span>{snippet.publishedAt}</span>
            </div>
        </li>
    );
}

export default VideoItem;