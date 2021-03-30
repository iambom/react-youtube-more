import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = ({videos, channelLogos, onVideoClick, display}) => {
    // console.log(videos)
    const displayType = display === 'grid' ? styles.grid : styles.list;
    return (
        <ul className={`${displayType}`}>
            {
                videos.map(video => {
                    let channelLogo = "";
                    channelLogos.forEach(element => {
                        if(element.id === video.snippet.channelId) {
                            channelLogo = element.snippet.thumbnails.default.url
                        }
                    });
                    return (
                        <VideoItem key={video.id} video={video} channelLogo={channelLogo} onVideoClick={onVideoClick} display={display}/>
                     )
                })
            }
        </ul>
    )
}

export default VideoList;