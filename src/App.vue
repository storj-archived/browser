<template>
  <div id="app">

      <file-browser></file-browser>

  </div>
</template>

<script>
import FileBrowser from './components/FileBrowser.vue';

export default {
    components: {
        FileBrowser
    },
    created() {
        this.$store.commit('files/init', {
            endpoint: "gateway.tardigradeshare.io",
            accessKey: "jufchh3lcferhlwiclxywrsgcwna",
            secretKey: "j27kvusnhmrhz5tdmliue4tqzujgx664deva6aj5kzdum37dbtxo4",
            bucket: "us2a-1"
        });
    }
};
</script>
