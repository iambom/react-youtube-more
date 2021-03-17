import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import VideoDetail from './components/VideoDetail/VideoDetail';
import VideoList from './components/VideoList/VideoList';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  }

  useEffect(() => {
    console.log("start")
    youtube.mostPopular().then(videos => setVideos(videos));
  }, [youtube]);

  const search = (query) => {
    setSelectedVideo(null);
    youtube.search(query).then(videos => setVideos(videos));
  };
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
        <SideMenu />
        <VideoList videos={videos} onVideoClick={selectVideo}/>
      </div>
    </>
  )
}

export default App;
