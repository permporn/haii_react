import React, { Component } from 'react';
import { Provider } from 'react-redux';
import HAIIApp from './HAIIApp';
import DevTools from './DevTools';

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <div className="dev-mode">
                    <HAIIApp history={history} />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}