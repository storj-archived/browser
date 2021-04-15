<style scoped>
.modal-open {
	display: block !important;
}

.modal-title {
	word-break: break-word;
	font-weight: bold;
}

.btn-copy {
	position: absolute;
	bottom: 74px;
	right: 22px;
	color: #0068dc;
}

#url {
	padding-right: 30%;
}

.share-btn {
	background-color: #f5f5f5 !important;
}

.closex {
	cursor: pointer;
}

#shareModal {
	z-index: 1070;
}

#backdrop {
	z-index: 1060 !important;
}
</style>

<template>
	<div v-on:click="stopClickPropagation">
		<div
			class="modal fade show modal-open"
			id="shareModal"
			tabindex="-1"
			aria-labelledby="shareModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div
					class="modal-content text-center border-0 p-2 p-sm-4 p-md-5"
				>
					<div class="modal-body pt-0">
						<div class="d-flex justify-content-end">
							<svg
								v-on:click="close"
								xmlns="http://www.w3.org/2000/svg"
								width="2em"
								height="2em"
								fill="#6e6e6e"
								class="bi bi-x mb-2 closex"
								viewBox="0 0 16 16"
							>
								<path
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
								/>
							</svg>
						</div>
						<h5
							class="modal-title mx-auto mb-3"
							id="shareModalLabel"
						>
							Share Object
						</h5>

						<div v-if="objectLink">
							<input
								class="form-control form-control-lg mt-4"
								type="url"
								id="url"
								v-bind:value="objectLink"
								readonly
							/>
							<button
								v-on:click="copy"
								type="button"
								name="copy"
								class="btn btn-outline-primary btn-copy"
							>
								{{ this.copyText }}
							</button>
						</div>

						<button
							v-else
							type="button"
							name="copy"
							class="btn btn-outline-primary btn-block share-btn"
							v-on:click="getSharedLink"
						>
							Generate Share Link
						</button>

						<button
							type="button"
							class="btn btn-primary btn-block mt-3"
							data-dismiss="modal"
							v-on:click="close"
						>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show modal-open" id="backdrop"></div>
	</div>
</template>

<script>
export default {
	name: "FileShareModal",
	data: () => ({
		objectLink: null,
		copyText: "Copy Link"
	}),
	computed: {
		filePath() {
			return this.$store.state.files.fileShareModal;
		}
	},
	methods: {
		async getSharedLink() {
			this.objectLink = await this.$store.state.files.getSharedLink(
				this.filePath
			);
		},
		async copy() {
			await navigator.clipboard.writeText(this.objectLink);
			this.copyText = "Copied!";
			setTimeout(() => {
				this.copyText = "Copy Link";
			}, 2000);
		},
		close() {
			this.$store.commit("files/closeFileShareModal");
		},
		stopClickPropagation(e) {
			if (e.target.id !== "shareModal") {
				e.stopPropagation();
			}
		}
	}
};
</script>
