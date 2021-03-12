import { useEffect, useState } from 'react';
import './app.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import VideoList from './components/VideoList/VideoList';

function App({youtube}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("start")
    youtube.mostPopular().then(videos => setVideos(videos));
  }, []);
  
  return (
    <>
      <Header />
      <div id="wrap">
        <SideMenu />
        <VideoList videos={videos}/>
      </div>
    </>
  )
}

export default App;
