import axios from 'axios';





//
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.countryCode.Accept = "ar";
// if (window.cordova) {
//   axios.defaults.headers["x-app-version"] = version;
// }

// const cachedEtags = new Map();
//



const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "country-code":"ar",
        "Access-Control-Allow-Origin": "true",
        "Authorization":`Bearer ${window.localStorage.getItem('token')}`
    },
});

axios.interceptors.request.use((request) => {
  let urlKey;
  if (request.url.startsWith("/")) {
    urlKey = request.baseURL + request.url;
  } else {
    urlKey = request.url;
  }

  // if (cachedEtags.has(urlKey)) {
  //   request.headers["If-None-Match"] = cachedEtags.get(urlKey);
  // }
  return request;
});
// api.interceptors.response.use(
//     (response) =>  { debugger;return response},
//     (error) => {
//         debugger
//         if (error.response && error.response.status === 403) {
//             window.localStorage.removeItem('token');
//             api.defaults.headers = {
//                 Authorization: null,
//             };
//             window.location.reload();
//         }
//         return Promise.reject(error);
//     },
// );

api.interceptors.response.use(
    (response) => {
      console.log(response,"respose api")
       
      // if (response.headers.etag) {
      //   cachedEtags.set(response.request.responseURL, response.headers.etag);
      // }
      if (response.status === 204) {
        return response;
      }

      // cubre el caso de un download de un archivo
      if (response.status === 200 && (response.request.responseType === "blob")) {
        return response;
      }

      // if (!response.data.code || response.data.code.endsWith("E")) {
      //   throw response;
      // }
      // dejamos en type el tipo del error (I - Info, W - Warning, E - Error)
      // response.type = response.data.code.slice(-1);

      // const formikBag = store.getState().petersen.secondFactor.formikBag;

      // if (formikBag) {
      //   formikBag.setSubmitting(false);
      // }

      // if (response.data.code === "COR020W" && !!response.data.data.otp) {
      //   formikBag.setErrors({ secondFactor: i18nUtils.get("secondFactor.general.error.message") });
      // } else if (response.data.code === "API010W") {
      //   throw response;
      // }
      debugger
      return response;
    },
    (error) => {
      console.log(error)
      if (error.response) {
          
        if (
            error.response.status === 304 ||
            (error.response.status === 401 && error.response.data.code === "API007E")
        ) {
          return error.response;
        }
      }

      // se agrega el atributo para saber que es un error de saga
      // eslint-disable-next-line
      error.httpError = true;

      throw error;
    },
);


// api.interceptors.response.use(
//   (response) => response,
//   (err) => err
// );

export const get = (path, query) => {
    return api.get(
        path,
       {params: query}
    );
};

export const post = (path, body) => {
    return api.post(
        path,
        body
    );
};

export const put = (path, body, query) => {
    return api.put(
        path,
        body,
        query
    );
};
export default api;