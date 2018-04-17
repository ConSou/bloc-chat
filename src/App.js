import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/user';
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
  constructor(props){
    super(props);

    this.state = {
      activeRoom: '',
      currentUser: ''
    }
  }

  setActive(name){
    const activeName = name;
    this.setState({activeRoom: activeName})
  }

  setUser(user){
    if(user === null){
      this.setState({currentUser: 'Guest'})
    }else{
    let userName = user.displayName;
    this.setState({currentUser: userName})
    }
  }

  render() {
    return (
      <div className="App">
      <div className='holder'>
        <h1 className="bloc-chat">Bloc Chat</h1>
        <User firebase={firebase}
        setUser={(user) => this.setUser(user)}
        currentUser={this.state.currentUser}/>
        <RoomList
        firebase={firebase}
        setActive={ (name) => this.setActive(name) }/>
      </div>
      <MessageList firebase={firebase}
      activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
