import React from 'react';

const VideoItem = ({video}) => {
    return (
        <li>
            <p>{video.title}</p>
        </li>
    );
}

export default VideoItem;