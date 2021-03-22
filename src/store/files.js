import AWS from 'aws-sdk';
const listCache = new Map();

export default {
	namespaced: true,
	state: {
		s3: null,
		path: "",
		bucket: "",
		browserRoot: "/",
		files: [],
		uploading: [],
		preventRefresh: false,
		selectedFile: null,
		shiftSelectedFiles: [],
		filesToBeDeleted: [],
		getSharedLink: null,
		getObjectLocations: null,
		openedDropdown: null,
		headingSorted: "name",
		orderBy: "desc",
		createFolderInputShow: false,
	},
	getters: {
		sortedFiles(state) {
			const files = [...state.files];
			const order = state.orderBy;
			const heading = state.headingSorted;

			if (order === "asc") {
				if (heading === "date") {
					files.sort((a, b) => new Date(a.LastModified) - new Date(b.LastModified));
				} else if (heading === "name") {
					files.sort((a, b) => a.Key.localeCompare(b.Key));
				} else {
					files.sort((a, b) => a[heading] - b[heading]);
				}
			} else {
				if (heading === "date") {
					files.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
				} else if (heading === "name") {
					files.sort((a, b) => b.Key.localeCompare(a.Key));
				} else {
					files.sort((a, b) => b[heading] - a[heading]);
				}
			}

			const sortedFiles = [...files.filter((file) => file.type === "folder"), ...files.filter((file) => file.type === "file")];

			return sortedFiles;
		}
	},
	mutations: {
		init(state, {
			accessKey,
			secretKey,
			bucket,
			endpoint = "https://gateway.tardigradeshare.io",
			browserRoot,
			getSharedLink = () => "javascript:null",
			getObjectLocations = () => [{"Latitude":45.5248,"Longitude":-122.6789}]
		}) {
			const s3Config = {
				accessKeyId: accessKey,
				secretAccessKey: secretKey,
				endpoint,
				s3ForcePathStyle: true,
				signatureVersion: "v4"
			};

			state.s3 = new AWS.S3(s3Config);
			state.bucket = bucket;
			state.browserRoot = browserRoot;
			state.getSharedLink = getSharedLink;
			state.getObjectLocations = getObjectLocations;
		},

		updateFiles(state, {
			path,
			files
		}) {
			state.path = path;
			state.files = files;
		},

		setPreventRefresh(state, flag) {
			state.preventRefresh = flag;
		},

		setSelectedFile(state, file) {
			state.selectedFile = file;
			state.shiftSelectedFiles = [];
		},

		setFilesToBeDeleted(state, files) {
			state.filesToBeDeleted = [...state.filesToBeDeleted, ...files];
		},

		removeFileToBeDeleted(state, file) {
			state.filesToBeDeleted = state.filesToBeDeleted.filter((singleFile) => singleFile.Key !== file.Key);
		},

		removeAllFilesToBeDeleted(state) {
			state.filesToBeDeleted = [];
		},

		removeAllSelectedFiles(state) {
			state.selectedFile = null;
			state.shiftSelectedFiles = [];
		},

		setShiftSelectedFiles(state, files) {
			state.shiftSelectedFiles = files;
		},

		pushUpload(state, file) {
			state.uploading.push(file);
		},

		setProgress(state, {
			Key,
			progress
		}) {
			state.uploading.find(file => file.Key === Key).progress = progress;
		},

		finishUpload(state, Key) {
			state.uploading = state.uploading.filter(file => file.Key !== Key);
		},

		setOpenedDropdown(state, id) {
			state.openedDropdown = id;
		},

		sort(state, {headingSorted, orderBy}) {
			state.headingSorted = headingSorted;
			state.orderBy = orderBy;
		},

		setCreateFolderInputShow(state, value) {
			state.createFolderInputShow = value;
		},
	},
	actions: {
		async list({
			commit,
			state
		}, path) {

			if (typeof path !== "string") {
				path = state.path;
			}

			if (listCache.has(path) === true) {
				commit("updateFiles", {
					path,
					files: listCache.get(path)
				});
			}

			const response = await state.s3.listObjects({
				Bucket: state.bucket,
				Delimiter: "/",
				Prefix: path
			}).promise();

			const {
				Contents,
				CommonPrefixes
			} = response;

			Contents.sort((a, b) => a.LastModified < b.LastModified ? -1 : -1);

			const files = [
				...CommonPrefixes.map(({
					Prefix
				}) => ({
					Key: Prefix.slice(path.length, -1),
					LastModified: new Date(0),
					type: "folder",
				})),
				...Contents.map(file => ({
					...file,
					Key: file.Key.slice(path.length),
					type: "file"
				}))
					.filter(file => file.Key.length > 0)
					.filter(file => file.Key !== ".vortex_placeholder")
			];

			listCache.set(path, files);
			commit("updateFiles", {
				path,
				files
			});
		},

		async back({
			state,
			dispatch
		}) {
			const path = state.path;

			let i = path.length - 2;

			while (path[i - 1] !== "/" && i > 0) {
				i--;
			}

			const newPath = path.slice(0, i);

			dispatch("list", newPath);
		},

		async upload({
			commit,
			state,
			dispatch
		}, e) {
			//dispatch('updatePreventRefresh', true);

			const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

			await Promise.all([...files].map(async file => {
				// Handle duplicate file names
				const fileNames = state.files.map((file) => file.Key);
				let count = 0;
				let fileName = file.name;

				while (fileNames.includes(fileName)) {
					count += 1;

					if (count > 1) {
						fileName = fileName.replace(/\((\d+)\)(.*)/, `(${count})$2`);
					} else {
						fileName = fileName.replace(/([^.]*)(.*)/, `$1 (${count})$2`);
					}
				}

				const params = {
					Bucket: state.bucket,
					Key: state.path + fileName,
					Body: file
				};

				commit("pushUpload", {
					...params,
					progress: 0
				});

				const upload = state.s3.upload({
					...params
				});

				upload.on("httpUploadProgress", progress => {
					commit("setProgress", {
						Key: params.Key,
						progress: Math.round(progress.loaded / progress.total * 100)
					});
				});

				await upload.promise();

				await dispatch("list");

				commit("finishUpload", params.Key);
			}));

			//dispatch('updatePreventRefresh', false);
		},

		async createFolder({
			state,
			dispatch
		}, name) {
			await state.s3.putObject({
				Bucket: state.bucket,
				Key: state.path + name + "/.vortex_placeholder"
			}).promise();

			dispatch("list");
		},

		async delete({ commit, dispatch, state }, { path, file, folder }) {
			await state.s3.deleteObject({
				Bucket: state.bucket,
				Key: path + file.Key
			}).promise();

			if (!folder) {
				await dispatch("list");
				commit("removeFileToBeDeleted", file);
			}
		},

		async deleteFolder({ commit, dispatch, state }, { file, path }) {
			async function recurse(filePath) {
				const {
					Contents,
					CommonPrefixes
				} = await state.s3.listObjects({
					Bucket: state.bucket,
					Delimiter: "/",
					Prefix: filePath,
				}).promise();

				async function thread() {
					while (Contents.length) {
						const file = Contents.pop();

						await dispatch("delete", {
							path: "",
							file,
							folder: true
						});
					}
				}

				await Promise.all([
					thread(),
					thread(),
					thread()
				]);

				for (const {
					Prefix
				} of CommonPrefixes) {
					await recurse(Prefix);
				}
			}

			await recurse(path.length > 0 ? path + file.Key : file.Key + "/");

			commit("removeFileToBeDeleted", file);
			await dispatch("list");
			dispatch("updatePreventRefresh", false);
		},

		async deleteSelected({ dispatch, commit, state }) {
			const filesToDelete = [state.selectedFile, ...state.shiftSelectedFiles];

			commit("setPreventRefresh", true);
			commit("setFilesToBeDeleted", filesToDelete);

			await Promise.all(filesToDelete.map(async (file) => {
				if (file.type === "file") await dispatch("delete", { file, path: state.path });
				else await dispatch("deleteFolder", { file, path: state.path }
				);
			}));

			commit("setPreventRefresh", false);
		},

		async download({ state }, file) {
			const url = state.files.s3.getSignedUrl("getObject", {
				Bucket: state.stargateBucket,
				Key: state.path + file.Key
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

		sortAllFiles({ commit }, { heading, order }) {
			commit("setSelectedFile", null);
			if (heading === "name") commit("sortFiles", { heading: "Key", order });
			else if (heading === "size") commit("sortFiles", { heading: "Size", order });
			else if (heading === "date") commit("sortFiles", { heading: "LastModified", order });
		},

		updatePreventRefresh({
			commit
		}, flag) {
			commit("setPreventRefresh", flag);
		},

		updateSelectedFile({ commit }, file) {
			commit("setSelectedFile", file);
		},

		updateShiftSelectedFiles({ commit }, files) {
			commit("setShiftSelectedFiles", files);
		},

		addFileToBeDeleted({ commit }, file) {
			commit("setFilesToBeDeleted", [file]);
		},

		removeFileFromToBeDeleted({ commit }, file) {
			commit("removeFileToBeDeleted", file);
		},

		clearAllSelectedFiles({ commit }) {
			commit("removeAllSelectedFiles");
		},

		openDropdown({ commit, dispatch }, id) {
			if (id !== "FileBrowser") {
				dispatch("clearAllSelectedFiles");
			}

			commit("setOpenedDropdown", id);
		},

		updateCreateFolderInputShow({ commit }, value) {
			commit("setCreateFolderInputShow", value);
		},
	}
};
