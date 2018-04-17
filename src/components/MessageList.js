import React, { Component } from 'react';
import Activated from './Activated'

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
  });
}



  render() {
    return (
      <div className="message-list">
        <Activated
        messages={this.state.messages}
        activeRoom={this.props.activeRoom}/>
      </div>
    );
  }
}

export default MessageList;
