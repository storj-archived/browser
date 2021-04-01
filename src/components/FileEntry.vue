<style>
.table td,
.table th {
	padding: 16px 16px 16px 0 !important;
	white-space: nowrap;
	vertical-align: middle;
}

.table-hover tbody tr:hover {
	background-color: #f4f5f7;
	cursor: pointer;
}

.selected-row {
	background-color: #f4f5f7;
}

.btn-actions {
	padding-top: 0;
	padding-bottom: 0;
}

.dropdown-menu {
	padding: 0;
}

.dropdown-item {
	font-size: 14px;
	font-family: "Inter";
}

.dropdown-item svg {
	color: #768394;
}

.dropdown-item:focus,
.dropdown-item:hover {
	color: #1b2533;
	background-color: #f4f5f7;
	font-weight: bold;
}

.dropdown-item:focus svg,
.dropdown-item:hover svg {
	color: #0068dc;
}

.deletion-confirmation {
	font-size: 14px;
	font-weight: bold;
}
</style>

<template>
	<tr
		scope="row"
		v-bind:class="{ 'selected-row': isFileSelected() }"
		v-on:click="selectFile"
	>
		<td class="w-50" data-ls-disabled>
			<span v-if="file.type === 'folder'">
				<svg
					width="1.5em"
					height="1.5em"
					viewBox="0 0 16 16"
					class="bi bi-folder ml-2 mr-1"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z"
					/>
					<path
						fill-rule="evenodd"
						d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"
					/>
				</svg>

				<span v-on:click="fileClick">
					<router-link v-bind:to="link">
						<a href="javascript:null" style="margin-left: 5px;">
							{{filename}}
						</a>
					</router-link>
				</span>
			</span>

			<span v-else>
				<svg
					width="1.5em"
					height="1.5em"
					viewBox="0 0 16 16"
					class="bi bi-file-earmark ml-2 mr-1"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
					/>
					<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
				</svg>

				{{ filename }}
			</span>
		</td>
		<td class="w-25">
			<span v-if="file.type === 'file'">{{ size }}</span>
		</td>
		<td>
			<span v-if="file.type === 'file'">{{ uploadDate }}</span>
		</td>
		<td class="text-right">
			<div v-if="file.type === 'file'" class="d-inline-flex">
				<div class="dropleft">
					<div
						v-if="loadingSpinner()"
						class="spinner-border"
						role="status"
					></div>
					<button
						v-else
						class="btn btn-white btn-actions"
						type="button"
						aria-haspopup="true"
						aria-expanded="false"
						v-on:click="toggleDropdown"
					>
						<svg
							width="4"
							height="16"
							viewBox="0 0 4 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.2 1.6C3.2 2.48366 2.48366 3.2 1.6 3.2C0.716344 3.2 0 2.48366 0 1.6C0 0.716344 0.716344 0 1.6 0C2.48366 0 3.2 0.716344 3.2 1.6Z"
								fill="#7C8794"
							/>
							<path
								d="M3.2 8C3.2 8.88366 2.48366 9.6 1.6 9.6C0.716344 9.6 0 8.88366 0 8C0 7.11634 0.716344 6.4 1.6 6.4C2.48366 6.4 3.2 7.11634 3.2 8Z"
								fill="#7C8794"
							/>
							<path
								d="M1.6 16C2.48366 16 3.2 15.2837 3.2 14.4C3.2 13.5163 2.48366 12.8 1.6 12.8C0.716344 12.8 0 13.5163 0 14.4C0 15.2837 0.716344 16 1.6 16Z"
								fill="#7C8794"
							/>
						</svg>
					</button>
					<div class="dropdown-menu shadow show" v-if="dropdownOpen">
						<button class="dropdown-item action p-3" v-on:click="openModal">
							<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-eye mr-2 ml-1" viewBox="0 0 16 16">
								<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
								<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
							</svg>
							Details
						</button>
						<button
							class="dropdown-item action p-3"
							v-on:click="download"
						>
							<svg
								width="1.2em"
								height="1.2em"
								viewBox="0 0 16 16"
								class="bi bi-cloud-download mr-2 ml-1"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
								/>
								<path
									fill-rule="evenodd"
									d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
								/>
							</svg>
							Download
						</button>
						<button
							class="dropdown-item action p-3"
							v-on:click="share"
						>
							<svg
								width="1.5em"
								height="1.5em"
								viewBox="0 0 16 16"
								class="bi bi-link-45deg mr-1"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
								/>
								<path
									d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"
								/>
							</svg>
							{{ shareText }}
						</button>
						<button
							v-if="!deleteConfirmation"
							class="dropdown-item action p-3"
							v-on:click="confirmDeletion"
						>
							<svg
								width="1.5em"
								height="1.5em"
								viewBox="0 0 16 16"
								class="bi bi-x mr-1"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
								/>
							</svg>
							Delete
						</button>
						<div v-else>
							<p class="deletion-confirmation px-3 pt-3">
								Are you sure?
							</p>
							<div class="d-flex">
								<button
									class="dropdown-item trash p-3 action"
									v-on:click="finalDelete"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="red"
										class="bi bi-trash"
										viewBox="0 0 16 16"
									>
										<path
											d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
										/>
										<path
											fill-rule="evenodd"
											d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
										/>
									</svg>
									Yes
								</button>
								<button
									class="dropdown-item p-3 action"
									v-on:click="cancelDeletion"
								>
									<svg
										width="1.5em"
										height="1.5em"
										viewBox="0 0 16 16"
										class="bi bi-x mr-1"
										fill="green"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
										/>
									</svg>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-else>
				<div class="dropleft">
					<div
						v-if="loadingSpinner()"
						class="spinner-border"
						role="status"
					></div>
					<button
						v-else
						class="btn btn-white btn-actions"
						type="button"
						aria-haspopup="true"
						aria-expanded="false"
						v-on:click="toggleDropdown"
					>
						<svg
							width="4"
							height="16"
							viewBox="0 0 4 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.2 1.6C3.2 2.48366 2.48366 3.2 1.6 3.2C0.716344 3.2 0 2.48366 0 1.6C0 0.716344 0.716344 0 1.6 0C2.48366 0 3.2 0.716344 3.2 1.6Z"
								fill="#7C8794"
							/>
							<path
								d="M3.2 8C3.2 8.88366 2.48366 9.6 1.6 9.6C0.716344 9.6 0 8.88366 0 8C0 7.11634 0.716344 6.4 1.6 6.4C2.48366 6.4 3.2 7.11634 3.2 8Z"
								fill="#7C8794"
							/>
							<path
								d="M1.6 16C2.48366 16 3.2 15.2837 3.2 14.4C3.2 13.5163 2.48366 12.8 1.6 12.8C0.716344 12.8 0 13.5163 0 14.4C0 15.2837 0.716344 16 1.6 16Z"
								fill="#7C8794"
							/>
						</svg>
					</button>
					<div class="dropdown-menu shadow show" v-if="dropdownOpen">
						<button
							v-if="!deleteConfirmation"
							class="dropdown-item action p-3"
							v-on:click="confirmDeletion"
						>
							<svg
								width="1.5em"
								height="1.5em"
								viewBox="0 0 16 16"
								class="bi bi-x mr-1"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
								/>
							</svg>
							Delete
						</button>
						<div v-else>
							<p class="deletion-confirmation px-3 pt-3">
								Are you sure?
							</p>
							<div class="d-flex">
								<button
									class="dropdown-item trash p-3 action"
									v-on:click="finalDelete"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="red"
										class="bi bi-trash"
										viewBox="0 0 16 16"
									>
										<path
											d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
										/>
										<path
											fill-rule="evenodd"
											d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
										/>
									</svg>
									Yes
								</button>
								<button
									class="dropdown-item p-3 action"
									v-on:click="cancelDeletion"
								>
									<svg
										width="1.5em"
										height="1.5em"
										viewBox="0 0 16 16"
										class="bi bi-x mr-1"
										fill="green"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
										/>
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
import prettyBytes from "pretty-bytes";

export default {
	props: ["path", "file"],
	data: () => ({
		shareText: "Copy Link",
		deleteConfirmation: false,
		isSelected: false
	}),

	computed: {
		filename() {
			return this.file.Key.length > 25
				? this.file.Key.slice(0, 25) + "..."
				: this.file.Key;
		},
		size() {
			return prettyBytes(this.file.Size);
		},
		uploadDate() {
			return this.file.LastModified.toLocaleString().split(",")[0];
		},
		dropdownOpen() {
			return this.$store.state.files.openedDropdown === this.file.Key;
		},
		link() {
			return (
				this.$store.state.files.browserRoot +
				this.$store.state.files.path +
				this.file.Key +
				"/"
			);
		}
	},

	methods: {
		openModal() {
			this.$store.commit("files/openModal", this.path + this.file.Key);
		},

		loadingSpinner() {
			return !!this.$store.state.files.filesToBeDeleted.find(
				file => file === this.file
			);
		},
		fileClick(event) {
			event.stopPropagation();
			this.$store.dispatch("files/updateCreateFolderInputShow", false);
		},
		isFileSelected() {
			return (
				this.$store.state.files.selectedFile === this.file ||
				this.$store.state.files.shiftSelectedFiles.find(
					file => file === this.file
				)
			);
		},
		selectFile(event) {
			event.stopPropagation();

			// close the openDropdown
			if (this.$store.state.files.openedDropdown) {
				this.$store.dispatch("files/openDropdown", null);
			}

			// if shift key was held
			if (event.shiftKey) {
				this.setShiftSelectedFiles();

				// if it was only a click
			} else {
				this.$store.dispatch("files/updateSelectedFile", this.file);
			}
		},
		setShiftSelectedFiles() {
			const files = this.$store.getters["files/sortedFiles"];
			const selectedFile = this.$store.state.files.selectedFile;

			if (!selectedFile) {
				this.$store.dispatch("files/updateSelectedFile", this.file);
				return;
			}

			const anchorIdx = files.findIndex(file => file === selectedFile);
			const shiftIdx = files.findIndex(file => file === this.file);

			const start = Math.min(anchorIdx, shiftIdx);
			const end = Math.max(anchorIdx, shiftIdx) + 1;

			this.$store.dispatch(
				"files/updateShiftSelectedFiles",
				files.slice(start, end)
			);
		},
		async share(event) {
			event.stopPropagation();

			const url = await this.$store.state.files.getSharedLink(
				this.path + this.file.Key
			);

			await navigator.clipboard.writeText(url);
			this.shareText = "URL Copied!";

			// time until the dropdown is closed and the text in the share portion of dropdown gets reset
			setTimeout(() => {
				this.$store.dispatch("files/openDropdown", null);
				this.shareText = "Copy Link";
			}, 700);
		},
		toggleDropdown(event) {
			event.stopPropagation();

			if (this.$store.state.files.openedDropdown === this.file.Key) {
				this.$store.dispatch("files/openDropdown", null);
			} else {
				this.$store.dispatch("files/openDropdown", this.file.Key);
			}

			// remove the dropdown delete confirmation
			this.deleteConfirmation = false;
		},
		download(event) {
			event.stopPropagation();

			this.$store.dispatch("files/download", file);
			this.$store.dispatch("files/openDropdown", null);
			this.deleteConfirmation = false;
		},
		confirmDeletion(event) {
			event.stopPropagation();
			this.deleteConfirmation = true;
		},
		async finalDelete(event) {
			event.stopPropagation();
			this.$store.dispatch("files/openDropdown", null);
			this.$store.dispatch("files/updatePreventRefresh", true);
			this.$store.dispatch("files/addFileToBeDeleted", this.file);

			const params = {
				path: this.path,
				file: this.file
			};

			if (this.file.type === "file") {
				await this.$store.dispatch("files/delete", params);
			} else {
				this.$store.dispatch("files/deleteFolder", params);
			}

			// refresh the files displayed
			await this.$store.dispatch("files/list");
			this.$store.dispatch("files/updatePreventRefresh", false);
			this.$store.dispatch("files/removeFileFromToBeDeleted", this.file);
			this.deleteConfirmation = false;
		},
		cancelDeletion(event) {
			event.stopPropagation();
			this.$store.dispatch("files/openDropdown", null);
			this.deleteConfirmation = false;
		}
	}
};
</script>
