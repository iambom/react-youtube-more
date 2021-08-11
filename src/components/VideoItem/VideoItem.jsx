import React, { memo } from 'react';
import styles from './VideoItem.module.css';
import { Link } from 'react-router-dom';
import { getPublishedTime } from "../../common/getPublishedTime";

const VideoItem = memo(({video, video : {snippet}, channelLogo, display}) => {
    // console.log("VideoItem : ",video)
    const getViewCount = () => {
        const viewCount = video.statistics.viewCount;
        const koreanUnits = ['', '만', '억', '조'];
        let answer = '';
        let unit = 10000;
        let index = 0;
        let division = Math.pow(unit, index);

        while(Math.floor(viewCount / division) > 0) {
            const mod = Math.floor(viewCount % (division * unit) / division);
            answer = `${mod}${koreanUnits[index]}`;
            division = Math.pow(unit, ++index);
        }
        return answer;
    };
    const displayType = display === 'list' ? styles.list : styles.grid;
    return (
        <li className={`${styles.container} ${displayType}`}>
            <Link to={`/video/${video.id}`}>
                <div className={styles.img_wrap}>
                    <img src={snippet.thumbnails.medium.url} alt="video thumbnail"/>
                </div>
                <div className={styles.metadata}>
                    <img src={channelLogo} alt="channel logo"/>
                    <div className={styles.txt}>
                        <p className={styles.title}>{snippet.title}</p>
                        <p className={styles.channel_title}>{snippet.channelTitle}</p>
                        <span className={styles.view_count}>조회수 {getViewCount()}회</span>
                        <span>{getPublishedTime(snippet.publishedAt)}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
});

export default VideoItem;