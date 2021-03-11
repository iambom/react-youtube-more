import { useEffect, useState } from 'react';
import './app.css';
import Search from './components/Search/Search';
import VideoList from './components/VideoList/VideoList';

function App({}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=AIzaSyD_A-MIp774wIMuIm-fPIAPnZaJvG6aVx0", requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, [])
  return (
    <>
      <Search />
      <VideoList videos={videos}/>
    </>
  )
}

export default App;
