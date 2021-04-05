import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import VideoDetail from './components/VideoDetail/VideoDetail';
import VideoList from './components/VideoList/VideoList';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [comments, setComments] = useState([]);
  const [channelLogos, setChannelLogos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video, channel, channelLogo) => {
    youtube.getCommentList(video.id).then(comments => {
      let channelIdList = [];
      comments.forEach(element => {
        channelIdList.push(element.snippet.topLevelComment.snippet.authorChannelId.value);
      });
      youtube.getChannelList(channelIdList).then(channels => setChannelLogos(channels))
      setComments(comments);
    })
    setSelectedVideo({video, channel, channelLogo});
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    console.log("start")
    youtube.mostPopular().then(videos => {
      let channelIdList = [];
      videos.forEach(element => {
        channelIdList.push(element.snippet.channelId);
      });
      youtube.getChannelList(channelIdList).then(channels =>{
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
        let channelIdList = [];
        videos.forEach(element => {
          channelIdList.push(element.snippet.channelId);
        });
        youtube.getChannelList(channelIdList).then(channels =>{
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
              <VideoDetail video={selectedVideo.video} channelLogo={selectedVideo.channelLogo} channel={selectedVideo.channel}
              comments={comments} commentsChannelLogos={channelLogos}/>
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
