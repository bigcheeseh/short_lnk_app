import { Mongo } from "meteor/mongo"
import { Meteor } from "meteor/meteor";
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Urls = new Mongo.Collection("links");

if(Meteor.isServer){
   Meteor.publish('links', function(){

      return Urls.find({userId: this.userId});
   });
}


Meteor.methods({
    'links.insert'(url){
        if(!this.userId){
            throw new Meteor.Error('not authorized');
        }


       new SimpleSchema({
        url:{
              type: String,
              label: 'Your Link',
              regEx: SimpleSchema.RegEx.Url
            }
        }).validate({url})


        Urls.insert({
          _id: shortid.generate(),
          url,
          userId: this.userId,
          visible: true,
          visitedCount: 0,
          visitedTime: null
        })

    },

    'links.visible'(_id, visible){
        if(!this.userId){
            throw new Meteor.Error('not authorized');
        }
        //console.log(_id, visible);

        new SimpleSchema({
          visible: {
             type: Boolean
          },

          _id: {
            type: String,
            min: 1
          }

        }).validate({ _id, visible })

        Urls.update(
          { _id,
            userId: this.userId
          }, { $set:{ visible } })
     },

     'visit.data'(_id){
       new SimpleSchema({
         _id: {
           type: String,
           min: 1
         }

       }).validate({ _id })

       Urls.update({ _id }, {
         $set: {
           visitedTime: new Date().getTime()
         },
         $inc: {
           visitedCount: 1
         }

      })
     }
})
