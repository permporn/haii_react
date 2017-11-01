import './right-navigation-menu.scss';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import RightNavigationMenu from './right-navigation-menu';
import RightMinNavigation from './right-min-navigation';

class RightNavigation extends Component {
    // render method of Class
    render() {
        return (
            <div>
                <RightNavigationMenu toggleRightNav={this.props.toggleRightNav} siteLayout={this.props.siteLayout} />
                <RightMinNavigation toggleRightNav={this.props.toggleRightNav} siteLayout={this.props.siteLayout} />
            </div>
        );
    }
}
RightNavigation.contextTypes = {
    history: PropTypes.object
};

export default RightNavigation;
