<template>
<div id="app" @click="handleOpenDropdownClicks">
    <router-view/>
</div>
</template>

<script>

export default {
	methods: {
		handleOpenDropdownClicks() {
			if (this.$store.state.openedDropdown) {
				this.$store.dispatch("openDropdown", null);
			}

			if (this.$store.state.files.selectedFile) {
				this.$store.dispatch("files/updateSelectedFile", null);
			}
		},
	},

    created() {
        this.$store.commit('init', {
            endpoint: "gateway.tardigradeshare.io",
            accessKey: "jw3pcekz3rxxanntmishi3vt7yda",
            secretKey: "jy7ecpcdw7cs4dy3blnfsyfagbx5eyfhin5seglrzxpcjcuvh7b3k",
            browserRoot: "/"
        });
    },
};
</script>

<style>
html,
body,
#app {
    height: 100%;
}
</style>
