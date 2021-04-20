import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Youtube from "./service/youtube";
import Main from './components/Main/Main';
import Header from "./components/Header/Header";
import SelectedVideo from "./components/SelectedVideo/SelectedVideo";
import SearchVideoList from "./components/SearchVideoList/SearchVideoList";

const key = process.env.REACT_APP_YOUTUBE_API_KEY;
const youtube = new Youtube(key);

const Router = () => {
  return(
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact render={()=> <Main youtube={youtube} />} />
        <Route path="/video/:videoId" render={()=> <SelectedVideo youtube={youtube} />} />
        <Route path="/search"  render={()=> <SearchVideoList youtube={youtube} />} />
      </Switch>
    </BrowserRouter>
  )
};

export default Router;