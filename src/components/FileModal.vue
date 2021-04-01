<style scoped>
.modal.left .modal-dialog,
.modal.right .modal-dialog {
	position: fixed;
	margin: auto;
	width: 350px;
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
	padding: 15px 15px 0px;
}

/*Left*/
.modal.left.fade .modal-dialog {
	left: -350px;
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
	right: -350px;
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

.file-path {
  font-weight: bold;
}

.preview {
	height: 280px;
	width: 100%;
}

.object-map {
  width: 100%;
}

.storage-nodes {
  margin: 20px 0 0 0;
  padding: 5px;
  background: rgba(0, 0, 0, 0.8);
  font-weight: lighter;
  color: white;
  font-size: .8rem;
}

.size {
  margin-top: 10px;
  font-weight: lighter;
}

.download-margin {
  margin-top: 15px;
}

.share-margin {
  margin-top: 20px;
}

.spinner-border {
  margin-top: 30px;
}

.share-link {
  border: 0.1rem solid #007bff;
  border-radius: 5px;
  color: #007bff;
}

.download-btn {
  font-weight: bold;
}

</style>

<template>
	<div class="container demo">
		<div
			class="modal right fade in show modal-open"
			tabindex="-1"
			role="dialog"
			aria-labelledby="myModalLabel2"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<svg
						v-on:click="closeModal"
						xmlns="http://www.w3.org/2000/svg"
						width="2em"
						height="2em"
						fill="currentColor"
						class="bi bi-x mt-3 mx-2 closex"
						viewBox="0 0 16 16"
					>
						<path
							d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>

					<div class="modal-body container">
            <div>
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                class="bi bi-file-earmark mr-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                />
                <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
              </svg>
              <span class="file-path">{{ filePath }}</span>
            </div>
            <p class="size">{{size}}</p>

			<img class="preview" v-if="previewIsImage" v-bind:src="preSignedUrl">

			<video class="preview" controls v-if="previewIsVideo" v-bind:src="preSignedUrl">

			<audio class="preview" controls v-if="previewIsAudio" v-bind:src="preSignedUrl">

            <button class="btn btn-primary btn-block download-margin download-btn">Download
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download mx-1" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </button>

            <button class="btn btn-light btn-block share-margin"><div class="share-link">Generate Share Link</div></button>

            <div v-if="objectMapIsLoading" class="d-flex justify-content-center text-primary">
              <div class="spinner-border" role="status"></div>
            </div>
          </div>

          <div v-if="objectMapUrl !== null">
            <p class="storage-nodes">Nodes storing this file</p>
            <img class="object-map" v-bind:src="objectMapUrl">
          </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import prettyBytes from "pretty-bytes";

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
		size() {
			return prettyBytes(this.$store.state.files.files.find((file) => file.Key === this.$store.state.files.modalPath).Size);
		},
		extension() {
			return this.filePath.split(".").pop();
		},
		preSignedUrl() {
			return this.$store.getters["files/preSignedUrl"](this.filePath);
		},
		previewIsImage() {
			return ['bmp', 'svg', 'jpg', 'jpeg', 'png', 'ico', 'gif'].includes(this.extension);
		},
		previewIsVideo() {
			return ['m4v', 'mp4', 'webm', 'mov', 'mkv'].includes(this.extension)
		},
		previewIsAudio() {
			return ['mp3', 'wav', 'ogg'].includes(this.extension);
		}
	},
	methods: {
		async getObjectMapUrl() {
			this.objectMapIsLoading = true;
			const objectMapUrl = await this.$store.state.files.getObjectMapUrl(this.filePath);

			await new Promise(resolve => {
				const preload = new Image();
				preload.onload = resolve;
				preload.src = objectMapUrl;
			});

			this.objectMapUrl = objectMapUrl;
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
};
</script>
