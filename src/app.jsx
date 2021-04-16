import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import VideoDetail from './components/VideoDetail/VideoDetail';
import VideoList from './components/VideoList/VideoList';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');
  const [comments, setComments] = useState([]);
  const [channelLogos, setChannelLogos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [isSearched, setIsSearched] = useState(false);
  const [query, setQuery] = useState('');
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [searchNextPageToken, setSearchNextPageToken] = useState('');
  

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
        newChannelList = [...newChannelList, ...newChannels]
        setChannels(newChannelList);
      });
      setVideos(newVideoList);
    });
  }

  const infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      if(typeof videoNextPageToken === "undefined") return;
      getMostPopular(videoNextPageToken);
      
      if(isSearched) {
        console.log("검색 완");
        search(query, searchNextPageToken);
      }

    }
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [videoNextPageToken, videos, channels, searchedVideos, searchedChannels, searchNextPageToken]);

  

  const search = (value, searchNextPageToken) => {
    setSelectedVideo(null);

    if(query !== value) {
      console.log("새로운 검색", value)
      setSearchedVideos([]);
      console.log("초기화 ", searchedVideos)
      setQuery(value);
    }

    // setQuery(value);
    youtube.search(value, searchNextPageToken).then(result => {
      // console.log("검색 결과 ", result)
      setSearchNextPageToken(result.nextPageToken);
      let videos = result.items;
      let newVideoIdList = [];
      videos.forEach(element => {
        newVideoIdList.push(element.id.videoId);
      });
      
      youtube.getVideoList(newVideoIdList).then(videos => {
        let newVideos = videos;
        let newVideoList = searchedVideos.concat();
        console.log("concat 후 ", newVideoList)
        newVideoList = [...newVideoList, ...newVideos];

        console.log("최종 ",newVideoList)
        setSearchedVideos(newVideoList);

        let channelIdList = [];
        videos.forEach(element => {
          channelIdList.push(element.snippet.channelId);
        });

        youtube.getChannelList(channelIdList).then(channels =>{
          let newChannelList = searchedChannels.concat();
          newChannelList = [...newChannelList, ...channels]
          setSearchedChannels(newChannelList)
        });
        // setSearchedVideos(newVideoList);
      });
    });
    setIsSearched(true);
    // if(!isSearched) window.scrollTo(0, 0);
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
        <VideoList videos={!isSearched ? videos : searchedVideos} channels={!isSearched ? channels : searchedChannels} onVideoClick={selectVideo} display={selectedVideo ? 'grid' : 'list'}/>
      </div>
    </>
  )
}

export default App;
