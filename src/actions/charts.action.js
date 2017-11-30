export const GET_CHART24_RAINFALL = 'GET_CHART24_RAINFALL';
export const GET_CHART_WATERLEVEL = 'GET_CHART_WATERLEVEL';

export function getChart24Rainfall() {
    return {
        type : GET_CHART24_RAINFALL,
        url: '/haii/chart/rainfall24?date=2017-11-08T17:00'
    }
}
export function getChartWaterLevel() {
    return {
        type : GET_CHART_WATERLEVEL,
        url: '/haii/json/chart/water_level?station_id=telehaii0001'
    }
}