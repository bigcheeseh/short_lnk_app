import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import { WebApp } from 'meteor/webapp';

import '../imports/api/accounts.js'
import { Urls } from '../imports/api/links.js'

WebApp.connectHandlers.use((req, res, next)=>{
    const _id = req.url.slice(1);
    const link = Urls.findOne({ _id });


    if(link){

      res.statusCode = 302;
      res.setHeader('location', link.url);

      res.end();

      console.log(_id, 'id')
      Meteor.call('visit.data', _id);
    }else{
      next()
    }
})

Meteor.startup(() => {
  // code to run on server at startup
});
