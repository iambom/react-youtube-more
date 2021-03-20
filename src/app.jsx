import { cloneElement, useEffect, useState } from 'react';
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
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    console.log("start")
    youtube.mostPopular().then(videos => setVideos(videos));
  }, [youtube]);

  const search = (query) => {
    setSelectedVideo(null);
    youtube.search(query).then(videos => {
      console.log("search video ", videos)
      let videoArray = [];
      videos.forEach(element => {
        // console.log(element.id.kind);
        if (element.id.kind === "youtube#video") {
          videoArray.push(element.id.videoId);
        } 
      });
      youtube.getVideoList(videoArray).then(videos => {
        console.log("서치된 비디오",videos);
        setVideos(videos);
      });
      // console.log(videoArray)
      // setVideos(videos);
    
    });
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
        <SideMenu display={selectedVideo ? 'none' : 'block'}/>
        <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'grid' : 'list'}/>
      </div>
    </>
  )
}

export default App;
