import React, { Component } from 'react';

class User extends Component {

handleSignInClick(e){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider )
}

handleSignOutClick(e){
  if(this.props.currentUser === 'Guest'){return}
  this.props.firebase.auth().signOut();
  alert('You have been signed-out')
}

componentDidMount(){
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
});
}

  render() {
    return (
      <div className="user">
      <div className="user">{this.props.currentUser}</div>
        <button className='sign-in' onClick={(e) => this.handleSignInClick(e)}> Sign in </button>
        <button className='sign-out' onClick={(e) => this.handleSignOutClick(e)}>Sign out</button>
      </div>
    );
  }
}

export default User;
