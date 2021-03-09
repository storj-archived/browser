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
        this.$store.commit('files/init', {
            endpoint: "gateway.tardigradeshare.io",
            accessKey: "jufchh3lcferhlwiclxywrsgcwna",
            secretKey: "j27kvusnhmrhz5tdmliue4tqzujgx664deva6aj5kzdum37dbtxo4",
            bucket: "us2a-1",
            browserRoot: "/"
        });
    },
};
</script>
