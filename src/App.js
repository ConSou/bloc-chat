import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import './App.css';
src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        Bloc Chat
        <RoomList />
      </div>
    );
  }
}

export default App;
