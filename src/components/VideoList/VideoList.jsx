import React from 'react';
import VideoItem from '../VideoItem/VideoItem';

const VideoList = ({videos, onVideoClick}) => (
    <ul>
        {
            videos.map(video => (
                <VideoItem video={video} key={video.id} onVideoClick={onVideoClick}/>
            ))
        }
    </ul>
)

export default VideoList;