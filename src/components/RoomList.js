import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: []
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

  render() {
    return (
      <div className="room-list">
      {
        this.state.rooms.map((name, index) =>
          <h1 className="room-names" key={index}>{this.state.rooms[index].name}</h1>
        )
      }
      </div>
    );
  }
}

export default RoomList;
