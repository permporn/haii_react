import Immutable from 'immutable';
import { LOGIN  } from 'actions/auth.action';
import { createReducer } from './utils';

export default createReducer({
    [LOGIN]: (state , { res } ) => {
         return state;
    }
});
