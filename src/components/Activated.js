import React, { Component } from 'react';

class Activated extends Component {

  delMessage(val){
     const key = val.key
     const messageArr = this.props.messages

     for(let i = 0; i < messageArr.length; i++){
      if(key === messageArr[i].key){
        this.props.messagesRef.child(key).remove()
        messageArr.splice(i, 1)
        this.setState({ messages: messageArr })
        }
       }
     }

     handleDoubleClick(val, index): void {
       var rename = prompt("Edit Message");
       const newMesArr = this.props.messages;
       if(rename === null){return};

       this.props.messagesRef.child(val.key).update({content: rename});
       const newOb = {content: rename, roomId: val.roomId, sentAt: val.sentAt, userName: val.userName}

       newMesArr.splice([index], 1, newOb)
       console.log(newMesArr)

       this.setState({messages: newMesArr})
     }


  render() {

    let filtMes = this.props.messages.filter(val => val.roomId === this.props.activeRoom.key)

  return (
    <div className="activated">
      <h2> {this.props.activeRoom.name} </h2>
      <div className="view-mes">{filtMes.map((val, index) =>
          <table key={index}>
            <tbody>
              <tr onDoubleClick={() => this.handleDoubleClick(val, index)}>
                <td> {val.userName} </td>
                <td> {val.content} </td>
                <td> {val.sentAt}</td>
                <td><button onClick={() => this.delMessage(val)}> X </button></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
);

    }
  }



    export default Activated;
