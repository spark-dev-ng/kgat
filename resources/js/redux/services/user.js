import { URLS } from '../constants'
import { authHeader } from '../../helpers';

export const userService = {
  login,
  register,
  logout,
  getAuth,
  getAll,
  getStudent,
  uploadPicture,
  registerParent
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${URLS.ROOT}/login`, requestOptions)
    .then(handleResponse)
    .then(res => {
      // login successful if there's a jwt token in the response
      console.log({fre_service_res:res.success});
      if (res.success) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log({service_res:res.success});
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', JSON.stringify(res.data.token));
        
					// location.replace('/dashboard');
      }

      return res.data.user;
    });
}
function uploadPicture (picture){
  // sessionStorage.removeItem('profile_pix');
  // if(picture)
  // console.error(picture)
  // const form = new FormData(pic)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type':'application/json',
    'X-Requested-With':'XMLHttpRequest' },
    body: JSON.stringify({ image:picture })
  };

  return fetch(`${URLS.ROOT}/upload-pic`, requestOptions)
    .then(handleResponse)
    .then(res => {
        sessionStorage.removeItem('profile_pix');
      // login successful if there's a jwt token in the response
      console.log({frexxxxxxxS_service_res:res.success});
      if (res.success) {
        sessionStorage.setItem('profile_pix',res.url);
      }

      return res;
    });
}
function registerParent (data){
  console.error({data})
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${URLS.ROOT}/guardian/register`, requestOptions)
    .then(handleResponse)
    .then(res => {
      // login successful if there's a jwt token in the response
      console.log({fre_service_res:res});
      if (res.success) {
        console.error({data});
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log({service_res:res.success});
        // localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('student', JSON.stringify(res)); 
        location.replace(`/register-success/${res.user.userable_id}`);
      }
      return res.data.user;
    });
}

function register(data) {
  console.error({data})
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${URLS.ROOT}/register`, requestOptions)
    .then(handleResponse)
    .then(res => {
      // login successful if there's a jwt token in the response
      console.log({fre_service_res:res});
      if (res.success) {
        console.error({data});
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log({service_res:res.success});
        // localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('student', JSON.stringify(res)); 
        location.replace(`/register-success/${res.user.userable_id}`);
      }
      return res.data.user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

function getAll() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };
  return fetch(`${URLS.ROOT}/users`, requestOptions).then(handleResponse);
}

function getAuth() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
  };

  return fetch(`${URLS.ROOT_ADMIN}/user`, requestOptions).then(handleResponse);
}
function getStudent(id) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
  };

  return fetch(`${URLS.ROOT}/student/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true)
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}