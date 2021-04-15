<style scoped>
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

.modal.right .modal-content {
	height: 100%;
	overflow-y: auto;
}

.modal.right .modal-body {
	padding: 15px 15px 0px;
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
	display: inline-block;
	font-weight: bold;
	max-width: 80%;
	position: relative;
	top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.preview {
	width: 100%;
}

.object-map {
	width: 100%;
}

.storage-nodes {
	padding: 5px;
	background: rgba(0, 0, 0, 0.8);
	font-weight: lighter;
	color: white;
	font-size: 0.8rem;
}

.size {
	font-size: 0.9rem;
	font-weight: lighter;
}

.share-btn {
	border: 0.1rem solid #007bff;
	border-radius: 5px;
	color: #007bff;
}

.download-btn {
	font-weight: bolder;
	font-size: 0.8rem;
}

/* .btn-copy {
  position: absolute;
  bottom: 5px;
  right: 20px;
  color: #0068DC;
} */
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
					<div class="modal-body container">
						<div>
							<svg
								v-on:click="closeModal"
								xmlns="http://www.w3.org/2000/svg"
								width="1.5em"
								height="1.5em"
								fill="#6e6e6e"
								class="bi bi-x mb-3 closex"
								viewBox="0 0 16 16"
							>
								<path
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
								/>
							</svg>
						</div>
						<div class="mb-2">
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
								<path
									d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"
								/>
							</svg>
							<span class="file-path">{{ filePath }}</span>
						</div>
						<p class="size mb-3">{{ size }}</p>

						<img
							class="preview mb-3"
							v-if="previewIsImage"
							v-bind:src="preSignedUrl"
						/>

						<video
							class="preview mb-3"
							controls
							v-if="previewIsVideo"
							v-bind:src="preSignedUrl"
						></video>

						<audio
							class="preview mb-3"
							controls
							v-if="previewIsAudio"
							v-bind:src="preSignedUrl"
						></audio>

						<button
							class="btn btn-primary btn-lg btn-block mb-3 download-btn"
							download
							v-on:click="download"
						>
							Download
							<svg
								width="10"
								height="15"
								viewBox="0 0 10 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								alt="Download"
								class="ml-2"
							>
								<path
									d="M4.0498 7.98517V0H6.0498V7.91442L8.49648 5.46774L9.91069 6.88196L5.01443 11.7782L0.118164 6.88196L1.53238 5.46774L4.0498 7.98517Z"
									fill="white"
								/>
								<path
									d="M0 13L10 13V15L0 15V13Z"
									fill="white"
								/>
							</svg>
						</button>

						<div v-if="objectLink" class="input-group mt-4">
							<input
								class="form-control form-control-lg"
								type="url"
								id="url"
								v-bind:value="objectLink"
								aria-describedby="generateShareLink"
								readonly
							/>
							<button
								v-on:click="copy"
								id="generateShareLink"
								type="button"
								name="copy"
								class="btn btn-outline-primary btn-copy"
							>
								{{ this.copyText }}
							</button>
						</div>

						<button
							v-else
							class="btn btn-light btn-block share-margin"
						>
							<div class="share-btn" v-on:click="getSharedLink">
								Generate Share Link
							</div>
						</button>

						<div
							v-if="objectMapIsLoading"
							class="d-flex justify-content-center text-primary"
						>
							<div
								class="spinner-border mt-3"
								role="status"
							></div>
						</div>
					</div>

					<div class="mt-3" v-if="objectMapUrl !== null">
						<div class="storage-nodes">Nodes storing this file</div>
						<img class="object-map" v-bind:src="objectMapUrl" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FileShareModal from "./FileShareModal";
import prettyBytes from "pretty-bytes";

export default {
	name: "FileModal",
	data: () => ({
		objectMapIsLoading: false,
		objectMapUrl: null,
		objectLink: null,
		copyText: "Copy Link"
	}),
	computed: {
		file() {
			return this.$store.state.files.files.find(
				file => file.Key === this.filePath.split("/").slice(-1)[0]
			);
		},
		filePath() {
			return this.$store.state.files.modalPath;
		},
		size() {
			return prettyBytes(
				this.$store.state.files.files.find(
					file => file.Key === this.file.Key
				).Size
			);
		},
		extension() {
			return this.filePath.split(".").pop();
		},
		preSignedUrl() {
			return this.$store.getters["files/preSignedUrl"](this.filePath);
		},
		previewIsImage() {
			return ["bmp", "svg", "jpg", "jpeg", "png", "ico", "gif"].includes(
				this.extension
			);
		},
		previewIsVideo() {
			return ["m4v", "mp4", "webm", "mov", "mkv"].includes(
				this.extension
			);
		},
		previewIsAudio() {
			return ["mp3", "wav", "ogg"].includes(this.extension);
		}
	},
	methods: {
		async getObjectMapUrl() {
			this.objectMapIsLoading = true;
			const objectMapUrl = await this.$store.state.files.getObjectMapUrl(
				this.filePath
			);

			await new Promise(resolve => {
				const preload = new Image();
				preload.onload = resolve;
				preload.src = objectMapUrl;
			});

			this.objectMapUrl = objectMapUrl;
			this.objectMapIsLoading = false;
		},

		download() {
			this.$store.dispatch("files/download", this.file);
		},

		closeModal() {
			this.$store.commit("files/closeModal");
		},

		async copy() {
			await navigator.clipboard.writeText(this.objectLink);
			this.copyText = "Copied!";
			setTimeout(() => {
				this.copyText = "Copy Link";
			}, 2000);
		},

		async getSharedLink() {
			this.objectLink = await this.$store.state.files.getSharedLink(
				this.filePath
			);
		}
	},
	watch: {
		filePath() {
			this.getObjectMapUrl();
		}
	},
	created() {
		this.getObjectMapUrl();
	},
	components: {
		FileShareModal
	}
};
</script>
