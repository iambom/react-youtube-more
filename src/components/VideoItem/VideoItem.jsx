import React from 'react';
import styles from './VideoItem.module.css';

const VideoItem = ({video, video : {snippet}, channel, channelLogo, onVideoClick, display}) => {
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
    }

    const getPublishedTime = () => {
        let now = new Date(); 
        let writeDay = new Date(snippet.publishedAt);
        let answer = '';
        let publishedTime = '';
        if(now.getFullYear() > writeDay.getFullYear()) {
            answer = now.getFullYear() - writeDay.getFullYear();
            publishedTime = `${answer}년 전`
        }else if(now.getMonth() > writeDay.getMonth()) {
            answer = now.getMonth() - writeDay.getMonth();
            publishedTime = `${answer}개월 전`;
        }else if(now.getDate() > writeDay.getDate()) {
            answer = now.getDate() - writeDay.getDate();
            publishedTime = `${answer}일 전`;
        }else if(now.getDate() === writeDay.getDate()){
            let nowTime = now.getTime();
            let writeTime = writeDay.getTime();
            if(nowTime > writeTime) {
                let sec, min, hour, day;
                sec = parseInt(nowTime - writeTime) / 1000;
                day = parseInt(sec/60/60/24);
                sec = (sec - (day * 60 * 60 * 24));
                hour = parseInt(sec/60/60);
                sec = (sec - (hour*60*60));
                min = parseInt(sec/60);
                sec = parseInt(sec-(min*60));
                if(hour > 0) {
                    publishedTime = `${hour}시간 전`;
                }else if(min > 0) {
                    publishedTime = `${min}분 전`;
                }else if(sec > 0) {
                    publishedTime = `${sec}초 전`;
                }
            }
        }
        return publishedTime;
    }
    
    const displayType = display === 'list' ? styles.list : styles.grid;
    return (
        <li className={`${styles.container} ${displayType}`} onClick={() => onVideoClick(video, channel, channelLogo)}>
            <div className={styles.img_wrap}>
                <img src={snippet.thumbnails.medium.url} alt="video thumbnail"/>
            </div>
            <div className={styles.metadata}>
                <img src={channelLogo} alt="channel logo"/>
                <div className={styles.txt}>
                    <p className={styles.title}>{snippet.title}</p>
                    <p className={styles.channel_title}>{snippet.channelTitle}</p>
                    <span className={styles.view_count}>조회수 {getViewCount()}회</span>
                    <span>{getPublishedTime()}</span>
                    <span></span>
                </div>
            </div>
        </li>
    );
}

export default VideoItem;