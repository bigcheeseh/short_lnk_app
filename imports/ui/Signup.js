import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
    constructor(props){
      super(props);
    }
    componentWillMount() {
      if(Meteor.userId()){
        this.props.history.replace("/links");
      }
      this.state = {error: ''};
    }

    createUser(e){
        e.preventDefault()

        console.log(e.target.email.value);
        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        console.log(email, password);

        Accounts.createUser({ email, password }, (err) => {
          console.log('user is created');
          if(err){
            console.log(err);
            this.setState({error: err.reason})
          }else{
            this.setState({error: ''})
            this.props.history.push("/links");
          }
        })


    }
    render(){
       return (
          <div className="box-view">
            <div className="box-view-component">
              <h1>Short lnk</h1>
              {this.state.error ? <p>{this.state.error}</p> : null}
              <form className="box-view-component-form" onSubmit={ this.createUser.bind(this) } noValidate>
                <input  type="email" ref="email" name="email" placeholder="email" />
                <input  type="password" ref="password" name="password" placeholder="password" />
                <button type="submit" className="button">Create Account</button>
                <Link to="/login">Have an account?</Link>
              </form>
             </div>
          </div>
       )
    }
}
