import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import styles from "../../app.module.css";
import VideoDetail from "../VideoDetail/VideoDetail";
import SideMenu from "../SideMenu/SideMenu";
import VideoList from "../VideoList/VideoList";

const Main = ({ youtube }) => {
  // console.log(youtube)
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');
  const [comments, setComments] = useState([]);
  const [channelLogos, setChannelLogos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [isSearched, setIsSearched] = useState(false);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [searchedChannels, setSearchedChannels] = useState([]);

  const selectVideo = (video, channel, channelLogo) => {
    youtube.getCommentList(video.id).then(comments => {
      let channelIdList = [];
      comments.forEach(element => {
        channelIdList.push(element.snippet.topLevelComment.snippet.authorChannelId.value);
      });
      youtube.getChannelList(channelIdList).then(channels => setChannelLogos(channels));
      setComments(comments);
    });
    setSelectedVideo({video, channel, channelLogo});
    window.scrollTo(0, 0);
  };


  useEffect(() => {
    console.log("start");
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

  const search = () => {
    console.log('search')
  };
  return (
    <>
      <Header onSearch={search}/>
      <div id="wrap">
        {
          selectedVideo &&  (
              <VideoDetail youtube={youtube}/>
          )
        }
        <SideMenu display={selectedVideo ? 'none' : 'block'}/>
        <VideoList videos={!isSearched ? videos : searchedVideos} channels={!isSearched ? channels : searchedChannels} onVideoClick={selectVideo} display={selectedVideo ? 'grid' : 'list'}/>
      </div>
    </>
  )
};

export default Main;