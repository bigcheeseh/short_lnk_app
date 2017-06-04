import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from '../ui/Signup.js';
import StartPage from '../ui/Link.js';
import Login from '../ui/Login.js';
import Links from '../ui/Links.js';
//import linksList from '../ui/LinksList.js';

export const routes = (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login"  component={Login}  />
          <Route path="/links"  component={Links}/>
          <Route path="/"  component={StartPage}/>
        </Switch>
      </div>
    </BrowserRouter>
);
