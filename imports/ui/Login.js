import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Link } from 'react-router-dom';
export default class Login extends Component {
    constructor(props){
      super(props);
    }

    componentWillMount(){
      if(Meteor.userId()){
         this.props.history.replace("/links");
      }
      this.state = {error: ''};
    }

    loginUser(e){
       e.preventDefault();

       const email = this.refs.email.value.trim();
       const password = this.refs.password.value.trim();

       Meteor.loginWithPassword({ email }, password, (err) => {
         console.log('user is created');
         if(err){
           console.log(err);
           this.setState({error: err.reason})
         }else{
           this.setState({error: ''})
           this.props.history.push("/links");
         }
       });

    }
    render(){
       return (
          <div className="box-view">
            <div className="box-view-component">
              <h1>Short lnk</h1>
              {this.state.error ? <p>{this.state.error}</p> : null}
              <form onSubmit={ this.loginUser.bind(this) } noValidate className="box-view-component-form">
                <input type="email" ref="email" name="email" placeholder="email"/>
                <input type="password" ref="password" name="password" placeholder="password"/>
                <button type="submit" className="button">Login</button>
                <Link to="/signup">Don't have an account?</Link>
              </form>
            </div>
          </div>
       )
    }
}
