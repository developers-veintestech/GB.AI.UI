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

export const getProviderList = () => {
    return new Promise((resolve, reject) => {
        get(process.env.REACT_APP_API_BASE_URL, `master/provider/list`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const AddCaptureFeedback = (batchId, documentId, feedback) => {
    return new Promise((resolve, reject) => {
        post(process.env.REACT_APP_API_BASE_URL, `batch/${batchId}/document/${documentId}/feedback`,{feedback})
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const getBatchDocumentUrls = (batchId, documentId) => {
    return new Promise((resolve, reject) => {
        get(process.env.REACT_APP_API_BASE_URL, `batch/${batchId}/document/${documentId}/download/urls`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}

export const deleteBatch = (batchId, isSoftDelete) => {
    return new Promise((resolve, reject) => {
        post(process.env.REACT_APP_API_BASE_URL, `batch/delete/${batchId}/${isSoftDelete}`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data });
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error.response.data });
            });
    });
};
