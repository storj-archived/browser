<style scoped>
.bucket-name-column {
    width: 70%;
}

.bucket-date-column {
    width: 20%;
}

.bucket-functional-column {
    width: 10%;
}

.background {
    background-color: #f5f6fa;
    height: 100%;
}

.title {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #232B34;
}

.table-heading {
    color: #768394;
    border-top: 0;
    border-bottom: 1px solid #dee2e6;
}

.create-button {
    background: #E6E9EF;
    border-radius: 4px;
}

.create-button:hover {
    background: #0068DC;
    color: #fff;
}

.create-button:hover .icon-path {
    fill: #fff;
    stroke: #fff;
}

.mt {
    margin-top: -3px;
}

.mh {
    min-height: 400px;
}

.create-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.create-bucket-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background-color: rgba(147, 147, 147, 0.8);
}
</style>

<template>
    <div class="background">
        <div class="col-sm-12">
            <div class="card card-top-flat border-0 py-4 px-5 background mh">
                <div class="row mb-4 mx-0 justify-content-between">
                    <h1 class="title">Buckets</h1>
                    <button class="btn create-button px-3 py-2 flex-row align-items-center" @click="openCreateBucketModal">
                        <svg class="mr-2 mt" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="icon-path" d="M0.912109 1.92481C0.912109 1.1558 1.56545 0.5 2.41211 0.5H7.41211C7.70648 0.5 7.91211 0.724912 7.91211 0.962406C7.91211 1.78796 8.60191 2.42481 9.41211 2.42481H14.4121C15.2588 2.42481 15.9121 3.08061 15.9121 3.84962V14.0752C15.9121 14.8442 15.2588 15.5 14.4121 15.5H2.41211C1.56545 15.5 0.912109 14.8442 0.912109 14.0752V1.92481Z" fill="#768394" stroke="#7C8794"/>
                            <path d="M11.182 8.59043H5.79067M8.48633 5.89478V11.2861" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        New Bucket
                    </button>
                </div>

                <div v-if="buckets.length">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th class="table-heading bucket-name-column pl-4" scope="col">
                                Name
                            </th>
                            <th class="table-heading bucket-date-column pl-0" scope="col">
                                Date Created
                            </th>
                            <th class="table-heading bucket-functional-column" scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <bucket-entry v-for="(bucket, index) in buckets" :bucket="bucket" :key="index"/>
                        </tbody>
                    </table>
                </div>

                <div v-else class="create-container">
                    <CreateBucket/>
                </div>
            </div>
        </div>
        <div v-if="isCreateBucketModalShown" class="create-bucket-modal">
            <CreateBucket :is-modal="true" @close="closeCreateBucketModal"/>
        </div>
    </div>
</template>

<script>
import BucketEntry from "../components/BucketEntry.vue";
import CreateBucket from "../components/CreateBucket.vue";

export default {
    data: () => ({
        isCreateBucketModalShown: false,
    }),
    async mounted() {
        try {
            await this.$store.dispatch("buckets/fetch", null);
        } catch (e) {
            console.log(e.message)
        }
    },
    computed: {
        buckets() {
            return this.$store.state.buckets.buckets;
        },
    },
    methods: {
        openCreateBucketModal() {
            this.isCreateBucketModalShown = true;
        },
        closeCreateBucketModal() {
            this.isCreateBucketModalShown = false;
        }
    },
    components: {
        BucketEntry,
        CreateBucket,
    }
}
</script>
