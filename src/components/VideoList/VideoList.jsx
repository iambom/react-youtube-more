import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = ({videos, channelLogos, onVideoClick, display}) => {
    const displayType = display === 'grid' ? styles.grid : styles.list;
    return (
        <ul className={`${displayType}`}>
            {
                videos.map(video => (
                    <VideoItem video={video} channelLogos={channelLogos} key={video.id} onVideoClick={onVideoClick} display={display}/>
                ))
            }
        </ul>
    )
}

export default VideoList;