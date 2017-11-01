import Immutable from 'immutable';

import { createReducer } from './utils';

export default createReducer({
    ['*']: (state, { res, silent }) => {
        return state;
    }
});
