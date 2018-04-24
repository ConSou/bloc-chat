import React, { Component } from 'react';
import Activated from './Activated'

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      newMessageCont: ''
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
  });
}

handleChange(e){
  this.setState({newMessageCont: e.target.value});
}

handleSubmit(e){
  e.preventDefault();
  this.sendMessage();
}

timeFormat(x){

  let dateForm = Date(x);

  let newDateForm = new Date(dateForm);
  let milHour = newDateForm.getHours();
  let milMin = (newDateForm.getMinutes() <10 ? '0' : '') + newDateForm.getMinutes();

  return milHour > 12 ? ((milHour - 12) + ':' + milMin + 'pm') : (milHour + ':' + milMin + 'am') ;
}

sendMessage(){
  if(!this.state.newMessageCont) {return};
  if(this.props.activeRoom === '') {return};
  const newMessage = this.state.newMessageCont;
  this.messagesRef.push({
    content: newMessage,
    roomId: this.props.activeRoom.key,
    sentAt: this.timeFormat(this.props.firebase.database.ServerValue.TIMESTAMP),
    userName: this.props.currentUser + ':'
  });
  this.setState({ newMessageCont: '' });
}

  render() {
    return (
      <div className="message-list">
      <h1> {this.props.activeRoom === '' ? "Select or create room to begin chat!" : ""} </h1>
        <Activated
        messages={this.state.messages}
        messagesRef={this.messagesRef}
        activeRoom={this.props.activeRoom}/>
        <div className="NewMessage">
          <form id="new-mes">
            <textarea id="new-mes" placeholder="Write your message here..." value={this.state.newMessageCont}onChange={(e) => this.handleChange(e)}></textarea>
            <input className="send-but" type="submit" value="Send" onClick={(e) => this.handleSubmit(e)} />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
