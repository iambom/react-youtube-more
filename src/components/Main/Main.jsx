import React, {useCallback, useEffect, useState} from 'react';
import SideMenu from "../SideMenu/SideMenu";
import VideoList from "../VideoList/VideoList";
import {infiniteScroll} from "../../service/infiniteScroll";

const Main = ({ youtube }) => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');

  const getMostPopular = useCallback((videoNextPageToken) => {
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
  }, [youtube, channels, videos]);

  const paging = useCallback(() => {
    infiniteScroll(videoNextPageToken, getMostPopular);
  }, [getMostPopular, videoNextPageToken]);

  useEffect(() => {
    window.addEventListener("scroll", paging);
    return () => {
      window.removeEventListener("scroll", paging);
    };
  }, [paging, videoNextPageToken, videos]);

  useEffect(() => {
    getMostPopular();
    return () => {
      // Warning: Can't perform a React state update on an unmounted component... 에러 발생으로 cleanup 추가
      setVideos([]);
      setChannels([]);
      setVideoNextPageToken('');
    }
  }, [youtube]);

  return (
    <>
      <SideMenu />
      <VideoList videos={videos} channels={channels} display={'list'}/>
    </>
  )
};

export default Main;