import React from 'react';
import VideoItem from '../VideoItem/VideoItem';

const VideoList = ({videos}) => (
    <ul>
        {
            videos.map(video => (
                <VideoItem video={video.snippet}/>
            ))
        }
    </ul>
)

export default VideoList;