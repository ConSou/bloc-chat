import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: []
    }
  }
  render() {
    return (
      <div className="room-list">
        RoomList
      </div>
    );
  }
}

export default RoomList;
