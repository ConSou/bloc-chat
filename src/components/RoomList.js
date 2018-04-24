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


delButton(name){
   const key = name.key;
   const roomsArr = this.state.rooms;
   this.props.setActive('');

   for(let i = 0; i < roomsArr.length; i++){
     if( key === roomsArr[i].key){
      this.roomsRef.child(key).remove();
      roomsArr.splice(i, 1)
      this.setState({ rooms: roomsArr })
     }
   }
}

handleDoubleClick(name, index): void{
  let rename = prompt("Enter New Chatroom Name");
  const newArr = this.state.rooms;

  this.roomsRef.child(name.key).set({name: rename});
  const newOb = {name: rename, key: name.key}

  newArr.splice([index], 1, newOb)
  this.props.setActive(newOb)
  this.setState({ rooms: newArr})
}

  render() {
    return (
      <div className="room-list">
        {
          this.state.rooms.map((name, index) =>
          <div className="room-bar" key={index}>
            <h1 className="room-names" key={index} onClick={() => this.handleRoomClick(name)} onDoubleClick={() => this.handleDoubleClick(name, index)}>{this.state.rooms[index].name}</h1>
            <span>
            <button className="delete-room-but" onClick={() => this.delButton(name)}>X</button>
            </span>
          </div>
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
