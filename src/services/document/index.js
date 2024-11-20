import { get, post } from "../apiUtil";

export const getBatchList= () => {
    return new Promise((resolve, reject) => {
        get(process.env.REACT_APP_API_BASE_URL, `batch/list`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const postDocumentUpload = (payload) => {
    return new Promise((resolve, reject) => {
        post(process.env.REACT_APP_API_BASE_URL, `batch/documents/upload`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data });
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error });
            });
    });
};

export const getBatchDetail = (batchId) => {
    return new Promise((resolve, reject) => {
        get(process.env.REACT_APP_API_BASE_URL, `batch/${batchId}`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const reExcecuteDocumentCategory = (payload) => {
    return new Promise((resolve, reject) => {
        get(process.env.REACT_APP_API_BASE_URL, `document/category/re-excecute`, payload)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}
