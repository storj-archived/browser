<style scoped>

@import "../../public/bootstrap.min.css";

tbody {
	user-select: none;
}

.background {
    background-color: #f5f6fa;
}

.table-heading {
	color: #768394;
	border-top: 0;
	border-bottom: 1px solid #dee2e6;
	padding: 0 0 10px 0 !important;
    cursor: pointer;
}

.path {
	font-size: 18px;
	font-weight: 700;
}

.upload-help {
	font-size: 1.75rem;
	text-align: center;
	margin-top: 1.5rem;
	color: #93a1ae;
	border: 2px dashed #bec4cd;
	border-radius: 10px;
	padding: 80px 20px;
	background: #fafafb;
}

.metric {
	color: #444;
}

.div-responsive {
	min-height: 400px;
}

.dropdown-arrow {
	cursor: pointer;
	color: #768394;
}

.name {
    width: 60%;
    padding-left: 24px !important;
}

.size {
    width: 15%;
}

.date {
    width: 15%;
}

</style>

<template>
<div class="row background">
	<div class="col-sm-12">
		<div class="card card-top-flat border-0 py-4 px-5 background">
			<div class="div-responsive" v-cloak @drop.prevent="upload" @dragover.prevent>

				<div class="row mb-4 mx-0 justify-content-end">

<!--					<div class="col-sm-12 col-md-4 col-xl-8 mb-3">-->
<!--						<bread-crumbs></bread-crumbs>-->
<!--					</div>-->

					<div>
						<input ref="fileInput" type="file" hidden multiple v-on:change="upload">
						<button class="btn btn-primary px-3 py-2" v-on:click="buttonUpload">
                            <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.49407 0.453655L7.49129 0.450658L2.40012 5.94819L3.53149 7.16987L7.20001 3.20854L7.20001 11.6808H8.80001V3.39988L12.2913 7.16983L13.4227 5.94815L7.91419 0L7.49407 0.453655Z" fill="white"/>
                                <path d="M16 14.2723H0V16H16V14.2723Z" fill="white"/>
                            </svg>
                            Upload File
						</button>
					</div>

<!--					<div class="col-sm-12 col-md-4 col-xl-2 mb-3">-->
<!--						<button class="btn btn-light btn-block" v-on:click="createFolderInputShow = !createFolderInputShow" style="margin-right: 15px">-->
<!--							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus mr-2" viewBox="0 0 16 16">-->
<!--								<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z" />-->
<!--								<path fill-rule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />-->
<!--							</svg>-->
<!--							New Folder-->
<!--						</button>-->
<!--					</div>-->
				</div>

				<div>
					<table class="table table-hover">
						<thead>
							<tr>
								<th v-on:mouseover="mouseOverHandler('name')" v-on:mouseleave="mouseLeaveHandler('name')" v-on:click="sortTable('name')" class="table-heading name" scope="col">Name
									<a class="dropdown-arrow" v-if="headingSorted === 'name' && orderBy === 'asc'">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
										</svg>
									</a>
									<a class="dropdown-arrow" v-else>
										<svg v-if="nameHover" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-down-short down-arrow" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
										</svg>
									</a>
								</th>
								<th v-on:mouseover="mouseOverHandler('size')" v-on:mouseleave=" mouseLeaveHandler('size')" v-on:click="sortTable('size')" class="table-heading size" scope="col">Size
									<a class="dropdown-arrow" v-if="headingSorted === 'size' && orderBy === 'asc'">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
										</svg>
									</a>
									<a class="dropdown-arrow" v-else>
										<svg v-if="sizeHover" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-down-short down-arrow" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
										</svg>
									</a>
								</th>
								<th v-on:mouseover="mouseOverHandler('date')" v-on:mouseleave="mouseLeaveHandler('date')" v-on:click="sortTable('date')" class="table-heading date" scope="col">Date Added
									<a class="dropdown-arrow" v-if="headingSorted === 'date' && orderBy === 'asc'">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
										</svg>
									</a>
									<a class="dropdown-arrow" v-else>
										<svg v-if="dateHover" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-down-short down-arrow" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
										</svg>
									</a>
								</th>
								<th class="table-heading" scope="col">
<!--									<div class="dropleft">-->
<!--										<a class="d-flex justify-content-end" v-if="areThereFilesToDelete()" v-on:click="deleteSelectedDropdown">-->
<!--											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">-->
<!--												<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>-->
<!--												<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>-->
<!--											</svg>-->
<!--										</a>-->
<!--										<div v-if="displayDropdown()" class="dropdown-menu shadow show">-->
<!--											<div>-->
<!--												<p class="deletion-confirmation px-3 pt-3">Are you sure?</p>-->
<!--												<div class="d-flex">-->
<!--													<button class="dropdown-item trash p-3 action" v-on:click="confirmDeleteSelection">-->
<!--														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">-->
<!--															<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>-->
<!--															<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>-->
<!--														</svg>-->
<!--														Yes-->
<!--													</button>-->
<!--													<button class="dropdown-item p-3 action" v-on:click="cancelDeleteSelection">-->
<!--														<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x mr-1" fill="green" xmlns="http://www.w3.org/2000/svg">-->
<!--															<path fill-rule="evenodd"-->
<!--															d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />-->
<!--														</svg>-->
<!--														No-->
<!--													</button>-->
<!--												</div>-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->


									<!-- <span v-else class="">
										Are you sure?
										<div class="">
											<button class="btn btn-sm" v-on:click="">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="" viewBox="0 0 16 16">
													<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
													<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
												</svg>
												Yes
											</button>
											<button class="btn btn-sm" v-on:click="">
												<svg width="16" height="16" viewBox="0 0 16 16" class="" fill="green" xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd"
													d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
												</svg>
												No
											</button>
										</div>
									</span> -->
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="file in filesUploading" v-bind:key="file.ETag" scope="row">
								<td class="upload-text">
									<span>
										<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-file-earmark ml-2 mr-1">
											<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"></path>
											<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"></path>
										</svg>
										{{filename(file)}}
									</span>
								</td>
								<td>
									<div class="progress">
										<div class="progress-bar" role="progressbar" v-bind:style="{width: `${file.progress}%`}">{{file.progress}}%</div>
									</div>
								</td>
								<td></td>
								<td>
									<div class="spinner-border" role="status">
										<span class="sr-only">Loading...</span>
									</div>
								</td>
							</tr>

<!--							<tr v-if="path.length > 0">-->
<!--								<td>-->
<!--									<router-link to="../">-->
<!--										<a href="javascript:null" v-on:click="back">..</a>-->
<!--									</router-link>-->
<!--								</td>-->
<!--							</tr>-->

<!--							<tr v-if="createFolderInputShow === true">-->
<!--								<td span="3">-->
<!--									<input class="form-control" type="text" placeholder="Name of the folder" v-model="createFolderInput" v-on:keypress.enter="createFolder">-->
<!--								</td>-->
<!--								<td span="3">-->
<!--								</td>-->
<!--								<td span="3">-->
<!--									<button v-on:click="createFolder" v-bind:disabled="!createFolderEnabled" class="btn btn-primary">Save Folder</button>-->
<!--								</td>-->
<!--							</tr>-->


<!--							<file-entry v-for="file in files.filter(f => f.type === 'folder')" v-bind:path="path" v-bind:file="file" v-on:download="download(file)" v-on:go="go" v-bind:key="file.Key"></file-entry>-->
							<file-entry v-for="file in files.filter(f => f.type === 'file')" v-bind:path="path" v-bind:file="file" v-on:download="download(file)" v-on:delete="del(file)" v-on:go="go" v-bind:key="file.Key"></file-entry>
						</tbody>
					</table>
				</div>

				<div v-if="!files.length || (files.length === 1 && files[0].Key === '.vortex_placeholder')" class="upload-help">
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.8616 1.02072L16.8554 1.01398L5.40027 13.3834L7.94585 16.1322L16.2 7.2192V26.2817H19.8V7.64972L27.6554 16.1321L30.201 13.3833L17.8069 0L16.8616 1.02072Z" fill="#93A1AF" />
						<path d="M36 32.1127H0V36H36V32.1127Z" fill="#93A1AF" />
					</svg>
					<h4 class="mt-4">Drop Files Here to Upload</h4>
				</div>

			</div>
		</div>
	</div>
</div>
</template>

<script>
import FileEntry from "./FileEntry.vue";
// import BreadCrumbs from "./BreadCrumbs.vue";

export default {
	data: () => ({
		// createFolderInput: "",
		// createFolderInputShow: false,
		nameHover: false,
		sizeHover: false,
		dateHover: false,
		headingSorted: null,
		orderBy: "desc",
		deleteConfirmation: false,
	}),
	computed: {
		// createFolderEnabled() {
		// 	return this.createFolderInput.trim().length > 0 &&
		// 		this.createFolderInput.indexOf("/") === -1 && [...this.createFolderInput].filter((char) => char === ".").length !== this.createFolderInput.length &&
		// 		this.files.filter(file => file.Key === this.createFolderInput.trim()).length === 0;
		// },
		path() {
			return this.$store.state.files.path;
		},
		files() {
			return this.$store.state.files.files;
		},
		filesUploading() {
			return this.$store.state.files.uploading;
		},
		routePath() {
			return this.$route.params.pathMatch;
		}
	},
	watch: {
		async routePath() {
			await this.goToRoutePath();
		}
	},

	beforeMount() {
		window.addEventListener("beforeunload", this.preventNav);
		this.$once("hook:beforeDestroy", () => {
			window.removeEventListener("beforeunload", this.preventNav);
		});
	},

    mounted() {
	    console.log(this.files)
    },

	beforeRouteLeave(to, from, next) {
		if (this.$store.state.files.preventRefresh) {
			if (window.confirm("Navigating to another page will stop files from being uploaded. Would you like to wait for the files to finish uploading?")) {
				return;
			}
		}
		next();
	},

	methods: {
		deleteSelectedDropdown(event) {
			event.stopPropagation();
			this.$store.dispatch("openDropdown", "FileBrowser");
		},
		confirmDeleteSelection() {
			this.$store.dispatch("files/deleteSelected");
			this.$store.dispatch("openDropdown", null);
		},
		cancelDeleteSelection() {
			this.$store.dispatch("openDropdown", null);
		},
		displayDropdown() {
			return this.$store.state.openedDropdown === "FileBrowser";
		},
		areThereFilesToDelete() {
			return !!this.$store.state.files.selectedFile;
		},
		preventNav(event) {
			if (!this.$store.state.files.preventRefresh) return;
			event.preventDefault();
			// Chrome requires returnValue to be set.
			event.returnValue = "";
		},
		filename(file) {
			return file.Key.length > 25 ? file.Key.slice(0, 25) + "..." : file.Key;
		},
		async upload(e) {
			await this.$store.dispatch("files/upload", e);
			e.target.value = "";
		},

		async download(file) {
			const url = this.$store.state.files.s3.getSignedUrl("getObject", {
				Bucket: this.$store.state.files.bucket,
				Key: this.path + file.Key
			});

			const downloadURL = function(data, fileName) {
				var a;
				a = document.createElement("a");
				a.href = data;
				a.download = fileName;
				document.body.appendChild(a);
				a.style = "display: none";
				a.click();
				a.remove();
			};

			downloadURL(url, file.Key);
		},

		async list(path) {
			await this.$store.dispatch("files/list", path, {
				root: true
			});
		},

		async go(path) {
			await this.$store.dispatch("openDropdown", null);
			await this.list(this.path + path);
		},

		async goToRoutePath() {
			if(typeof this.routePath === "string") {
				await this.$store.dispatch("openDropdown", null);
				await this.list(this.routePath);
			}
		},

		async back() {
			await this.$store.dispatch("openDropdown", null);
			await this.$store.dispatch("files/back");
		},

		async buttonUpload() {
			const fileInputElement = this.$refs.fileInput;
			fileInputElement.click();
		},

		// async createFolder() {
		// 	if (!this.createFolderEnabled) return;
		// 	await this.$store.dispatch("files/createFolder", this.createFolderInput.trim());
        //
		// 	this.createFolderInput = "";
		// 	this.createFolderInputShow = false;
		// },

		sortTable(heading) {
			["name", "size", "date"].forEach((category) => {
				if (category !== heading) this[category + "Hover"] = false;
			});

			if (this.headingSorted === heading) {
				this.orderBy = this.orderBy === "desc" ? "asc" : "desc";
				this.$store.dispatch("files/sortAllFiles", {
					heading,
					order: this.orderBy
				});
			} else {
				this.headingSorted = heading;
				this.orderBy = "desc";
				this.$store.dispatch("files/sortAllFiles", {
					heading,
					order: this.orderBy
				});
			}
		},

		mouseOverHandler(heading) {
			if (this.headingSorted !== heading) {
				if (heading === "name") this.nameHover = true;
				if (heading === "size") this.sizeHover = true;
				if (heading === "date") this.dateHover = true;
			}
		},

		mouseLeaveHandler(heading) {
			if (this.headingSorted !== heading) {
				if (heading === "name") this.nameHover = false;
				if (heading === "size") this.sizeHover = false;
				if (heading === "date") this.dateHover = false;
			}
		},
	},
	async created() {
		if(!this.routePath) {
			try {
				await this.$router.push({
					path: `${this.$store.state.files.browserRoot}${this.path}`
				});
			} catch(err) {
				await this.list("");
			}
		}
	},
	components: {
		FileEntry,
		// BreadCrumbs
	}
};
</script>
