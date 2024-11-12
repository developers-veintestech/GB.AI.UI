import { download, get } from "../apiUtil";

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

export const getFileData= (batchId, documentId, splitDocumentId) => {
    return new Promise((resolve, reject) => {
        download(process.env.REACT_APP_API_BASE_URL, `batch/${batchId}/document/${documentId}/split/${splitDocumentId}/download`)
            .then((response) => {
                return resolve({ success: true, receiveObj: response.data })
            })
            .catch((error) => {
                return reject({ success: false, receiveObj: error })
            });
    });
}