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

  render() {

    let filtMes = this.props.messages.filter(val => val.roomId === this.props.activeRoom.key)

  return (
    <div className="activated">
      <h2> {this.props.activeRoom.name} </h2>
      <div className="view-mes">{filtMes.map((val, index) =>
          <table key={index}>
            <tbody>
              <tr onDoubleClick={() => this.props.handleDoubleClick(val, index)}>
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
