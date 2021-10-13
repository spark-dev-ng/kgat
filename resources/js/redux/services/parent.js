import { URLS } from '../constants'
import { parentHeader } from '../../helpers';

export const parentService = {
  login,
  logout,
  getAuth,
  getAll,
  getChild,
  getSessionsFrom
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(URLS.AUTH_PARENT, requestOptions)
    .then(handleResponse)
    .then(res => {
      // login successful if there's a jwt token in the response
      //console.log({fre_service_res:res.success});
      if (res.success) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log({service_res:res.success});
        localStorage.setItem('user', JSON.stringify(res.success));
      }

      return res.success.parent;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('parent');
}

function getAll() {
  const requestOptions = {
    method: 'POST',
    headers: parentHeader()
  };

  return fetch(`${URLS.ROOT_PARENT}/students`, requestOptions).then(handleResponse);
}

function getAuth() {
  const requestOptions = {
    method: 'POST',
    headers: parentHeader(),
  };

  return fetch(`${URLS.ROOT_PARENT}/parent`, requestOptions).then(handleResponse);
}

function getChild(id) {
  const requestOptions = {
    method: 'GET',
    headers: parentHeader(),
  };

  return fetch(`${URLS.ROOT_PARENT}/child/${id}`, requestOptions).then(handleResponse);
}

function getSessionsFrom(id) {
  const requestOptions = {
    method: 'GET',
    headers: parentHeader(),
  };

  return fetch(`${URLS.ROOT_PARENT}/sessions-from/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        // location.reload(true)
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}