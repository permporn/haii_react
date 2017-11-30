import React, { Component, PropTypes } from 'react';


function diff_minutes(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    
    }

class Authorization extends Component {
    componentDidMount() {
        this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps);
    }

    // the authentication user check
    checkAuth(props) {
        const TOKEN_EXPIARY_MINUTES = 59; //in minutes
        if (window.localStorage.getItem('token') == null) {
            props.history.pushState(null, '/signin');
        }
        else {
            const loginTime = window.localStorage.getItem('loginTime');
            const loginDuration = diff_minutes(new Date(), new Date(loginTime));
            //if (loginDuration >= TOKEN_EXPIARY_MINUTES) {
                //props.history.pushState(null, '/signin');
            //}
        }
    }
    render() {
        return window.localStorage.getItem('token') == null ? null : this.props.children;
    }
}
export default Authorization;
