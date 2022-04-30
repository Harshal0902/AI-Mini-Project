import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home"
import HomeHi from "./components/Home/HomeHi"
import Image from "./components/LeafDisease/LeafDisease"
import ImageResult from "./components/LeafDisease/Imageresult"
import Chatbot from "./components/Chatbot/Chatbot"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar />
    <Chatbot />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/leafDisease' exact component={Image} />
      <Route path='/result' exact component={ImageResult} />
      <Route path='/hi' exact component={HomeHi} />
      <Redirect to="/" />
    </Switch>
  </Router>
  );
}

export default App;
