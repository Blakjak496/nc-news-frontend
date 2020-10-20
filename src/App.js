import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {Router} from '@reach/router';
import Articles from './components/Articles';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  

  return (
    <div className="App">
      <header className="App-header">
          <Navbar loggedIn={loggedIn} />
      </header>
      <div className="App-page">
        <Router>
          <Articles path="/" />
          {/* <Topics path="/topics" /> */}
          {/* <Article path="/articles/:article_id" /> */}
        </Router>
      </div>
      <div className="App-footer">
        <p className="App-footer--content">Lovingly created by Will :)</p>

      </div>
    </div>
  );
}

export default App;
