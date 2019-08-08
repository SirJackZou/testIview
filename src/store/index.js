import Vue from 'vue';
import Vuex from 'vuex';

import ajax from './modules/ajax';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        app,
        user,
        ajax,
    }
});

export default store;
