export const GET_ALERT = 'GET_ALERT';

export function getAlerts() {
    return {
        type : GET_ALERT,
        url: 'haii/json/alert_area/?date=2017-08-27'
    }
}