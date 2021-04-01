import React from 'react';
import styles from './VideoDetail.module.css';

const VideoDetail = ({video, video : {snippet}, channelLogo, channel}) => {
    console.log("채널 정보 ", video)
    const getViewCount = (count) => {
        const result = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return result;
    }

    const getPublishedTime = () => {
        let writeDay = new Date(snippet.publishedAt);
        let day = writeDay.getDate();
        let month = writeDay.getMonth();
        let year = writeDay.getFullYear();
        let publishedTime = `${year}. ${month}. ${day}.`

        return publishedTime;
    }

    const getSubscriberCount = (count) => {
        let result;
        
        if(count.length <= 4) {
            result = count / 1000 + "천";
            if(count.length === 0) {
                result = 0;
            }else if(0 < count.length <=3) {
                result = count;
            }
        }else if( 4 < count.length < 9) {
            result = count / 10000 + "만";
        }else if(count.length >= 9) {
            console.log("억")
        }
       return result;

    }
    const getDescription = () => {
        const description = snippet.description;
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return description.replace(urlRegex, (url) => {
            return `<a href=${url}>${url}</a>`
        })
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.iframe_wrap}>
                <iframe src={`https://www.youtube.com/embed/${video.id}`} title="youtube video player" type="text/html" frameBorder="0" allowFullScreen></iframe>
            </div>
            <p className={styles.title}>{snippet.title}</p>
            <div className={styles.count_wrap}>
                <div className={styles.count_left}>
                    <span>조회수 {getViewCount(video.statistics.viewCount)}회</span>
                    <span>{getPublishedTime()}</span>
                </div>
                <div className={styles.count_right}>
                    <button className={styles.btn_like}>{getSubscriberCount(video.statistics.likeCount)}</button>
                    <button className={styles.btn_dislike}>{getSubscriberCount(video.statistics.dislikeCount)}</button>
                    <button className={styles.btn_share}>share</button>
                    <button className={styles.btn_save}>save</button>
                </div>
            </div>

            <div className={styles.channel_container}>
                <div className={styles.channel_wrap}>
                    <a href="#" className='channelLogo'>
                        <img src={channelLogo} alt="channel logo"/>
                    </a>
                    <div className={styles.channel_info}>
                        <a href="" className={styles.channel_title}>
                            {snippet.channelTitle}
                        </a>
                        {
                            channel.statistics.hiddenSubscriberCount || (
                                <span>구독자 {getSubscriberCount(channel.statistics.subscriberCount)}명</span>
                            )
                        }
                    </div>
                    <button>구독</button>
                </div>
                
                <div className={styles.description}  dangerouslySetInnerHTML={ {__html:getDescription()}}></div>
            </div>

            <div className={styles.comment_wrap}>
                <p>댓글 {getViewCount(video.statistics.commentCount)}개</p>
            </div>
        </div>
    )
}

export default VideoDetail;