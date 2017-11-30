import './main.scss';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames/bind';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

class Main extends Component {
    constructor(...args) {
        super(...args);
    }

    getChildContext() {
        return {
            history: this.props.history
        };
    }

    render() {
        return (
             <MuiThemeProvider muiTheme={getMuiTheme()}>
               {this.props.children}
             </MuiThemeProvider >
        )
    }
}

Main.childContextTypes = {
    history: PropTypes.object,
    muiTheme: PropTypes.object
};

Main.PropTypes = {
    routing: PropTypes.object
};

export default Main;
