import React, {useEffect, useState} from 'react';
import VideoList from "../VideoList/VideoList";
import { useLocation } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import { infiniteScroll } from "../../service/infiniteScroll";

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
    // setPreQuery(query);
  }, [search]);

  useEffect(() => {
    window.addEventListener("scroll", paging);
    return () => {
      window.removeEventListener("scroll", paging);
    };
  }, [searchNextPageToken, preQuery, searchedVideos]);

  const paging = () => {
    infiniteScroll(searchNextPageToken, onSearch, preQuery);
  };

  const onSearch = (query, searchNextPageToken) => {
    youtube.search(query, searchNextPageToken).then(result => {
      setPreQuery(query);
      setSearchNextPageToken(result.nextPageToken);
      let videos = result.items;
      let newVideoIdList = [];
      videos.forEach(element => {
        newVideoIdList.push(element.id.videoId);
      });

      youtube.getVideoList(newVideoIdList).then(videos => {
        console.log(videos);
        let channelIdList = [];
        let newVideos = videos;
        let newVideoList = [];
        if(preQuery === query) {
          console.log("newVideoList ", newVideoList);
          console.log("searchedVideos ", searchedVideos);
          newVideoList = searchedVideos.concat()
        };
        if(preQuery !== query) window.scrollTo(0, 0);

        videos.forEach(element => {
          channelIdList.push(element.snippet.channelId);
        });

        console.log("before ", newVideoList)
        newVideoList = [...newVideoList, ...newVideos];
        console.log("after ",newVideoList)
        setSearchedVideos(newVideoList);

        youtube.getChannelList(channelIdList).then(channels =>{
          let newChannelList = preQuery !== query ? [] : searchedChannels.concat();
          newChannelList = [...newChannelList, ...channels];
          setSearchedChannels(newChannelList)
        });
      });
    });
  };



  return(
    <>
      <SideMenu />
      <VideoList videos={searchedVideos} channels={searchedChannels} display={'list'}/>
    </>
  )
};

export default SearchVideoList;