import { Meteor } from "meteor/meteor"
import React, { Component } from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends Component {
   constructor(props){
      super(props)
      this.state = { copied: false }
   }

   componentDidMount(){
      this.clipboard = new Clipboard(this.refs.copy);

      this.clipboard.on('success', (e)=>{
        //console.log(e)
      }).on('error', (e)=>{
        console.log(e)
      })
   }

   componentWillUnmount(){
      this.clipboard.destroy();
   }
   changeButton(e){
      this.setState({copied: true});
      setTimeout(()=>{
          this.setState({copied: false});
      }, 500);
   }
   renderStats(){
     const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
     let visitedMessage = null
     if(typeof this.props.visitedTime === 'number'){
       visitedMessage = `(visited ${moment(this.props.visitedTime).fromNow()})`
     }
     return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
   }
   render() {
     return (
         <div className="links-item">

              <h3 key={ this.props._id }>{ this.props.url }</h3>
              <div className="links-item-secondary">
                  <p>{ this.props.shortUrl }</p>
                    <div>{ this.renderStats() }</div>
                    <div className="flex-buttons">
                      <input type="button"
                             ref="copy"
                             data-clipboard-text={ this.props.shortUrl }
                             value={ this.state.copied ? "copied" : "copy" }
                             onClick={ this.changeButton.bind(this)}
                             className="button button-pill flex-button-1"
                             >
                      </input>
                      <button className="button button-pill flex-button-2" onClick={() => Meteor.call('links.visible', this.props._id, !this.props.visible)}>
                          {this.props.visible ? 'Hide' : 'Unhide'}
                      </button>
                      <a className="button button-link flex-button-3" href={this.props.shortUrl} target="_blank">Visit</a>
                    </div>
               </div>
         </div>
      )
    }
}
