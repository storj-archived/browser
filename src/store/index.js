import Vue from 'vue'
import Vuex from 'vuex'

import files from './files.js';
import buckets from './buckets.js';
import AWS from "aws-sdk";

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {
        openedDropdown: null,
        s3: null,
        browserRoot: "/",
    },
    mutations: {
        init(state, {
            accessKey,
            secretKey,
            endpoint = "https://gateway.tardigradeshare.io",
            browserRoot
        }) {
            const s3Config = {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
                endpoint,
                s3ForcePathStyle: true,
                signatureVersion: "v4"
            };

            state.s3 = new AWS.S3(s3Config);
            state.browserRoot = browserRoot;
        },
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
        buckets,
    }
})
