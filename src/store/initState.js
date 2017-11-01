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
        clipMask: []
    }),
    siteLayout: Immutable.fromJS({
        showRightNav : false,
        pushMainMenu: false
    })

};