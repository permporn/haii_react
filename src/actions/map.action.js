export const GET_TELESTATION_DATA = 'GET_TELESTATION_DATA';
export const GET_DAM_DATA = 'GET_DAM_DATA';
export const GET_HBASE_DATA = 'GET_HBASE_DATA';
export const GET_THAI_BOUNDARY = 'GET_THAI_BOUNDARY';
export const GET_RAINFALL = 'GET_RAINFALL';
export const GET_DAILY_DAM_BY_TYPE = 'GET_DAILY_DAM_BY_TYPE';
export const GET_CLIP_MASK = 'GET_CLIP_MASK';
export const UPDATE_MAP_LAYER = 'UPDATE_MAP_LAYER';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const GET_LATEST_WATER_LEVEL = 'GET_LATEST_WATER_LEVEL';
export const GET_SST_MATCH = 'GET_SST_MATCH';
export const GET_GSMAP_MATCH = 'GET_GSMAP_MATCH';
export const GET_COMBINED_MATCH = 'GET_COMBINED_MATCH';
export const UPDATE_SST_MATCHURL = 'UPDATE_SST_MATCHURL';
export const UPDATE_GSMAP_MATCHURL = 'UPDATE_GSMAP_MATCHURL';
export const GET_RAINFALL_FORECAST = 'GET_RAINFALL_FORECAST';
export const GET_BAISINS = 'GET_BAISINS';
export const UPDATE_MAP_TYPE = 'UPDATE_MAP_TYPE';

export function getTeleStationData() {
    let url = 'haii/telestations';
    return {
        type: GET_TELESTATION_DATA,
        url,
        method: 'GET'
    };
}
export function getGsMapMatch(date) {
    let url = `haii/gsmap/similarity/${date}?accuracy=15`
    return {
        type: GET_GSMAP_MATCH,
        url,
        method: 'GET'
    };
}
export function getSSTMatch(date) {
    let url = `haii/sst/similarity/${date}?accuracy=80`
    return {
        type: GET_SST_MATCH,
        url,
        method: 'GET'
    };
}
export function getRainfallForecast(date) {
    let url = `haii/json/rainfall_forecast_spatial/?date=${date}`
    return {
        type: GET_RAINFALL_FORECAST,
        url,
        method: 'GET'
    };
}
export function updateDate(date) {
    return {
        type: UPDATE_DATE ,
        payload : {
            date
        }
    };
}
export function updateTime(time) {
    return {
        type: UPDATE_TIME ,
        payload : {
            time
        }
    };
}
export function updateMapLayer(layer,isChecked) {
    return {
        type: UPDATE_MAP_LAYER ,
        payload : {
            layer,
            isChecked
        }
    };
}
export function updateSSTMatchUrl(url) {
    return {
        type: UPDATE_SST_MATCHURL ,
        payload : {
            url
        }
    };
}
export function updateGsMapMatchUrl(url) {
    return {
        type: UPDATE_GSMAP_MATCHURL ,
        payload : {
            url
        }
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
export function getRainfall(dateTime) {
    let url = `haii/geojson/rainfall24?date=2017-11-08T17:00`;
    return {
        type: GET_RAINFALL,
        url,
        method: 'GET'
    };
}
export function getLatestWaterLevel() {
    let url = `haii/geojson/water_level/`;
    return {
        type: GET_LATEST_WATER_LEVEL,
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
export function getBaisins() {
    return {
        type: GET_BAISINS,
        url : 'haii/basins'
    };
}
export function updateMapType(mapType) {
    return {
        type: UPDATE_MAP_TYPE,
        payload : {
            mapType
        }
    };
}