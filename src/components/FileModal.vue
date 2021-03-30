<style scoped>
.modal.left .modal-dialog,
.modal.right .modal-dialog {
	position: fixed;
	margin: auto;
	width: 320px;
	height: 100%;
	-webkit-transform: translate3d(0%, 0, 0);
	-ms-transform: translate3d(0%, 0, 0);
	-o-transform: translate3d(0%, 0, 0);
	transform: translate3d(0%, 0, 0);
}

.modal.left .modal-content,
.modal.right .modal-content {
	height: 100%;
	overflow-y: auto;
}

.modal.left .modal-body,
.modal.right .modal-body {
	padding: 15px 15px 80px;
}

/*Left*/
.modal.left.fade .modal-dialog {
	left: -320px;
	-webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
	-moz-transition: opacity 0.3s linear, left 0.3s ease-out;
	-o-transition: opacity 0.3s linear, left 0.3s ease-out;
	transition: opacity 0.3s linear, left 0.3s ease-out;
}

.modal.left.fade.in .modal-dialog {
	left: 0;
}

/*Right*/
.modal.right.fade .modal-dialog {
	right: -320px;
	-webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
	-moz-transition: opacity 0.3s linear, right 0.3s ease-out;
	-o-transition: opacity 0.3s linear, right 0.3s ease-out;
	transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
	right: 0;
}

/* ----- MODAL STYLE ----- */
.modal-content {
	border-radius: 0;
	border: none;
}

.modal-header {
	border-bottom-color: #eeeeee;
	background-color: #fafafa;
}

/* ----- v CAN BE DELETED v ----- */

.demo {
	padding-top: 60px;
	padding-bottom: 110px;
}

.btn-demo {
	margin: 15px;
	padding: 10px 15px;
	border-radius: 0;
	font-size: 16px;
	background-color: #ffffff;
}

.btn-demo:focus {
	outline: 0;
}

.closex {
	cursor: pointer;
}

.modal-open {
	display: block !important;
}
</style>

<template>
	<div class="container demo">
		<div
			class="modal right fade in show modal-open"
			tabindex="-1"
			role="dialog"
			aria-labelledby="myModalLabel2"
			v-if="isOpen"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<svg
						v-on:click="closeModal"
						xmlns="http://www.w3.org/2000/svg"
						width="1.5em"
						height="1.5em"
						fill="currentColor"
						class="bi bi-x mt-3 mx-2 closex"
						viewBox="0 0 16 16"
					>
						<path
							d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>

					<div class="modal-body">
						<p>{{ filePath }}</p>

						<div v-if="true">
							Loading!
						</div>

						<div v-if="objectMapUrl !== null">
							<img v-bind:src="objectMapUrl">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { Promised, usePromise } from "vue-promised";

Vue.component("Promised", Promised);

export default {
	name: "FileModal",
	data: () => ({
		objectMapIsLoading: false,
		objectMapUrl: null
	}),
	computed: {
		filePath() {
			return this.$store.state.files.modalPath;
		},
		isOpen() {
			return this.$store.state.files.modalPath !== null;
		}
	},
	methods: {
		async getObjectMapUrl() {
			this.objectMapIsLoading = true;
			this.objectMapUrl = await this.$store.state.files.getObjectMapUrl(this.filePath);
			this.objectMapIsLoading = false;
		},

		closeModal() {
			this.$store.commit("files/closeModal");
		}
	},
	watch: {
		filePath() {
			this.getObjectMapUrl();
		}
	},
	created() {
		this.getObjectMapUrl();
	}
};
</script>
