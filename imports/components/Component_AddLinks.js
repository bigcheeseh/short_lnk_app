import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";
import { Session } from 'meteor/session';

import { Urls } from '../api/links.js';
import Modal from 'react-modal'

class AddLinks extends Component{
  constructor(props){
    super(props)

    this.state = {
      modalOpen: false,
      error: '',
      url: ''
    }
  }
  handleForm(e){

    const { url } = this.state;

    e.preventDefault();


    Meteor.call('links.insert', url, (err, res) => {
      if(!err){
        this.closeRequest()
      }else{
        console.log(err, 'reason')
        this.setState({error: err.reason})
      }
    });

  }
  handleUrl(e){
    this.setState({url: e.target.value})
  }
  closeRequest(){
    this.setState({modalOpen: false, error: '', url: ''});
  }
  render(){
    return (
        <div>
          <button onClick={()=>this.setState({modalOpen: true})} className="button add-link"> + add link</button>
          <Modal
            isOpen={this.state.modalOpen}
            contentLabel="add link"
            onAfterOpen={() => this.refs.url.focus()}
            onRequestClose={this.closeRequest.bind(this)}
            className="box-view-component"
            overlayClassName="box-view box-view-modal"
            >
            <h1>Add Link</h1>
            <p>{this.state.error}</p>
            <form className="box-view-component-form" onSubmit={this.handleForm.bind(this)}>
                <input
                    type="text"
                    name="url"
                    placeholder="link"
                    value={this.state.url}
                    ref="url"
                    onChange={this.handleUrl.bind(this)}
                    />
                <button type="submit" className="button">Submit</button>
                <button type="button" className="button button-secondary"onClick={()=>this.closeRequest()}>Close</button>
            </form>
          </Modal>
        </div>
      )
  }
}


export default AddLinks
