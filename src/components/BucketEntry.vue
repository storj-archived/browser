<style scoped>
.mt {
    margin-top: -10px;
}
</style>

<template>
    <tr scope="row" class="py-1 border-grey" @click.prevent="goToFiles(bucket.Name)">
        <td class="name" data-ls-disabled>

            <p class="flex-row align-items-center mb-0">
                <svg class="mr-2 ml-4" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.57143C0 1.15127 1.15127 0 2.57143 0H9C9.71008 0 10.2857 0.575634 10.2857 1.28571C10.2857 1.99579 10.8613 2.57143 11.5714 2.57143H18C19.4202 2.57143 20.5714 3.7227 20.5714 5.14286V15.4286C20.5714 16.8487 19.4202 18 18 18H2.57143C1.15127 18 0 16.8487 0 15.4286V2.57143Z" fill="#768394"/>
                </svg>

                {{bucket.Name}}
            </p>
        </td>
        <td class="date">
            <span>{{uploadDate}}</span>
        </td>
        <td class="text-right">
            <div>
                <div class="dropleft">
                    <div v-if="loadingSpinner()" class="spinner-border" role="status"></div>
                    <button v-else class="btn btn-white btn-actions px-2 py-0 mt" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="toggleDropdown">
                        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.2 1.6C3.2 2.48366 2.48366 3.2 1.6 3.2C0.716344 3.2 0 2.48366 0 1.6C0 0.716344 0.716344 0 1.6 0C2.48366 0 3.2 0.716344 3.2 1.6Z" fill="#7C8794" />
                            <path d="M3.2 8C3.2 8.88366 2.48366 9.6 1.6 9.6C0.716344 9.6 0 8.88366 0 8C0 7.11634 0.716344 6.4 1.6 6.4C2.48366 6.4 3.2 7.11634 3.2 8Z" fill="#7C8794" />
                            <path d="M1.6 16C2.48366 16 3.2 15.2837 3.2 14.4C3.2 13.5163 2.48366 12.8 1.6 12.8C0.716344 12.8 0 13.5163 0 14.4C0 15.2837 0.716344 16 1.6 16Z" fill="#7C8794" />
                        </svg>
                    </button>
                    <div class="dropdown-menu dd-menu shadow show" v-if="dropdownOpen">
                        <button v-if="!deleteConfirmation" class="dropdown-item action p-3" v-on:click="confirmDeletion">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            Delete
                        </button>
                        <div v-else>
                            <p class="deletion-confirmation px-3 pt-3 text-center">Are you sure?</p>
                            <div class="d-flex">
                                <button class="dropdown-item trash p-3 action" v-on:click="finalDelete">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    Yes
                                </button>
                                <button class="dropdown-item p-3 action" v-on:click="cancelDeletion">
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="green" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>

export default {
    props: [
        "bucket"
    ],

    data: () => ({
        deleteConfirmation: false,
    }),

    computed: {
        uploadDate() {
            return this.bucket.CreationDate.toUTCString();
        },
        dropdownOpen() {
            return this.$store.state.openedDropdown === this.bucket.Name;
        },
    },

    methods: {
        goToFiles(bucketName) {
            this.$store.dispatch("files/setBucket", bucketName);

            this.$router.push("/files");
        },
        loadingSpinner() {
            return false;
        },
        toggleDropdown(event) {
            event.stopPropagation();

            this.$store.dispatch("openDropdown", this.bucket.Name);

            this.deleteConfirmation = false;
        },
        confirmDeletion(event) {
            event.stopPropagation();
            this.deleteConfirmation = true;
        },
        async finalDelete(event) {
            event.stopPropagation();

            try {
                await this.$store.dispatch("openDropdown", null);
                await this.$store.dispatch("buckets/delete", this.bucket.Name);

                this.deleteConfirmation = false;
            } catch (e) {
                console.log(e.message)
            }
        },
        cancelDeletion(event) {
            event.stopPropagation();
            this.$store.dispatch("openDropdown", null);
            this.deleteConfirmation = false;
        }
    }
};
</script>
