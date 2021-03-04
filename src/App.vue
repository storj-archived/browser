<template>
<div id="app" v-on:click="handleOpenDropdownClicks">

	<div class="alert alert-warning text-center rounded-0" role="alert">
		Welcome! Please be aware that this is an alpha development version. Data and accounts will be deleted every few days.
	</div>

	<div class="container">
		<div class="row py-3">
			<div class="col">
				<nav class="navbar navbar-expand-sm second-nav p-0">
					<a class="navbar-brand" href="/"><img class="logo" alt="Storj logo" src="@/assets/storj-logo.svg"></a>
						<ul class="navbar-nav ml-auto">
							<li class="nav-item mr-3 d-none d-sm-block">
								<a class="nav-link" href="https://storj.io/blog" target="_blank">
									<p class="navlink">Blog</p>
								</a>
							</li>
							<li class="nav-item mr-3 d-none d-sm-block">
								<a class="nav-link" href="https://forum.storj.io/" target="_blank">
									<p class="navlink">Forum</p>
								</a>
							</li>

							<li v-if="this.$store.state.stargateAccessKey" class="nav-item active">
								<button v-on:click="$store.dispatch('logout')" class="btn my-2 my-sm-0 nav-join">Logout</button>
							</li>

							<!--<li class="nav-item active login-link-mobile">
								<a class="nav-link" href="https://tardigrade.io/login">
									<p class="navlink">Sign In <span class="sr-only">(current)</span></p>
								</a>
							</li>-->
						</ul>
					<!--</div>-->
				</nav>
			</div>
		</div>
	</div>

    <div class="container">
	    <router-view></router-view>
        <app-footer></app-footer>
    </div>

</div>
</template>

<script>
import AppFooter from './components/AppFooter';

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

    components: {
        AppFooter,
    }
};
</script>
