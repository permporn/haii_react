import Immutable from 'immutable';
import { GET_ALERT } from 'actions/alerts.action';
import { createReducer } from './utils';

export default createReducer({
    [GET_ALERT]: (state , { res } ) => {
         return state.set('alerts',Immutable.fromJS(res));
    }
});
