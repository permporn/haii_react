import { pushPath } from 'redux-simple-router';


export default store => next => action => {

    // Init action of redux-simple-router library
    if (action.type === '@@router/INIT_PATH') {
       
    }
    return next(action);
};
