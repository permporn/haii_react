import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import Immutable from 'immutable';
import MessagesReducer from './messages.reducer';
import MapReducer from './map.reducer';
import SiteLayoutReducer from './siteLayout.reducer';
import ChartsReducer from './charts.reducer';
import AuthReducer from './auth.reducer';
import AlertsReducer from './alerts.reducer';

export default combineReducers({
    messages : MessagesReducer,
    routing  : routeReducer,
    mapData : MapReducer,
    siteLayout: SiteLayoutReducer,
    chartData: ChartsReducer,
    auth: AuthReducer,
    systemAlerts: AlertsReducer
});