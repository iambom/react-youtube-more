import React, { useEffect, useState } from 'react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = ({videos, channels, display}) => {
    const displayType = display === 'grid' ? styles.grid : styles.list;

    const [videoList, setVideoList] = useState(videos);
    useEffect(() => {
      setVideoList(videos);
    }, [videos]);

    useEffect(() => {
      if(display === 'grid') {
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
                        let channelLogo;
                        channels.forEach(element => {
                            if(element.id === video.snippet.channelId) {
                                channelLogo = element.snippet.thumbnails.default.url;
                            }
                        });
                        return (
                            <VideoItem key={`${video.id}${index}`} video={video} channelLogo={channelLogo} display={display}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default VideoList;