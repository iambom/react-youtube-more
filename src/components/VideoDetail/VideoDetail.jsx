import React from 'react';

const VideoDetail = ({video, video : {snippet}}) => (
    <div>
        <iframe src={`https://www.youtube.com/embed/${video.id}`} title="youtube video player" type="text/html" frameBorder="0" allowFullScreen></iframe>
        <h3>{snippet.title}</h3>
        <div>
            <div>
                <span>조회수</span>
                <span>{snippet.publishedAt}</span>
            </div>
            <div>
                <button>like</button>
                <button>no like</button>
                <button>share</button>
                <button>save</button>
            </div>
        </div>
        <div className='channel_wrap'>
            <a href="#" className='channelLogo'>
                <img src="" alt="channel logo"/>
            </a>
        </div>
    </div>
)

export default VideoDetail;