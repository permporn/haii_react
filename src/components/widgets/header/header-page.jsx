import './header-bar.scss';
import React, { Component, PropTypes } from 'react';

class Navbar extends Component {
    // render method of Class
    render() {

        return (<nav class="navbar navbar-static-top">
            <i onClick={this.props.pushMenu}  className="material-icons mainicon">view_headline</i>
      </nav>);
    }
}


export default Navbar;
