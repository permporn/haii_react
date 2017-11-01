/**
 * Polyfill is code that implements a feature on web browsers that do not support the feature.
 *
 * Promise - object is used for asynchronous computations.
 * A Promise represents a value which may be available now, or in the future, or never.
 * More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/
require('es6-promise').polyfill();

/**
 * Polyfill for Intl
 *
 * The Intl object is the namespace for the ECMAScript Internationalization API,
 * which provides language sensitive string comparison,
 * number formatting, and date and time formatting.
 *
 * More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
*/

/**
 * Polyfill for fetch
 *
 * The Fetch API provides an interface for fetching resources (including across the network).
 * It will seem familiar to anyone who has used XMLHttpRequest,
 * but the new API provides a more powerful and flexible feature set.
 *
 * More info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * */
import 'whatwg-fetch';

import React from 'react';
import ReactDom from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router';
import configureStore from './store/configureStore';
import { defaultInitState } from './store/initState';
import Root from './containers/Root';

const store = configureStore(defaultInitState);
const history = createHistory({
    queryKey: false
});



/**
 * Creates an enhanced history from the provided history.
 * This history changes history.listen to pass all location updates through the provided store first.
 * This ensures if the store is updated either from a navigation event or from a time travel action,
 * such as a replay, the listeners of the enhanced history will stay in sync.
 * */
syncReduxAndRouter(history, store);
ReactDom.render(
    <Root store={store} history={history} />,
    document.getElementById('app')
);
