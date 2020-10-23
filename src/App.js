import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {Router} from '@reach/router';
import Articles from './components/Articles';
import Article from './components/Article';
import ErrorPage from './components/errors/ErrorPage'
import Topics from './components/Topics';
import formatDate from './components/utils/utils';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [activePage, setActivePage] = useState('Articles');
  const [title, setTitle] = useState('Enjoy our full collection of articles!');
  const [date, setDate] = useState('');

  const defaultUser = {username: 'tickle122'}
  
  const handleLogInOut = (event) => {
    setLoggedIn(!loggedIn);
  }

  useEffect(() => {
    if (loggedIn) setActiveUser(defaultUser.username)
    else setActiveUser(null);

    switch(activePage) {
      case 'Home':
        setTitle('');
        break;
      case 'Articles':
        setTitle('Enjoy our full collection of articles!');
        break;
      case 'Topics':
        setTitle('Find a topic');
        break;
      default:
        break;
    }

    const todaysDate = new Date();
    setDate(formatDate(todaysDate))

  },[loggedIn, defaultUser])

  return (
    <div className="App">
      <header className="App-header">
          <Navbar loggedIn={loggedIn} login={handleLogInOut} setPage={setActivePage} />
      </header>
      <div className="App-page">
        <div className="App-page--header">
          <h1 className="App-page--title">{title}</h1>
        </div>
        <Router>
          <Articles path="/" />
          <Topics path="/topics/*" />
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
