import axios from 'axios';
import { loaderService } from '../services/loader/loader';
import * as storage from '../services/utility/storage';
import history from '../router/customRouter'


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
        loaderService.hide();
      }
    }

  }

  if (error.response && [404].indexOf(error.response.status) !== -1) {
    history.push({ pathname: '/not-found' });
  }

 
  onError(error);
  return Promise.reject(error)
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
   
  }

  if (isSkipLoader(response.config)) {
    return response;
  }

  if (!requestCount) {
    return response;
  }

  requestCount--;
 
  if (!requestCount) {
    loaderService.hide();
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
debugger
const requestHandler = (request) => {
  const token = storage.getLocalStorage('token')
  if (token) {
    request.headers['Authorization'] = `bearer ${token}`;
  }

  if (isSkipLoader(request)) {
    return request
  }


  if (!requestCount) {
    loaderService.show();
  }
  requestCount++;
  return request
}

const requestError = (error) => {
  return Promise.reject(error);
}

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
  
}

axios.interceptors.request.use(
  request => requestHandler(request),
  error => requestError(error)
)

axios.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

