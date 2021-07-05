import React, {useEffect, useState} from 'react';
import SideMenu from "../SideMenu/SideMenu";
import VideoList from "../VideoList/VideoList";
import {infiniteScroll} from "../../service/infiniteScroll";

const Main = ({ youtube }) => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');

  useEffect(() => {
    getMostPopular();
  }, [youtube]);

  const paging = () => {
    infiniteScroll(videoNextPageToken, getMostPopular);
  };
  useEffect(() => {
    window.addEventListener("scroll", paging);
    return () => {
      window.removeEventListener("scroll", paging);
    };
  }, [paging, videoNextPageToken, videos]);

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
      <SideMenu />
      <VideoList videos={videos} channels={channels} display={'list'}/>
    </>
  )
};

export default Main;