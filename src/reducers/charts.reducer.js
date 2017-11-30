import Immutable from 'immutable';
import { GET_CHART24_RAINFALL , GET_CHART_WATERLEVEL } from 'actions/charts.action';
import { createReducer } from './utils';

export default createReducer({
    [GET_CHART24_RAINFALL]: (state , { res } ) => {
         return state.set('rainfall24',Immutable.fromJS(res));
    },
    [GET_CHART_WATERLEVEL]: (state , { res } ) => {
         return state.set('waterlevel',Immutable.fromJS(res));
    }
});
