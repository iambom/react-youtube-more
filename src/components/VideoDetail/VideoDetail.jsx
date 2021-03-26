import React from 'react';
import styles from './VideoDetail.module.css';

const VideoDetail = ({video, video : {snippet}, channelLogo}) => (
    <div className={styles.container}>
        <div className={styles.iframe_wrap}>
            <iframe src={`https://www.youtube.com/embed/${video.id}`} title="youtube video player" type="text/html" frameBorder="0" allowFullScreen></iframe>
        </div>
        <p className={styles.title}>{snippet.title}</p>
        <div className={styles.count_wrap}>
            <div className={styles.count_left}>
                <span>{video.statistics.viewCount}회</span>
                <span>{snippet.publishedAt}</span>
            </div>
            <div className={styles.count_right}>
                <button className={styles.btn_like}>{video.statistics.likeCount}</button>
                <button className={styles.btn_dislike}>{video.statistics.dislikeCount}</button>
                <button className={styles.btn_share}>share</button>
                <button className={styles.btn_save}>save</button>
            </div>
        </div>
        <div className={styles.channel_wrap}>
            <a href="#" className='channelLogo'>
                <img src={channelLogo} alt="channel logo"/>
            </a>
        </div>
    </div>
)

export default VideoDetail;