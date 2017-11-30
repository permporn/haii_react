import './auth.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from 'actions/auth.action';

class Authorization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            showLoginForm: false
        }
    }

    userNameChange = (e) => {
        this.state.userName = e.target.value;

    }
    onPasswordChanged = (e) => {
        this.state.password = e.target.value;
    }
    login = () => {
        const { userName, password } = this.state;
        this.props.login({ username: userName, password });
    }
    showLoginForm = () => {
        this.setState({
            showLoginForm: true
        })
    }
    // render method of Class
    render() {
        const { showLoginForm } = this.state;
        return (
            <div>
                <div className="login">
                    {showLoginForm == false ?
                        <div onClick={this.showLoginForm} className="login-lock"><span className="ti-lock"></span></div> : null}
                    <h1>HAII</h1>
                    <div className="ca-logo"></div>
                    {showLoginForm == true ?
                        <div>  <input className="form-control transparent-bg" type="text" onChange={this.userNameChange} placeholder="Username" required="required" />
                            <input className="form-control transparent-bg" type="password" onChange={this.onPasswordChanged} placeholder="Password" required="required" />
                            <button onClick={this.login} className="submit-icon">
                                <i className="ti-angle-right"></i>
                            </button> </div> : null}

                </div>

                <div className="copy-right">All rights reserved CA 2014 - 2017 </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    };
}

Authorization = connect(store => ({

}), mapDispatchToProps)(Authorization);
export default Authorization;
