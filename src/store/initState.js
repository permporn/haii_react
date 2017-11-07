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
        mapLayer: 'BOUNDARY',
        time: new Date("Aug 2, 2017 07:00"),
        date: new Date("Aug 2, 2017"),
        gsMapMatch : [],
        sstMapMatch: []
    }),
    siteLayout: Immutable.fromJS({
        showRightNav : false,
        pushMainMenu: false
    })

};