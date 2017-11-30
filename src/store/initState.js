import Immutable from 'immutable';

export const defaultInitState = {
    messages: Immutable.List(),
    mapData : Immutable.fromJS({
        teleStationData: [],
        damData : [],
        hBaseDamData : [],
        hBaseDamChartData : [],
        thaiBoundaryData: [],
        rainFall: [],
        dailyDam: [],
        clipMask: [],
        latestWaterLevel: [],
        mapLayer: [
            'WATERLEVEL'
        ],  
        mapType: 'MONITORING',
        time: new Date("Aug 2, 2017 07:00"),
        date: new Date("Aug 2, 2017"),
        gsMapMatch : [],
        sstMapMatch: [],
        sstMatchUrl : '',
        gsMapMatchUrl : '',
        rainfallForecast : [],
        baisins: []
    }),
    siteLayout: Immutable.fromJS({
        showRightNav : false,
        pushMainMenu: true
    }),
    chartData: Immutable.fromJS({
        rainfall24 : []
    }),
    auth: Immutable.fromJS({
        isLogged: window.localStorage.getItem('token') ? true : false
    }),
    systemAlerts : Immutable.fromJS({
        alerts : []
    })

};