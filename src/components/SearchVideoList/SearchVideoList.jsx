import React, {useEffect, useState, useCallback} from 'react';
import VideoList from "../VideoList/VideoList";
import { useLocation } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import { infiniteScroll } from "../../common/infiniteScroll";

const SearchVideoList = ({youtube}) => {
  const { search } = useLocation();

  const [preQuery, setPreQuery] = useState('');
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [searchNextPageToken, setSearchNextPageToken] = useState('');

  const onSearch = useCallback((query, searchNextPageToken) => {
    youtube.search(query, searchNextPageToken).then(result => {
      setPreQuery(query);
      setSearchNextPageToken(result.nextPageToken);
      let videos = result.items;
      let newVideoIdList = [];
      videos.forEach(element => {
        newVideoIdList.push(element.id.videoId);
      });

      youtube.getVideoList(newVideoIdList).then(videos => {
        let channelIdList = [];
        let newVideoList = [];
        if(preQuery === query) newVideoList = searchedVideos.concat();
        if(preQuery !== query) window.scrollTo(0, 0);

        videos.forEach(element => {
          channelIdList.push(element.snippet.channelId);
        });

        newVideoList = [...newVideoList, ...videos];
        setSearchedVideos(newVideoList);

        youtube.getChannelList(channelIdList).then(channels =>{
          let newChannelList = preQuery !== query ? [] : searchedChannels.concat();
          newChannelList = [...newChannelList, ...channels];
          setSearchedChannels(newChannelList);
        });
      });
    });
  }, [preQuery ,searchedVideos,searchedChannels, youtube ]);

  const paging = useCallback(() => {
    infiniteScroll(searchNextPageToken, onSearch, preQuery);
  }, [onSearch, searchNextPageToken, preQuery]);

  useEffect(() => {
    window.addEventListener("scroll", paging);
    return () => {
      window.removeEventListener("scroll", paging);
    };
  }, [paging, searchNextPageToken, preQuery, searchedVideos]);

  useEffect(() => {
    const query = search.split("=")[1];
    onSearch(query);
    return () => {
      setSearchedVideos([])
    }
  }, [search]);

  return(
    <>
      <SideMenu />
      <VideoList videos={searchedVideos} channels={searchedChannels} display={'list'}/>
    </>
  )
};

export default SearchVideoList;