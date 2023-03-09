import axios from 'axios'

export const callApi = (call) => {
    let {
        endpoint,
        method = 'GET',
        params = null,
        data = null,
        headers = {},
        showJSON = false
    } = call

    let url = endpoint
    let defaultHeaders = {};

    // Merge headers info
    if ( method === 'POST' ) {
        defaultHeaders = {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        };
    } else {
        defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    const authToken = localStorage.getItem("bearerToken");

    if ( authToken != null ) {
        defaultHeaders = Object.assign(defaultHeaders, {'Authorization': `Bearer ${authToken}`});
    }

    headers = Object.assign({}, defaultHeaders, headers);

    console.debug('[CALL API URL]', url);
    console.debug('[CALL API COMPLETE]', { headers, method, url, params, data });

    if (showJSON)
        console.log('[CALL API JSON DATA]', JSON.stringify(data));

    let request = {
        headers,
        method,
        url
    };

    if (params) request.params = params;
    if (data) request.data = data;

    console.log('[REQUEST]', request)

    return axios(request);
}