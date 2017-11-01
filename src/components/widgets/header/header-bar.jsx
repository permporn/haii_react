import './header-bar.scss';
import React, { Component, PropTypes } from 'react';

class HeaderBar extends Component {
    // render method of Class
    render() {

        return (<div className="header-bar">
            {/* Logo */}
            <a  className="logo">
                {/* mini logo for sidebar mini 50x50 pixels */}
                <span >
                <i onClick={this.props.pushMenu}  className="material-icons mainicon">view_headline</i>
                </span>
                {/* logo for regular state and mobile devices */}
            </a>
            {/* Header Navbar: style can be found in header.less */}
        </div>);
    }
}


export default HeaderBar;
