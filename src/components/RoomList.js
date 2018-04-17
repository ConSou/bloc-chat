import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
  });
}

handleSubmit(e) {
    e.preventDefault();
    this.createRoom();
  }

  handleChange(e){
    this.setState({newRoomName: e.target.value})
  }

createRoom(){
  if(!this.state.newRoomName) {return};
  const nameNew = this.state.newRoomName;
  this.roomsRef.push({
    name: nameNew
  });
  this.setState({newRoomName: ''})
}

handleRoomClick(name){
  this.props.setActive(name)
}

  render() {
    return (
      <div className="room-list">
        {
          this.state.rooms.map((name, index) =>
            <h1 className="room-names" key={index} onClick={() => this.handleRoomClick(name)}>{this.state.rooms[index].name}</h1>
          )
        }
        <form className="newRoomForm">
          <input type="text" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)} placeholder="New Room Name"/>
          <input type="submit" value="Create Room" onClick={(e) => this.handleSubmit(e)} />
        </form>

      </div>
    );
  }
}

export default RoomList;
