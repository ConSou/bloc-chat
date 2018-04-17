import React, { Component } from 'react';

class Activated extends Component {

  render() {

    let filtMes = this.props.messages.filter(val => val.roomId === this.props.activeRoom.key)

  return (
    <div className="activated">
      <h2> {this.props.activeRoom.name} </h2>
      <div>{filtMes.map((val, index) =>
          <table key={index}>
            <tbody>
              <tr>
                <td> {val.userName} </td>
                <td> {val.content} </td>
                <td> {val.sentAt} </td>
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
