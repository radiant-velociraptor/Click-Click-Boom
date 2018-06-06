import React from 'react';
import ReactDOM from 'react-dom';
import FrontPage from './FrontPage.jsx';
//import {Provider} from 'react-redux'
//import {createStore, applyMiddleware, compose} from 'redux'
//import ChannelsService from './channelsApi.js';
//import reducerFunc from './reducers/reducer.js';

//let store = createStore(reducerFunc ,{}, applyMiddleware(ChannelsService));

ReactDOM.render(
  <FrontPage />,
  document.getElementById("root")
);

//store.dispatch({type: "CHANNEL_API"})
