import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import VideoDetail from './components/VideoDetail/VideoDetail';
import VideoList from './components/VideoList/VideoList';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video, channel, channelLogo) => {
    setSelectedVideo({video, channel, channelLogo});
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    console.log("start")
    youtube.mostPopular().then(videos => {
      let chennelIdList = [];
      videos.forEach(element => {
        chennelIdList.push(element.snippet.channelId);
      });
      youtube.getChannelList(chennelIdList).then(channels =>{
        // console.log("채널 정보",channels)
        setChannels(channels)
      });
      setVideos(videos);
    });
  }, [youtube]);

  const search = (query) => {
    setSelectedVideo(null);
    youtube.search(query).then(videos => {
      let videoIdArray = [];
      videos.forEach(element => {
        if (element.id.kind === "youtube#video") {
          videoIdArray.push(element.id.videoId);
        } 
      });
      youtube.getVideoList(videoIdArray).then(videos => {
        let chennelIdList = [];
        videos.forEach(element => {
          chennelIdList.push(element.snippet.channelId);
        });
        youtube.getChannelList(chennelIdList).then(channels =>{
          // console.log("채널 정보",channels)
          setChannels(channels)
        });
        setVideos(videos);
      });
    });
    
    window.scrollTo(0, 0)
}
  return (
    <>
      <Header onSearch={search}/>
      <div id="wrap">
        {
          selectedVideo &&  (
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo.video} channelLogo={selectedVideo.channelLogo} channel={selectedVideo.channel}/>
            </div>
            )
        }
        <SideMenu display={selectedVideo ? 'none' : 'block'}/>
        <VideoList videos={videos} channels={channels} onVideoClick={selectVideo} display={selectedVideo ? 'grid' : 'list'}/>
      </div>
    </>
  )
}

export default App;
