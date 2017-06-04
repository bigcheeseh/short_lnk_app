import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';


class CheckboxValue extends Component {
      constructor(props){
         super(props)

         this.state = { checked: true}
      }
      componentDidMount(){
        Session.set('showVisible', true)
        this.changeState = Tracker.autorun(()=>{
          const checked = Session.get('showVisible')

          console.log(checked);
          this.setState({checked})
        })
      }

      componentWillUnmount(){
        this.changeState.stop()
      }
      render(){
        return (
          <div className="check-box">
            <label>
              <input type="checkbox"
                     onChange={(e) => Session.set('showVisible', !e.target.checked)}
                     checked={!this.state.checked}/>
              Show hiden links
            </label>
          </div>
        )
      }
}

export default  CheckboxValue
