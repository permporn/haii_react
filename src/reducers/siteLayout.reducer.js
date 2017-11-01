import Immutable from 'immutable';
import { TOGGLE_RIGHT_NAV ,PUSH_MAIN_MENU } from 'actions/siteLayout.action';

import { createReducer , newStateWithResponse } from './utils';

export default createReducer({
    [TOGGLE_RIGHT_NAV]: (state) => {
         return state.set('showRightNav', !state.get('showRightNav'));
    },
    [PUSH_MAIN_MENU]: (state) => {
         return state.set('pushMainMenu', !state.get('pushMainMenu'));
    }
});