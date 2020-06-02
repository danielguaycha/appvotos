import Config from './../config';
import Vue from "vue";
import axios from "axios";
axios.defaults.baseURL = Config.api;
axios.interceptors.request.use(function (config) {
    const token = Vue.auth.getToken();
    if ( token !== null ) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const { response: { status }} = error;
    if(status === 401) {
        if(Vue.auth.getToken() !== null) {
            Vue.auth.destroyToken();
            window.location.reload();
        }
    }
    return Promise.reject(error);
});


Vue.prototype.$http = axios;
