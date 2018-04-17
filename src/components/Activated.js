import React, { Component } from 'react';

class Activated extends Component {

  render() {
 let activeMessage = [];
    for(var x in this.props.messages){
      let activeMessageId = this.props.messages[x].roomId;
        if(this.props.activeRoom.key === activeMessageId){
          activeMessage.push(this.props.messages[x])
          console.log(activeMessage)
          continue;}

      for(var i = 0; i < activeMessage.length; i++){
        console.log(activeMessage)
        if(this.props.activeRoom.key === activeMessage[i].roomId){
        return (
          <div className="activated">
          <h2> {this.props.activeRoom.name} </h2>
          <table>
            <tbody>
            {
              activeMessage.map((content, index) =>
              <tr key={index}>
                <td> {activeMessage[index].userName} </td>
                <td> {activeMessage[index].content} </td>
                <td> {activeMessage[index].sentAt} </td>
              </tr>
            )
            }
            </tbody>
          </table>
          </div>
        )
      }
    }
    }
    return (
      <div className="activated">
      <h2> {this.props.activeRoom.name} </h2>
      <p> You have no messages </p>
      </div>
      );
    }
  }



    export default Activated;
