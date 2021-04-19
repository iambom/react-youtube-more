import React, { useEffect, useState } from 'react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = ({videos, channels, onVideoClick, display}) => {
    const displayType = display === 'grid' ? styles.grid : styles.list;

    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
      setVideoList(videos);
    }, [videos]);

    useEffect(() => {
      if(display === 'grid') {
        console.log("grid");

        // let newList = videoList.concat();
        const newList = videoList.splice(0, 24);
        console.log("splice", newList);
        setVideoList(newList);
      }
    },[display]);

    return (
        <div className={`${styles.container} ${displayType}`}>
            <ul>
                {
                  videoList.map((video, index) => {
                        let channelLogo, channel;
                        channels.forEach(element => {
                            if(element.id === video.snippet.channelId) {
                                channel = element;
                                channelLogo = element.snippet.thumbnails.default.url;
                            }
                        });
                        return (
                            <VideoItem key={`${video.id}${index}`} video={video} channel={channel} channelLogo={channelLogo} onVideoClick={onVideoClick} display={display}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default VideoList;