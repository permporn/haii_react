import { pushPath } from 'redux-simple-router';
import { LOGIN } from 'actions/auth.action';

export default store => next => action => {
    //let authState = store.getState().auth;
    switch (action.type) {
        case LOGIN:
            window.localStorage.setItem('token', action.res.token);
            window.localStorage.setItem('loginTime',new Date());
            store.dispatch(pushPath('/'));
            break;
    }
    return next(action);
};
