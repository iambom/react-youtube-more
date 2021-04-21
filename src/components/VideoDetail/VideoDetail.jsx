import React from 'react';
import Comments from '../Comments/Comments';
import styles from './VideoDetail.module.css';

const VideoDetail = ({video, channel, comments, commentsChannelLogos}) => {
    console.log("VideoDetail ",channel);
    const getViewCount = (count) => {
        const result = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return result;
    };

    const getPublishedTime = () => {
        let writeDay = new Date(video.snippet.publishedAt);
        let day = writeDay.getDate();
        let month = (writeDay.getMonth()+1);
        let year = writeDay.getFullYear();
        let publishedTime = `${year}. ${month}. ${day}.`;

        return publishedTime;
    };

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

    };

    const getLikeCount = (count) => {
        let result;

        if(count.length <= 4) {
            if(count.length === 0) {
                result = 0;
            }else if(0 < count.length <=3) {
                result = count;
            }
            result = parseFloat(count / 1000).toFixed(1) + "천";
        }else if( 4 < count.length < 9) {
            result = parseFloat(count / 10000).toFixed(0) + "만";
        }else if(count.length >= 9) {
            console.log("억")
        }
       return result;

    };

    const getDescription = () => {
        const description = video.snippet.description;
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return description.replace(urlRegex, (url) => {
            return `<a href=${url}>${url}</a>`
        })
    };
    
    return(
        <div className={styles.container}>
            <div className={styles.iframe_wrap}>
                <iframe src={`https://www.youtube.com/embed/${video.id}`} title="youtube video player" type="text/html" frameBorder="0" allowFullScreen></iframe>
            </div>
            <p className={styles.title}>{video.snippet.title}</p>
            <div className={styles.count_wrap}>
                <div className={styles.count_left}>
                    <span>조회수 {getViewCount(video.statistics.viewCount)}회</span>
                    <span>{getPublishedTime()}</span>
                </div>
                <div className={styles.count_right}>
                    <button className={styles.btn_like}><i className="fas fa-thumbs-up"></i><span>{getLikeCount(video.statistics.likeCount)}</span></button>
                    <button className={styles.btn_dislike}><i className="fas fa-thumbs-down"></i><span>{getLikeCount(video.statistics.dislikeCount)}</span></button>
                    <button className={styles.btn_share}><i className="fas fa-share"></i><span>공유</span></button>
                    <button className={styles.btn_save}><i className="far fa-plus-square"></i><span>저장</span></button>
                </div>
            </div>

            <div className={styles.channel_container}>
                <div className={styles.channel_wrap}>
                    <a href="#" className='channelLogo'>
                        <img src={channel.snippet.thumbnails.default.url} alt="channel logo"/>
                    </a>
                    <div className={styles.channel_info}>
                        <a href="" className={styles.channel_title}>
                            {video.snippet.channelTitle}
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
                <Comments comments={comments} commentsChannelLogos={commentsChannelLogos}/>
            </div>
        </div>
    )
};

export default VideoDetail;