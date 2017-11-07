import Immutable from 'immutable';
import { GET_TELESTATION_DATA, GET_DAM_DATA, GET_HBASE_DATA, GET_THAI_BOUNDARY, 
    GET_RAINFALL, GET_DAILY_DAM_BY_TYPE, GET_CLIP_MASK , UPDATE_MAP_LAYER , 
    UPDATE_DATE , UPDATE_TIME , GET_LATEST_WATER_LEVEL , GET_GSMAP_MATCH , GET_SST_MATCH } from 'actions/map.action';

import { createReducer, newStateWithResponse } from './utils';

export default createReducer({
    [GET_TELESTATION_DATA]: (state, { res }) => {
        return state.set('teleStationData', res);
    },
    [GET_DAM_DATA]: (state, { res }) => {
        return state.set('damData', res);
    },
    [GET_GSMAP_MATCH]: (state, { res }) => {
            return state.set('gsMapMatch',res);
    },
    [GET_SST_MATCH]: (state, { res }) => {
        return state.set('sstMapMatch', res);
    },   
    [GET_HBASE_DATA]: (state, { res, payload: { type } }) => {
        if (type == 'MAP')
            return state.set('hBaseDamData', Immutable.fromJS(res));
        else
            return state.set('hBaseDamChartData', Immutable.fromJS(res));
    },
    [GET_THAI_BOUNDARY]: (state, { res }) => {
        return state.set('thaiBoundaryData', res);
    },
    [GET_RAINFALL]: (state, { res }) => {
        return state.set('rainFall', res);
    },
    [GET_DAILY_DAM_BY_TYPE]: (state, { res }) => {
        return state.set('dailyDam', res);
    },
    [GET_LATEST_WATER_LEVEL]: (state, { res }) => {
        return state.set('latestWaterLevel', res);
    },
    [UPDATE_MAP_LAYER] : (state, { payload: { layer } }) => {
        return state.set('mapLayer', layer);
    },
    [UPDATE_DATE] : (state, { payload: { date } }) => {
        return state.set('date', date);
    },
    [UPDATE_TIME] : (state, { payload: { time } }) => {
        return state.set('time', time);
    },
    [GET_CLIP_MASK]: (state, { res }) => {
        for (var i = 0; i < res.length; i++) {
            var tmp = res[i][0];
            res[i][0] = res[i][1];
            res[i][1] = tmp;
        }
        return state.set('clipMask', res);
    }

});