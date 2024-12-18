import { get, post } from "./apiUtil";

export const userLogin = (payload) => {
    return new Promise((resolve, reject) => {
        post(process.env.REACT_APP_API_BASE_URL, `admin/user/login`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data });
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error });
            });
    });
};