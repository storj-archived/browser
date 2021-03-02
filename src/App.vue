<template>
  <div id="app">

      <router-view></router-view>

  </div>
</template>

<script>
export default {
    created() {
        this.$store.commit('files/init', {
            endpoint: "gateway.tardigradeshare.io",
            accessKey: "jufchh3lcferhlwiclxywrsgcwna",
            secretKey: "j27kvusnhmrhz5tdmliue4tqzujgx664deva6aj5kzdum37dbtxo4",
            bucket: "us2a-1",
            browserRoot: "/"
        });
    }
};
</script>
