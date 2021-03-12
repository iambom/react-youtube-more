import { useEffect, useState } from 'react';
import './app.css';
import Search from './components/Search/Search';
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
      <Search />
      <div id="wrap">
        <SideMenu />
        <VideoList videos={videos}/>
      </div>
    </>
  )
}

export default App;
