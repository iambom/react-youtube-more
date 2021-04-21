import React, {useEffect, useState} from 'react';
import VideoDetail from "../VideoDetail/VideoDetail";
import VideoList from "../VideoList/VideoList";
import {useParams} from "react-router-dom";
import styles from './SelectedVideo.module.css';

const SelectedVideo = ({youtube}) => {

  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [preVideoId, setPreVideoId] = useState('');
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [selectedVideoChannel, setSelectedVideoChannel] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsChannelLogos, setCommentsChannelLogos] = useState([]);

  const [videoList, setVideoList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videoNextPageToken, setVideoNextPageToken] = useState('');

  useEffect(() => {
    getSelectedVideo();
  }, [videoId]);

  const getSelectedVideo = () => {
    let data = '';
    let channelId = '';
    let channelData = '';
    youtube.getVideoList(videoId).then(video => {
      data = video[0];
      channelId = data.snippet.channelId;
      setSelectedVideo(data);
      youtube.getChannelList(channelId).then(channel => {
        channelData = channel[0];
        setSelectedVideoChannel(channelData);
      });
      youtube.getCommentList(videoId).then(comments => {
        let channelIdList = [];
        comments.forEach(element => {
          channelIdList.push(element.snippet.topLevelComment.snippet.authorChannelId.value);
        });
        youtube.getChannelList(channelIdList).then(channels => setCommentsChannelLogos(channels));
        setComments(comments);
      });
      setPreVideoId(videoId);
      getVideoList();
      window.scrollTo(0, 0);
    });
  };


  const getVideoList = (videoNextPageToken) => {
    youtube.mostPopular(videoNextPageToken).then(result => {
      setVideoNextPageToken(result.nextPageToken);
      let newVideos = result.items;
      let newChannelIdList = [];
      newVideos.forEach(element => {
        newChannelIdList.push(element.snippet.channelId);
      });
      let newVideoList = preVideoId !== videoId ? [] : videoList.concat();
      newVideoList = [...newVideoList, ...newVideos];

      youtube.getChannelList(newChannelIdList).then(newChannels =>{
        let newChannelList = channels.concat();
        newChannelList = [...newChannelList, ...newChannels];
        setChannels(newChannelList);
        setIsLoading(true);
      });
      setVideoList(newVideoList);
    });
  };

  return(
    isLoading &&
    <div className={styles.container}>
      <VideoDetail video={selectedVideo} channel={selectedVideoChannel} comments={comments} commentsChannelLogos={commentsChannelLogos}/>
      <VideoList display={'grid'} videos={videoList} channels={channels}/>
    </div>
  )
};

export default SelectedVideo;