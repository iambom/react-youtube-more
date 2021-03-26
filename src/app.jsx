import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import VideoDetail from './components/VideoDetail/VideoDetail';
import VideoList from './components/VideoList/VideoList';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [channelLogos, setChannelLogos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
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
        setChannelLogos(channels)
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
        setVideos(videos);
      });
    });
}
  return (
    <>
      <Header onSearch={search}/>
      <div id="wrap">
        {
          selectedVideo &&  (
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo}/>
            </div>
          )
        }
        <SideMenu display={selectedVideo ? 'none' : 'block'}/>
        <VideoList videos={videos} channelLogos={channelLogos} onVideoClick={selectVideo} display={selectedVideo ? 'grid' : 'list'}/>
      </div>
    </>
  )
}

export default App;
