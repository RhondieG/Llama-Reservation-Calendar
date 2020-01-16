function apiGetPosts(successCallback, errorCallback) {

    axios.get(api_url + 'api/posts', {})
      .then(successCallback)
      .catch(errorCallback);
}

function apiInsertReservation(data, successCallback, errorCallback) {

    axios.post(api_url + 'api/reservation', data )
      .then(successCallback)
      .catch(errorCallback);
}

function apiGetAllLlama(data, successCallback, errorCallback) {

  axios.get(api_url + 'api/reservation/llama/all', {} )
    .then(successCallback)
    .catch(errorCallback);
}

function apiGetSingleLlama(data, successCallback, errorCallback) {

  axios.get(api_url + 'api/reservation/llama/single', data )
    .then(successCallback)
    .catch(errorCallback);
}

function apiRegister(data, successCallback, errorCallback) {

    axios.post(api_url + 'api/register', data )
      .then(successCallback)
      .catch(errorCallback);
}

function apiLogin(data, successCallback, errorCallback) {

    axios.post(api_url + 'api/login', data )
    .then(successCallback)
    .catch(errorCallback);
}
