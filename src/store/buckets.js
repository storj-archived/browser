export default {
    namespaced: true,
    state: {
        buckets: [],
    },
    mutations: {
        set(state, buckets) {
            state.buckets = buckets;
        },
    },
    actions: {
        async fetch({ commit, rootState }) {
            const response = await rootState.s3.listBuckets().promise();

            commit("set", response.Buckets);
        },
        async create({ rootState, dispatch }, name) {
            const response = await rootState.s3.createBucket({
                Bucket: name
            }).promise();

            console.log(response)

            await dispatch("fetch")
        },
        async delete({ rootState, dispatch }, name) {
            await rootState.s3.deleteBucket({
                Bucket: name
            }).promise();

            await dispatch("fetch")
        },
    }
};
