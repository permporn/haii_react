
export const GET_TELESTATION_DATA = 'GET_TELESTATION_DATA';
export const GET_DAM_DATA = 'GET_DAM_DATA';
export const GET_HBASE_DATA = 'GET_HBASE_DATA';
export const GET_THAI_BOUNDARY = 'GET_THAI_BOUNDARY';
export const GET_RAINFALL = 'GET_RAINFALL';
export const GET_DAILY_DAM_BY_TYPE = 'GET_DAILY_DAM_BY_TYPE';
export const GET_CLIP_MASK = 'GET_CLIP_MASK';

export function getTeleStationData() {
    let url = 'haii/telestations';
    return {
        type: GET_TELESTATION_DATA,
        url,
        method: 'GET'
    };
}
export function getDailyDamByType(type) {
    let url = `haii/dam/daily/?dam_type=${type}`;
    return {
        type: GET_DAILY_DAM_BY_TYPE,
        url,
        method: 'GET'
    };
}
export function getRainfall(date,time) {
    let url = `haii/rainfall?date=${date}T${time}`;
    return {
        type: GET_RAINFALL,
        url,
        method: 'GET'
    };
}

export function getDamData() {
     let url = 'haii/dam';
    return {
        type: GET_DAM_DATA,
        url,
        method: 'GET'
    };
}

export function getHbaseData(data,type) {
     let url = 'query.json';
    return {
        type: GET_HBASE_DATA,
        url,
        method: 'POST',
        data,
        payload: {
           type
        },
        isSpecial : true
    };
}
export function getThaiBoundary() {
     let url = 'boundary/thailand77.json';
    return {
        type: GET_THAI_BOUNDARY,
        url,
        method: 'GET',
        isThaiBoundary : true,
        isSpecial : true
    };
}
export function getClipMask() {
    return {
        type: GET_CLIP_MASK,
        url : 'bins/mp03b',
        method: 'GET',
        isMask : true,
        isThaiBoundary : true,
        isSpecial : true
    };
}

