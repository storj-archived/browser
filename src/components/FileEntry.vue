<style>
.table td {
	padding: 16px 16px 16px 0 !important;
	white-space: nowrap;
	vertical-align: middle;
}

.table-hover tbody tr:hover {
	background-color: #e9ecf4 !important;
	cursor: pointer;
}

.btn-actions {
	padding-top: 0;
	padding-bottom: 0;
}

.dd-menu {
	padding: 10px 0 !important;
    right: 15px !important;
    top: 15px !important;
    min-width: 170px !important;
    margin-right: 0 !important;
}

.dropdown-item {
	font-size: 14px;
	font-family: 'Inter', sans-serif;
}

.dropdown-item svg {
	color: #768394;
}

.dropdown-item:focus,
.dropdown-item:hover {
	color: #1B2533;
	background-color: #F4F5F7;
	font-weight: bold;
}

.dropdown-item:focus svg,
.dropdown-item:hover svg {
	color: #0068DC;
}

.deletion-confirmation {
	font-size: 14px;
	font-weight: bold;
}

.border-grey {
    border-left: 2px solid #f5f6fa;
    border-right: 2px solid #f5f6fa;
    border-radius: 6px;
}

.selected {
    background-color: #e9ecf4;
    border: 2px solid #0068DC;
}

.mt {
   margin-top: -5px;
}

</style>

<template>
<tr scope="row" class="py-1 border-grey" :class="{'selected': isFileSelected()}" @click="selectFile">
	<td class="name" data-ls-disabled>
<!--		<span v-if="file.type === 'folder'">-->
<!--			<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder ml-2 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">-->
<!--				<path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />-->
<!--				<path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />-->
<!--			</svg>-->

<!--			<router-link :to="link">-->
<!--				<span class="ml-1">{{filename}}</span>-->
<!--			</router-link>-->

<!--		</span>-->

		<p class="flex-row align-items-center mb-0">
            <svg class="mr-2 ml-4" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-outside-1" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="22" fill="black">
                    <rect fill="white" width="18" height="22"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4118 1H2C1.44772 1 1 1.44772 1 2V20C1 20.5523 1.44771 21 2 21H15.2941C15.8464 21 16.2941 20.5523 16.2941 20V6.88243H12.7647C11.4652 6.88243 10.4118 5.82899 10.4118 4.52949V1ZM16.0679 5.70596L11.5882 1.22635V4.52949C11.5882 5.17924 12.115 5.70596 12.7647 5.70596H16.0679Z"/>
                </mask>
                <path d="M10.4118 1H11.4118C11.4118 0.447715 10.9641 0 10.4118 0V1ZM16.2941 6.88243H17.2941C17.2941 6.33015 16.8464 5.88243 16.2941 5.88243V6.88243ZM16.0679 5.70596V6.70596C16.4723 6.70596 16.837 6.46232 16.9917 6.08864C17.1465 5.71497 17.061 5.28485 16.775 4.99885L16.0679 5.70596ZM11.5882 1.22635L12.2953 0.519238C12.0093 0.23324 11.5792 0.147685 11.2056 0.302466C10.8319 0.457247 10.5882 0.821883 10.5882 1.22635H11.5882ZM10.4118 0H2V2H10.4118V0ZM2 0C0.89543 0 0 0.895431 0 2H2L2 2V0ZM0 2V20H2V2H0ZM0 20C0 21.1046 0.895429 22 2 22V20H2H0ZM2 22H15.2941V20H2V22ZM15.2941 22C16.3987 22 17.2941 21.1046 17.2941 20H15.2941V22ZM17.2941 20V6.88243H15.2941V20H17.2941ZM16.2941 5.88243H12.7647V7.88243H16.2941V5.88243ZM12.7647 5.88243C12.0175 5.88243 11.4118 5.2767 11.4118 4.52949H9.41177C9.41177 6.38127 10.9129 7.88243 12.7647 7.88243V5.88243ZM11.4118 4.52949V1H9.41177V4.52949H11.4118ZM16.775 4.99885L12.2953 0.519238L10.8811 1.93345L15.3607 6.41307L16.775 4.99885ZM12.5882 4.52949V1.22635H10.5882V4.52949H12.5882ZM12.7647 4.70596C12.6672 4.70596 12.5882 4.62695 12.5882 4.52949H10.5882C10.5882 5.73152 11.5627 6.70596 12.7647 6.70596V4.70596ZM16.0679 4.70596H12.7647V6.70596H16.0679V4.70596Z" fill="#768394" mask="url(#path-1-outside-1)"/>
            </svg>

			{{filename}}
		</p>
	</td>
	<td class="size">
		<span v-if="file.type === 'file'">{{size}}</span>
	</td>
	<td class="date">
		<span v-if="file.type === 'file'">{{uploadDate}}</span>
	</td>
	<td class="text-right">
		<div v-if="file.type === 'file'">
			<div class="dropleft">
				<div v-if="loadingSpinner()" class="spinner-border" role="status"></div>
				<button v-else class="btn btn-white btn-actions px-2 py-0 mt" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="toggleDropdown">
					<svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.2 1.6C3.2 2.48366 2.48366 3.2 1.6 3.2C0.716344 3.2 0 2.48366 0 1.6C0 0.716344 0.716344 0 1.6 0C2.48366 0 3.2 0.716344 3.2 1.6Z" fill="#7C8794" />
						<path d="M3.2 8C3.2 8.88366 2.48366 9.6 1.6 9.6C0.716344 9.6 0 8.88366 0 8C0 7.11634 0.716344 6.4 1.6 6.4C2.48366 6.4 3.2 7.11634 3.2 8Z" fill="#7C8794" />
						<path d="M1.6 16C2.48366 16 3.2 15.2837 3.2 14.4C3.2 13.5163 2.48366 12.8 1.6 12.8C0.716344 12.8 0 13.5163 0 14.4C0 15.2837 0.716344 16 1.6 16Z" fill="#7C8794" />
					</svg>
				</button>
				<div class="dropdown-menu dd-menu shadow show" v-if="dropdownOpen">
					<button class="dropdown-item action p-3" v-on:click="download">
						<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-cloud-download mr-2 ml-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
							<path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
						</svg>
						Download
					</button>
					<button class="dropdown-item action p-3" v-on:click="share">
						<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-link-45deg mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
							<path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
						</svg>
						{{shareText}}
					</button>
					<button v-if="!deleteConfirmation" class="dropdown-item action p-3" v-on:click="confirmDeletion">
						<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</svg>
						Delete
					</button>
					<div v-else>
						<p class="deletion-confirmation px-3 pt-3 text-center">Are you sure?</p>
						<div class="d-flex">
							<button class="dropdown-item trash p-3 action" v-on:click="finalDelete">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
									<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
								</svg>
								Yes
							</button>
							<button class="dropdown-item p-3 action" v-on:click="cancelDeletion">
								<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="green" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
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
				<div v-if="loadingSpinner()" class="spinner-border" role="status"></div>
				<button v-else class="btn btn-white btn-actions" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="toggleDropdown">
					<svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.2 1.6C3.2 2.48366 2.48366 3.2 1.6 3.2C0.716344 3.2 0 2.48366 0 1.6C0 0.716344 0.716344 0 1.6 0C2.48366 0 3.2 0.716344 3.2 1.6Z" fill="#7C8794" />
						<path d="M3.2 8C3.2 8.88366 2.48366 9.6 1.6 9.6C0.716344 9.6 0 8.88366 0 8C0 7.11634 0.716344 6.4 1.6 6.4C2.48366 6.4 3.2 7.11634 3.2 8Z" fill="#7C8794" />
						<path d="M1.6 16C2.48366 16 3.2 15.2837 3.2 14.4C3.2 13.5163 2.48366 12.8 1.6 12.8C0.716344 12.8 0 13.5163 0 14.4C0 15.2837 0.716344 16 1.6 16Z" fill="#7C8794" />
					</svg>
				</button>
				<div class="dropdown-menu shadow show" v-if="dropdownOpen">
					<button v-if="!deleteConfirmation" class="dropdown-item action p-3" v-on:click="confirmDeletion">
						<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</svg>
						Delete
					</button>
					<div v-else>
						<p class="deletion-confirmation px-3 pt-3">Are you sure?</p>
						<div class="d-flex">
							<button class="dropdown-item trash p-3 action" v-on:click="finalDelete">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
									<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
								</svg>
								Yes
							</button>
							<button class="dropdown-item p-3 action" v-on:click="cancelDeletion">
								<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="green" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
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
	props: [
		"path",
		"file"
	],
	data: () => ({
		shareText: "Copy Link",
		deleteConfirmation: false,
		isSelected: false,
	}),

	computed: {
		filename() {
			return this.file.Key.length > 25 ? this.file.Key.slice(0, 25) + "..." : this.file.Key;
		},
		size() {
			return prettyBytes(this.file.Size);
		},
		uploadDate() {
			return this.file.LastModified.toUTCString();
		},
		dropdownOpen() {
			return this.$store.state.openedDropdown === this.file.Key;
		},
		link() {
			return this.$store.state.files.path + this.file.Key + "/";
		}
	},

	methods: {
		loadingSpinner() {
			return !!this.$store.state.files.filesToBeDeleted.find((file) => file === this.file);
		},
		fileClick(event) {
			event.stopPropagation();
			this.$emit("go", this.file.Key + "/");
		},
		isFileSelected() {
			return this.$store.state.files.selectedFile === this.file ||
			this.$store.state.files.shiftSelectedFiles.find((file) => file === this.file);
		},
		selectFile(event) {
			event.stopPropagation();

			if (this.$store.state.openedDropdown) {
				this.$store.dispatch("openDropdown", null);
			}

			if (event.shiftKey) {
				this.$store.dispatch("files/addToShiftSelectedFiles", this.file);
			} else {
				this.$store.dispatch("files/updateSelectedFile", this.file);
			}
		},
		async share(event) {
			event.stopPropagation();
			this.$emit("share");

			const url = this.$store.state.files.s3.getSignedUrl("getObject", {
				Bucket: this.$store.state.files.bucket,
				Key: this.path + this.file.Key,
				Expires: 60 * 60 * 24
			});

			await navigator.clipboard.writeText(url);
			this.shareText = "URL Copied!";

			setTimeout(() => {
				this.$store.dispatch("openDropdown", null);
				this.shareText = "Copy Link";
			}, 700);
		},
		toggleDropdown(event) {
			event.stopPropagation();

			if (this.$store.state.openedDropdown === this.file.Key) {
				this.$store.dispatch("openDropdown", null);
			} else {
				this.$store.dispatch("openDropdown", this.file.Key);
			}

			this.deleteConfirmation = false;
		},
		download(event) {
			event.stopPropagation();
			this.$emit("download");
			this.$store.dispatch("openDropdown", null);
			this.deleteConfirmation = false;
		},
		confirmDeletion(event) {
			event.stopPropagation();
			this.deleteConfirmation = true;
		},
		async finalDelete(event) {
			event.stopPropagation();

			try {
                await this.$store.dispatch("openDropdown", null);
                await this.$store.dispatch("files/updatePreventRefresh", true);
                await this.$store.dispatch("files/addFileToBeDeleted", this.file);

                await this.$store.dispatch("files/delete", {
                    path: this.path, file: this.file
                });

                await this.$store.dispatch("files/list");
                await this.$store.dispatch("files/updatePreventRefresh", false);
                await this.$store.dispatch("files/removeFileFromToBeDeleted", this.file);
                this.deleteConfirmation = false;
            } catch (e) {
			    console.log(e.message)
            }

			// if(this.file.type === "file") {
			// 	await this.$store.dispatch("files/delete", {
			// 		path: this.path, file: this.file
			// 	});
			// } else {
			// 	await this.$store.dispatch("files/deleteFolder", {
			// 		path: this.path,
			// 		file: this.file
			// 	});
			// }
		},
		cancelDeletion(event) {
			event.stopPropagation();
			this.$store.dispatch("openDropdown", null);
			this.deleteConfirmation = false;
		}
	}
};
</script>
