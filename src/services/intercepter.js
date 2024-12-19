import axios from 'axios';
import { getLocalStorage } from './utility/storage';


let requestCount = 0;

export default axios.create({
  //baseURL: `${config.apiUrl}`
});

const errorHandler = (error) => {
   
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }

  if (!isSkipLoader(error.config)) {
    // Do something with response error 
    if (!requestCount) { }
    else {

      requestCount--;
      // If it was last ongoing request, broadcast event
      if (!requestCount) {
        //loaderService.hide();
      }
    }

  }

  if (error.response && [404].indexOf(error.response.status) !== -1) {
    //history.push({ pathname: '/not-found' });
  }

  if (error.response && [401].indexOf(error.response.status) !== -1) { 
    window.location.href = '/auth/login';   
    
  }

  onError(error);
  return Promise.reject(error)
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses

  }

  if (isSkipLoader(response.config)) {
    return response;
  }

  if (!requestCount) {
    return response;
  }

  requestCount--;
  // If it was last ongoing request, broadcast event
  if (!requestCount) {
    //loaderService.hide();
  }

  return response;
}

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
    false : true
}

const isSkipLoader = (config = {}) => {
  return config.hasOwnProperty('skipLoader') && config.skipLoader ?
    true : false
}

const isHandlerEnabledAlert = (config = {}) => {
  return config.hasOwnProperty('handlerEnabledAlert') && !config.handlerEnabledAlert ?
    false : true
}

/**
 * The request handler of intercepter
 * @param {object} request The axios request.
 */
const requestHandler = (request) => {
  const token = getLocalStorage('token')
  if (token) {
    request.headers['Authorization'] = `bearer ${token}`;
  }
  // if (isHandlerEnabled(request)) {
  //   // Modify request here
  //   // const token = authService.token;
  //   const token = storage.getLocalStorage(AppConstant.TOKEN)
  //   if (token) {
  //     request.headers['Authorization'] = `Bearer ${token.token}`;

  //   }
  // }

  if (isSkipLoader(request)) {
    return request
  }


  if (!requestCount) {
    //loaderService.show();
  }
  requestCount++;
  return request
}

const requestError = (error) => {
  return Promise.reject(error);
}


/**
 * Notifiy the error while request failed.
 * @param {object} error 
 */
const onError = (error) => {
  if (!isHandlerEnabledAlert(error.config)) {
    return
  }

  let message = error.response && error.response.data && error.response.data.error_description;

  if (!message) {
    message = error.message;
  }
  if (!message) {
    message = error;
  }
  if (error.response.status === 401) {
    
  }

}

axios.interceptors.request.use(
  request => requestHandler(request),
  error => requestError(error)
)

axios.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

