import React, {useEffect, useState} from 'react';
import VideoDetail from "../VideoDetail/VideoDetail";
import VideoList from "../VideoList/VideoList";
import {useParams} from "react-router-dom";
import styles from './SelectedVideo.module.css';

const SelectedVideo = ({youtube}) => {

  const { videoId } = useParams();
  console.log("video detail : ", videoId, youtube);

  const [selectedVideo, setSelectedVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [videoList, setVideoList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');

  useEffect(() => {
    getSelectedVideo();
    getVideoList();
  }, [videoId, youtube]);

  const getSelectedVideo = () => {
    let data = '';
    youtube.getVideoList(videoId).then(video => {
      data = video[0];
      setSelectedVideo(data);
      setIsLoading(true);
    });
    window.scrollTo(0, 0);
  };

  const getVideoList = (videoNextPageToken) => {
    youtube.mostPopular(videoNextPageToken).then(result => {
      setVideoNextPageToken(result.nextPageToken);
      let newVideos = result.items;
      let newChannelIdList = [];
      newVideos.forEach(element => {
        newChannelIdList.push(element.snippet.channelId);
      });
      setVideoList([]);
      console.log(videoList);
      let newVideoList = videoList.concat();
      console.log(newVideoList)
      newVideoList = [...newVideoList, ...newVideos];

      youtube.getChannelList(newChannelIdList).then(newChannels =>{
        let newChannelList = channels.concat();
        newChannelList = [...newChannelList, ...newChannels];
        setChannels(newChannelList);
      });
      setVideoList(newVideoList);
      console.log("비디오리스트 ",videoList);
    });
  };

  return(
    isLoading &&
    <div className={styles.container}>
      <VideoDetail video={selectedVideo}/>
      <VideoList display={'grid'} videos={videoList} channels={channels}/>
    </div>
  )
};

export default SelectedVideo;