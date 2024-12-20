import { get, post } from "./apiUtil";
import { clearAllLocalStorage } from "./utility/storage";

export const userLogin = (payload) => {
    return new Promise((resolve, reject) => {
        post(process.env.REACT_APP_API_BASE_URL, `admin/user/token`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data });
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error });
            });
    });
};

export const userLogout=()=>{
    clearAllLocalStorage()
}