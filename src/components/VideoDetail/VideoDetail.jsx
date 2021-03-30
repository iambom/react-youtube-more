import React from 'react';
import styles from './VideoDetail.module.css';

const VideoDetail = ({video, video : {snippet}, channelLogo}) => {

    const getViewCount = () => {
        const viewCount = video.statistics.viewCount;
        let answer = '';
        let unit = 10000;
        let index = 0;
        let division = Math.pow(unit, index);

        while(Math.floor(viewCount / division) > 0) {
            const modToString = viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            answer = `${modToString}`;
            division = Math.pow(unit, ++index);
        }
        return answer;
    }

    const getPublishedTime = () => {
        //현재시간
        let now = new Date(); 
        //게시 시간 
        let writeDay = new Date(snippet.publishedAt);
        // console.log(writeDay)
        let answer = '';
        let publishedTime = '';
        if(now.getFullYear() > writeDay.getFullYear()) {
            answer = now.getFullYear() - writeDay.getFullYear();
            publishedTime = `${answer}년 전`
        }else if(now.getMonth() > writeDay.getMonth()) {
            answer = now.getMonth() - writeDay.getMonth();
            publishedTime = `${answer}달 전`;
        }else if(now.getDate() > writeDay.getDate()) {
            answer = now.getDate() - writeDay.getDate();
            publishedTime = `${answer}일 전`;
        }else if(now.getDate() == writeDay.getDate()){
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
    
    return(
        <div className={styles.container}>
            <div className={styles.iframe_wrap}>
                <iframe src={`https://www.youtube.com/embed/${video.id}`} title="youtube video player" type="text/html" frameBorder="0" allowFullScreen></iframe>
            </div>
            <p className={styles.title}>{snippet.title}</p>
            <div className={styles.count_wrap}>
                <div className={styles.count_left}>
                    <span>조회수 {getViewCount()}회</span>
                    <span>{getPublishedTime()}</span>
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
}

export default VideoDetail;