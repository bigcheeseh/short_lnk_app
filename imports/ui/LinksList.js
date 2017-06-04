import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from "meteor/meteor";
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Urls } from '../api/links.js'
import LinksListItem from './LinksListItem.js'

export default class LinksList extends Component {
    constructor(props){
        super(props)
        this.state = {
          links: []
        }
    }
    componentDidMount(){
      this.linksTracker = Tracker.autorun(()=>{
        const links = Urls.find({
          visible: Session.get('showVisible')
        }).fetch()
        Meteor.subscribe('links');

        this.setState({ links })
      })
    }
    componentWillUnmount(){
      console.log('component unount');
      this.linksTracker.stop();
    }
    renderLinks(){
        return this.state.links.map((link)=>{
               const shortUrl = Meteor.absoluteUrl(link._id);
               console.log(shortUrl);
               return (
                 <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
                 //<p key={link._id}>{ link.url }</p>
               )
      })
    }
    render() {
        if(this.state.links.length > 0){
           //console.log('render', this.state.links)

           return (
             <div>
                <div>
                  <FlipMove maintainContainerHeight={true}>
                    {this.renderLinks()}
                  </FlipMove>
                </div>
             </div>
           )
        }else {
          return (
                  <div className="links-item">No Links Found</div>
                )
        }
    }

}
