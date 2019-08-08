import axios from 'axios';
import { Message } from 'iview';

// 请求时拦截
axios.interceptors.request.use(
    config => {
        return Object.assign(config, {
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'application/json'
            }
        });
    },
    error => {
        return Promise.reject(error);
    }
);

// 请求完成后拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 统一捕获错误
        if (error.response.status == 500) {
            console.log('500啦，可能是后端的锅');
            // Message.error({
            //     content: '500啦，可能是后端的锅' + error.response.data.message,
            //     duration: 3
            // });
        } else if (error.response.status == 401) {
            console.log('401啦，没权限，可能没登录');
            // Message.error({
            //     content:
            //         '401啦，没权限，可能没登录' + error.response.data.message,
            //     duration: 3
            // });
        } else if (error.response.status == 404) {
            console.log('404啦，没找到，可能是接口地址写错了');
            // Message.error({
            //     content:
            //         '404啦，没找到，可能是接口地址写错了' +
            //         error.response.data.message,
            //     duration: 3
            // });
        } else if (error.response.status == 400) {
            Message.error({
                content: error.response.data.message,
                duration: 3
            });
        }
        return Promise.resolve(error.response);
    }
);

const ajax = {
    state: {
        packagesUrl: process.env.NODE_ENV == 'development' ? '/cmdb' : '',
        approvedUrl: process.env.NODE_ENV == 'development' ? '/caigou' : ''
    },
    actions: {
        /**
         * get请求
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象，通过Promise的then方法来获取
         *
         */
        ajaxGet({ commit }, option) {
            let config = {
                method: 'get'
            };
            return axios(Object.assign(config, option));
        },
        /**
         * post请求
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象, 通过Promise的then方法来获取
         */
        ajaxPost({ commit }, option) {
            let config = {
                method: 'post'
            };

            return axios(Object.assign(config, option));
        },
        /**
         * put请求
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象，通过Promise的then方法来获取
         */
        ajaxPut({ commit }, option) {
            let config = {
                method: 'put'
            };

            return axios(Object.assign(config, option));
        },
        /**
         * patch请求
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象, 通过Promise的then方法来获取
         */
        ajaxPatch({ commit }, option) {
            let config = {
                method: 'patch'
            };

            return axios(Object.assign(config, option));
        },
        /**
         * delete请求
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象，通过Promise的then方法来获取
         */
        ajaxDelete({}, option) {
            let config = {
                method: 'delete'
            };

            return axios(Object.assign(config, option));
        },
        /**
         * delete请求
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象，通过Promise的then方法来获取
         */
        ajaxHead({}, option) {
            let config = {
                method: 'head'
            };

            return axios(Object.assign(config, option));
        },
        // todo 待完善
        // 所有请求都成功后，执行回调
        ajaxAll({}, arrFns) {
            if (arrFns.length === 0) return;
            return axios.all(arrFns);
        },
        /**
         * post
         *
         * @param {用于提交mutations} commit
         * @param {url接口地址, params请求参数} option
         *
         * @return response对象, 通过Promise的then方法来获取
         */
        ajaxUpload({ commit }, option) {
            let config = {
                method: 'post',
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            return axios(Object.assign(config, option));
        }
    }
};

export default ajax;
