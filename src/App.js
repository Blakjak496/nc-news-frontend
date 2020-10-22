import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {Router} from '@reach/router';
import Articles from './components/Articles';
import Article from './components/Article';
import ErrorPage from './components/errors/ErrorPage'
import Topics from './components/Topics';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const defaultUser = {username: 'tickle122'}
  
  const handleLogInOut = (event) => {
    setLoggedIn(!loggedIn);
  }

  useEffect(() => {
    if (loggedIn) setActiveUser(defaultUser.username)
    else setActiveUser(null);
  },[loggedIn])

  return (
    <div className="App">
      <header className="App-header">
          <Navbar loggedIn={loggedIn} login={handleLogInOut} />
      </header>
      <div className="App-page">
        <Router>
          <Articles path="/" />
          <Topics path="/topics" />
          <Articles path="/topics/:topic"  />
          <Article path="/articles/:article_id" user={activeUser} />
          <ErrorPage default code={404} />
        </Router>
      </div>
      <div className="App-footer">
        <p className="App-footer--content">Lovingly created by Will :)</p>

      </div>
    </div>
  );
}

export default App;
