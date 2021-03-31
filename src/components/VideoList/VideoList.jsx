import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = ({videos, channels, onVideoClick, display}) => {
    console.log(channels)
    const displayType = display === 'grid' ? styles.grid : styles.list;
    return (
        <ul className={`${displayType}`}>
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
                        <VideoItem key={video.id} video={video} channel={channel} channelLogo={channelLogo} channel={channel} onVideoClick={onVideoClick} display={display}/>
                    )
                })
            }
        </ul>
    )
}

export default VideoList;