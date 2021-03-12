import React from 'react';
import VideoItem from '../VideoItem/VideoItem';

const VideoList = ({videos}) => (
    <ul>
        {
            videos.map(video => (
                <VideoItem video={video}/>
            ))
        }
    </ul>
)

export default VideoList;