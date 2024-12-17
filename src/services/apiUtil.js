import axios from 'axios';

export const get = (url, pathParam, isSkipLoader = false) => {
    return new Promise((resolve, reject) => {        
        callApi()

        function callApi() {
            axios
                .get(url + pathParam, { skipLoader: isSkipLoader }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });

        }
    }
    );
}

export const getWithArrayBuffer = (url, pathParam, isSkipLoader = false) => {
    return new Promise((resolve, reject) => {
        callApi()

        function callApi() {
            axios
                .get(url + pathParam, { skipLoader: isSkipLoader, responseType: 'arraybuffer' }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });

        }
    });
}

export const post = (url, pathParam, data, isSkipLoader = false) => {

    return new Promise((resolve, reject) => {
        callApi()

        function callApi() {
            axios
                .post(url + pathParam, data, { skipLoader: isSkipLoader })
                .then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });

        }
    });

}

export const put = (url, pathParam, data, isSkipLoader = false) => {
    return new Promise((resolve, reject) => {       
        callApi()

        function callApi() {
            axios
                .put(url + pathParam, data, { skipLoader: isSkipLoader }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}

export const patch = (url, pathParam, data, isSkipLoader = false) => {

    return new Promise((resolve, reject) => {      
        callApi()

        function callApi() {
            axios
                .patch(url + pathParam, data, { skipLoader: isSkipLoader }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}

export const destory = (url, pathParam, isSkipLoader = false) => {
    return new Promise((resolve, reject) => {
        callApi()

        function callApi() {
            axios
                .delete(url + pathParam, { skipLoader: isSkipLoader }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });

}

export const options = (url, pathParam, isSkipLoader = false) => {

    return new Promise((resolve, reject) => {
        callApi()

        function callApi() {
            axios
                .options(url + pathParam, { skipLoader: isSkipLoader }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}

export const download = (url, pathParam, isSkipLoader = false) => {

    return new Promise((resolve, reject) => {     
        callApi()

        function callApi() {
            axios
                .get(url + pathParam, { skipLoader: isSkipLoader, responseType: 'blob' }).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}

export const fileUpload = (url, obj) => {
    return new Promise((resolve, reject) => {      
        callApi()

        function callApi() {
            axios
                .put(url, obj, options).then((response) => {

                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });

}

export const downloadPost = (url, pathParam, payload, isSkipLoader = false) => {

    return new Promise((resolve, reject) => {      
        callApi()

        function callApi() {
            axios
                .post(url + pathParam, payload, { skipLoader: isSkipLoader, responseType: 'blob' }).then((response) => {
                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}

export const downloadGet = (url, pathParam, payload, isSkipLoader = false) => {
    return new Promise((resolve, reject) => {       
        callApi()
        function callApi() {
            axios
                .get(url + pathParam, { skipLoader: isSkipLoader, responseType: 'blob' }).then((response) => {
                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}

export const downloadPostFile = (url, pathParam, payload, isSkipLoader = false) => {
    return new Promise((resolve, reject) => {     
        callApi()
        function callApi() {
            axios
                .post(url + pathParam, payload, { skipLoader: isSkipLoader, responseType: 'blob' }).then((response) => {
                    let fileName = null;

                    if (response.headers && response.headers['content-disposition']) {
                        //console.log('response.headers', response.headers)
                        const disposition = response.headers['content-disposition'];
                        if (disposition && disposition.indexOf('attachment') !== -1) {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            var matches = filenameRegex.exec(disposition);
                            if (matches != null && matches[1]) fileName = matches[1].replace(/['"]/g, '');
                        }
                    }

                    let returnValue = {
                        blob: response.data,
                        fileName
                    };

                    return resolve(returnValue);
                })
                .catch((error) => {
                    return reject(error)
                });
        }
    });
}