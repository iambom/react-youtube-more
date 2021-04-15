import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = ({videos, channels, onVideoClick, display}) => {
    // console.log("VideoList : ",videos)
    const displayType = display === 'grid' ? styles.grid : styles.list;
    return (
        <div className={`${styles.container} ${displayType}`}>
            <ul>
                {
                    videos.map(video => {
                        let channelLogo, channel;
                        channels.forEach(element => {
                            if(element.id === video.snippet.channelId) {
                                channel = element;
                                channelLogo = element.snippet.thumbnails.default.url;
                            }
                        });
                        return (
                            <VideoItem key={video.id} video={video} channel={channel} channelLogo={channelLogo} onVideoClick={onVideoClick} display={display}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default VideoList;