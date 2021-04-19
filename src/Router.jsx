import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './components/Main/Main';
import Search from "./components/Search/Search";
import Youtube from "./service/youtube";
import VideoDetail from "./components/VideoDetail/VideoDetail";
import Header from "./components/Header/Header";

const key = process.env.REACT_APP_YOUTUBE_API_KEY;
const youtube = new Youtube(key);

const Router = () => {

  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={()=> <Main youtube={youtube} />} />
        <Route path="/video/:videoId" render={()=> <VideoDetail youtube={youtube} />} />
        <Route path="/search" component={Search}>
          <Search />
        </Route>
      </Switch>
    </BrowserRouter>
  )
};

export default Router;