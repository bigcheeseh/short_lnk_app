import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class StartPage extends Component {
    logout(){
      Accounts.logout((err)=>console.log(err));

    }
    render(){
       window.browserHistory = this.props.history;
       return (
          <div>
            <Link to="/signup">Sign Up</Link>
            <br/>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/links">Add Link</Link>
            <br/>
            <Link to="/linksList">Show Links</Link>
            <br/>
            <button onClick={this.logout}>Logout</button>
          </div>
       )
    }
}
