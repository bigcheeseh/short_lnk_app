import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes } from '../imports/routes/';
import { Urls } from '../imports/api/links.js';
import '../imports/startup/errorThrowing.js';

Tracker.autorun(()=>{
   const isAuthendicated = !!Meteor.userId();
   if(window.browserHistory){
     const pathName = window.browserHistory.location.pathname;
     console.log(`Logout pathName: ${pathName}`);
   }

   //const links = Urls.find({}).fetch()
   //
   //console.log(links)
});

Meteor.startup(() => {
    ReactDom.render(routes, document.getElementById('app'));
})
