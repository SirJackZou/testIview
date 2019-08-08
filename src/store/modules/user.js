import Cookies from 'js-cookie';
import API from '@/libs/API';

const user = {
    state: {
        //erp账号
        username: '',
    },
    mutations: {
        toSSO() {
            // 如果浏览器为ie时获得location
            if (!location.origin) {
                location.origin = location.protocol + '//' + location.hostname;
            }
            let returnUrl = location.origin;
            let url = `http://ssa.jd.com/sso/login?ReturnUrl=` + encodeURIComponent(returnUrl);
            location.href = url;
        },

        getUserData(state, data) {
            state.username = data.username;
            if (data.camouflageUser) {
                state.camousname = data.camouflageUser.username;
                state.bCamouflaged = true;
            } else {
                state.bCamouflaged = false;
                data.isCamouflage == 1 ? (state.isCamouflage = true) : (state.isCamouflage = false);
            }
        },
    },
    actions: {
        //用户伪装登录
        translateUser(state, erpName) {
            let objCoby = {
                username: erpName,
                cookie: Cookies.get('sso.jd.com'), //用户cookie
            };
            state
                .dispatch('ajaxGet', {
                    url: API.user.camouflage,
                    params: objCoby,
                })
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.status_code == 200) {
                            state.dispatch('getUserInfo');
                            // state.dispatch('getUserPermission');
                        } else {
                            console.log(res.data.message)
                        }
                    }
                });
        },
        // 获取用户信息
        getUserInfo(state) {
            state
                .dispatch('ajaxGet', {
                    url: '/benchmark/v1/user/get/' + Cookies.get('sso.jd.com'),
                })
                .then((res) => {
                    let objData = res.data;
                    if (objData.status == 1000) {
                        state.commit('getUserData', objData.data);
                    } else if (objData.status == 401) {
                        Message.error('无权访问！');
                        location.href = location.origin + '/limit.html';
                    } else {
                        Message.error(objData.message);
                        state.commit('toSSO');
                    }
                })
                .catch((error) => {
                    state.commit('toSSO');
                });
        },

        // 登出
        userLoginout(state) {
            Cookies.remove('sso.jd.com');
            state.commit('toSSO');
        },
    },
};

export default user;
