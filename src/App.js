import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import './App.css';

var config = {
   apiKey: "AIzaSyAkWKKpFeIHEUHXnh7J5AUk2y6Kd6htyDs",
   authDomain: "bloc-chat-f24c0.firebaseapp.com",
   databaseURL: "https://bloc-chat-f24c0.firebaseio.com",
   projectId: "bloc-chat-f24c0",
   storageBucket: "bloc-chat-f24c0.appspot.com",
   messagingSenderId: "730929209826"
 };
 firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className='holder'>
        <h1 className="bloc-chat">Bloc Chat</h1>
        <RoomList firebase={firebase} />
      </div>
      </div>
    );
  }
}

export default App;
