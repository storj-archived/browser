import Vue from 'vue'
import Vuex from 'vuex'

import files from './files.js';

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {
        openedDropdown: null
    },
    mutations: {
        setOpenedDropdown(state, id) {
            state.openedDropdown = id;
        },
    },
    actions: {
        openDropdown({ commit, dispatch }, id) {
            if (id !== "FileBrowser") {
                dispatch("files/clearAllSelectedFiles", { root: true });
            }
            commit("setOpenedDropdown", id);
        },
    },
    modules: {
        files,
    }
})
