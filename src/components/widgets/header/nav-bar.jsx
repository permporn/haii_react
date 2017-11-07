import './nav-bar.scss';
import React, { Component, PropTypes } from 'react';

class Navbar extends Component {
    // render method of Class
    render() {
        return (<div className="navbar">
            <i onClick={this.props.pushMenu}  className="material-icons mainicon">ViewMenu</i>
      </div>);
    }
}


export default Navbar;
