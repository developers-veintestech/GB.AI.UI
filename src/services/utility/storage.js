
import moment from "moment";

export const setLocalStorage = (key, obj) => {

  localStorage.setItem(key, JSON.stringify(obj));
};

export const removeItem = (key) => {

  localStorage.removeItem(key);
};

export const getLocalStorage = (key) => {

  var value = localStorage.getItem(key);
  // console.log(value, 'valuevalue');
  if (value === null) {
    return null;
  }
  return value ? JSON.parse(value) : null

};

export const isTokenExpired = () => {
  let currentTime = moment(new Date());
  const expireTime = moment(getLocalStorage('exp'))
  return expireTime.isBefore(currentTime)

}


export const isNeedToRefreshToken = () => {
  return !window.location.pathname.includes('/login')

};

export const clearAllCache = () => {
  localStorage.clear();
}

export const setSessionStorage = (key, obj) => {
  sessionStorage.setItem(key, JSON.stringify(obj));
};

export const getSessionStorage = (key) => {
  var value = sessionStorage.getItem(key);
  // console.log(value, 'valuevalue');
  if (value === null) {
    return null;
  }

  return value ? JSON.parse(value) : null

};

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

export const clearLocalStorage = (key) => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();  // Clears all data from localStorage
  }
};
