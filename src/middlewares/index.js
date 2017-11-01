import {applyMiddleware} from 'redux';

/**
 * All this imports is middlewares.
 * What is this and how it's works you can find here:
 *  http://redux.js.org/docs/advanced/Middleware.html
 *  https://medium.com/@meagle/understanding-87566abcfb7a#.z3tiuhkvz
 
 * init - initialize middlewares
 * beforeSend - few middlewares that executes before api calls
 * server - middleware for api calls
 * afterSend - few middlewares that executes after api calls
* */
import init from './init';
import beforeSend from './before-send/index';
import server from './server';
import afterSend from './after-send/index';

/**
 * Redux Thunk middleware allows you to write action creators that return a function instead of an action.
 * The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 * The inner function receives the store methods dispatch and getState as parameters.
 *
 * More info: https://github.com/gaearon/redux-thunk
 * */
import thunk from 'redux-thunk';

export default applyMiddleware(
    thunk,
    init,
    ...beforeSend,
    server,
    ...afterSend
);