import React, {useEffect, useState} from 'react';
import VideoList from "../VideoList/VideoList";
import { useLocation } from "react-router-dom";

const SearchVideoList = ({youtube}) => {
  const { search } = useLocation();

  const [preQuery, setPreQuery] = useState('');
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [searchNextPageToken, setSearchNextPageToken] = useState('');

  useEffect(() => {
    let query = search.split("=");
    query = query[1];
    onSearch(query);
  }, [search]);

  const onSearch = (query, searchNextPageToken) => {
    youtube.search(query, searchNextPageToken).then(result => {
      let videos = result.items;
      let newVideoIdList = [];
      videos.forEach(element => {
        newVideoIdList.push(element.id.videoId);
      });

      youtube.getVideoList(newVideoIdList).then(videos => {
        let channelIdList = [];
        let newVideos = videos;
        let newVideoList = preQuery !== query ? [] : searchedVideos.concat();
        if(preQuery !== query) window.scrollTo(0, 0);

        videos.forEach(element => {
          channelIdList.push(element.snippet.channelId);
        });

        newVideoList = [...newVideoList, ...newVideos];
        setSearchedVideos(newVideoList);

        youtube.getChannelList(channelIdList).then(channels =>{
          let newChannelList = preQuery !== query ? [] : searchedChannels.concat();
          newChannelList = [...newChannelList, ...channels];
          setSearchedChannels(newChannelList)
        });
      });
      setSearchNextPageToken(result.nextPageToken);
    });
    setPreQuery(query);
  };

  return(
    <VideoList videos={searchedVideos} channels={searchedChannels} display={'list'}/>
  )
};

export default SearchVideoList;