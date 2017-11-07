import { errorType } from '../reducers/utils';
import { xml2json } from 'xml2json-light';
import { pushPath } from 'redux-simple-router';
import $ from 'jquery';

const baseUrl = 'http://27.254.159.141:8085/';
const baseUrlHBase = 'http://27.254.159.141:8047/';
const geoJsonBase = 'http://watersituation.thaiwater.net/v1/public/resources/json/';
const clipUrl = 'https://api.myjson.com/';

export default store => next => action => {

    let requestUrl;
    const params = {};

    if (action.isSpecial) {
        if (!action.isThaiBoundary)
            requestUrl = `${baseUrlHBase}`;
        else if (action.isMask)
            requestUrl = `${clipUrl}`;
        else
        requestUrl = `${geoJsonBase}`;
    }
    else
        requestUrl = `${baseUrl}`;
    if (action.isSpecial) {
        $.ajax({
            url: requestUrl + action.url,
            type: action.method,
            data: JSON.stringify(action.data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                action.res = data;
                return next(action);
            }
        });
    }


    if (action.url && !action.isSpecial) {
        return new Promise((resolve, reject) => {
            let data;
            const url = action.url;
            action.prevStore = store.getState();
            if (typeof action.data === 'object') {
                data = action.data;
            }
            params.method = action.method || 'GET';

            if (action.isAuth) {
                params.headers = {
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'dataType': 'json'
                };
            }
            if (data) {
                if (data instanceof FormData) {
                    params.body = data;
                } else {
                    params.body = JSON.stringify(data);
                }

            }
            fetch(requestUrl + url, params)
                .then(response => {
                    const
                        contentType = response.headers.get('content-type');

                    if (response.status === 401) {

                    }
                    if (response.status >= 400 && response.status < 600) {
                        const error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }

                    switch (true) {
                        case contentType === null:
                            return null;
                        case contentType.indexOf('application/json') >= 0:
                            return response.json();
                        case contentType.indexOf('application/xml') >= 0:
                            return response.text().then(xml2json);
                        default:
                            return null;
                    }
                })
                .then(res => {
                    const { options } = action;
                    if (res && (
                        (typeof res.errors !== 'undefined' && res.errors.length > 0) /*||
                         typeof res.data === 'undefined'*/)
                    ) {
                        return nextError(res, reject);
                    }

                    if (options && options.onSuccess) {
                        setTimeout(options.onSuccess, 0);
                    }

                    if (res && res.data && res.data.redirectUrl) {
                        store.dispatch(pushPath(res.data.redirectUrl));
                    }

                    action.res = res;

                    setTimeout(() => resolve(res), 0);
                    return next(action);
                })
                .catch(error => {
                    const errorString = error.toString();
                    return nextError({
                        errors: [{
                            code: errorString,
                            message: errorString
                        }]
                    }, reject);
                });
        });
    } else if (!action.isSpecial) {
        return next(action);
    }

    function nextError(response, reject) {
        const { options } = action;
        action.type = errorType(action.type);
        action.error = response;
        action.res = response;

        if (options && options.onError) {
            setTimeout(options.onError, 0);
        }

        reject(response);
        return next(action);
    }
};
