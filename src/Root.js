import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from "./Router";

const Root = () => {
  return(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default Root;