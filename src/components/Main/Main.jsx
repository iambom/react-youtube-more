import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import styles from "../../app.module.css";
import VideoDetail from "../VideoDetail/VideoDetail";
import SideMenu from "../SideMenu/SideMenu";
import VideoList from "../VideoList/VideoList";

const Main = ({ youtube }) => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    getMostPopular();
  }, [youtube]);

  const getMostPopular = (videoNextPageToken) => {
    youtube.mostPopular(videoNextPageToken).then(result => {
      setVideoNextPageToken(result.nextPageToken);
      let newVideos = result.items;
      let newChannelIdList = [];
      newVideos.forEach(element => {
        newChannelIdList.push(element.snippet.channelId);
      });

      let newVideoList = videos.concat();
      newVideoList = [...newVideoList, ...newVideos];

      youtube.getChannelList(newChannelIdList).then(newChannels =>{
        let newChannelList = channels.concat();
        newChannelList = [...newChannelList, ...newChannels];
        setChannels(newChannelList);
      });
      setVideos(newVideoList);
    });
  };

  return (
    <>
      <div id="wrap">
        <SideMenu display={selectedVideo ? 'none' : 'block'}/>
        <VideoList videos={videos} channels={channels} display={'list'}/>
      </div>
    </>
  )
};

export default Main;