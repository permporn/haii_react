import React from 'react';
import { Provider } from 'react-redux';
import HAIIApp from './HAIIApp';

export default class Root extends React.Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <HAIIApp history={history} />
            </Provider>
        );
    }
}