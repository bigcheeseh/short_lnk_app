import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
      return (
        <div className="header">
          <div className="header-items">
            <h1 className="header-title">{props.header}</h1>
            <a className="header-anchor" href="/" onClick={() => Accounts.logout()}>Logout</a>
          </div>
        </div>
      )
}

const logout = ()=>{
   Accounts.logout();
}

PrivateHeader.propTypes = {
   header: PropTypes.string.isRequired
}

export default PrivateHeader;
