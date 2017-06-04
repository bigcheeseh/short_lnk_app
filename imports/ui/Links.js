import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LinksList from './LinksList.js';
import AddLinks from '../components/Component_AddLinks.js';
import PrivateHeader from '../components/Component_header.js';
import CheckboxValue from '../components/Component_checkbox.js';

export default class Links extends Component {
    redirect(){
       this.props.history.replace("/");
    }
    render(){
        if(Meteor.userId()){
          return (
              <div>
                <PrivateHeader header="Short Lnk"/>
                <div className="container">
                  <CheckboxValue />
                  <AddLinks />
                  <LinksList />
                  <Link to="/">Index Page</Link>
                </div>
              </div>
            )
        } else {
           {window.setTimeout(this.redirect.bind(this), 1000)}
           return (
                <div>
                  <h4>You must login or register</h4>
                </div>
              )
        }
    }
}
