
 S3  "aws-sdk/clients/s3";
 * R "ramda";


 listCache  Map();

 default {
	namespaced: true,
	state: {
		s3: null,
		accessKey: null,

		path: "",
		bucket: "",
		browserRoot: "/",
		files: [],
		uploadChain: Promise.resolve(),
		uploading: [],
		preventRefresh: false,
		selectedFile: null,
		shiftSelectedFiles: [],
		filesToBeDeleted: [],
		getSharedLink: null,
		getObjectMapUrl: null,
		openedDropdown: null,
		headingSorted: "name",
		orderBy: "asc",
		createFolderInputShow: false,
		openModalOnFirstUpload: false,

		modalPath: null,
		fileShareModal: null
	},
	getters: {
		sortedFiles: (state) => {
			// key-specific sort cases
			            
                                    (a, b) 
					  Date(a.LastModified) - new Date(b.LastModified),
				    (a, b)  a.Key.localeCompare(b.Key),
				    (a, b)  a.Size - b.Size
			};

			// sort by appropriate function
			const sortedFiles = R.sort(fns[state.headingSorted], state.files);

			// reverse if descending order
			const orderedFiles =
				state.orderBy === "asc" ? sortedFiles : R.reverse(sortedFiles);

			// display folders and then files
			const groupedFiles = [
				...orderedFiles.filter((file) => file.type === "folder"),
				...orderedFiles.filter((file) => file.type === "file")
			];

			 groupedFiles;
		},

		preSignedUrl: (state) => (url) => {
			 state.s3.getSignedUrl("getObject", {
				Bucket: state.bucket,
				Key: url
			});
		}
	},
	mutations: {
		init(
			state,
			{
				accessKey,
				secretKey,
				bucket,
				endpoint = "https://gateway.tardigradeshare.io",
				browserRoot,
				openModalOnFirstUpload = true,
				getSharedLink = () => "javascript:null",
				getObjectMapUrl = () =>
					new Promise((resolve) =>
						setTimeout(
							() =>
								resolve(
									"https://link.staging.tardigradeshare.io/s/jvgmjntaucpfedohxn3ogdrsfcfa/homepage/TardigradeExplainerVideo.m4v?map=1"
								),
							1000
						)
					)
			}
		) {
			 s3Config = {
				accessKeyId: accessKey,
				secretAccessKey: secretKey,
				endpoint,
				s3ForcePathStyle: true,
				signatureVersion: "v4",
				connectTimeout: 0,
				httpOptions: { timeout: 0 }
			};

			state.s3 = new S3(s3Config);
			state.accessKey = accessKey;
			state.bucket = bucket;
			state.browserRoot = browserRoot;
			state.openModalOnFirstUpload = openModalOnFirstUpload;
			state.getSharedLink = getSharedLink;
			state.getObjectMapUrl = getObjectMapUrl;
			state.path = "";
		},

		updateFiles(state, { path, files }) {
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
			state.filesToBeDeleted = state.filesToBeDeleted.filter(
				(singleFile) => singleFile.Key !== file.Key
			);
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

		setProgress(state, { Key, progress }) {
			state.uploading.find(
				(file) => file.Key === Key
			).progress = progress;
		},

		finishUpload(state, Key) {
			state.uploading = state.uploading.filter(
				(file) => file.Key !== Key
			);
		},

		setOpenedDropdown(state, id) {
			state.openedDropdown = id;
		},

		sort(state, headingSorted) {
			const flip = (orderBy) => (orderBy === "asc" ? "desc" : "asc");

			state.orderBy =
				state.headingSorted === headingSorted
					? flip(state.orderBy)
					: "asc";
			state.headingSorted = headingSorted;
		},

		setCreateFolderInputShow(state, value) {
			state.createFolderInputShow = value;
		},

		openModal(state, path) {
			state.modalPath = path;
		},

		closeModal(state) {
			state.modalPath = null;
		},

		setFileShareModal(state, path) {
			state.fileShareModal = path;
		},

		closeFileShareModal(state) {
			state.fileShareModal = null;
		},

		addUploadToChain(state, fn) {
			state.uploadChain = state.uploadChain.then(fn);
		}
	},
	actions: {
		 list({ commit, state }, path = state.path) {
			 (listCache.has(path) === true) {
				commit("updateFiles", {
					path,
					files: listCache.get(path)
				});
			}

			 response = await state.s3
				.listObjects({
					Bucket: state.bucket,
					Delimiter: "/",
					Prefix: path
				})
				.promise();

			 { Contents, CommonPrefixes } = response;

			Contents.sort((a, b) =>
				a.LastModified < b.LastModified ? -1 : -1
			);

			 prefixToFolder = ({ Prefix }) => ({
				Key: Prefix.slice(path.length, -1),
				LastModified: new Date(0),
				type: "folder"
			});

			 makeFileRelative = (file) => ({
				...file,
				Key: file.Key.slice(path.length),
				type: "file"
			});

			 isFileVisible = (file) =>
				file.Key.length > 0 && file.Key !== ".file_placeholder";

			 files = [
				...CommonPrefixes.map(prefixToFolder),
				...Contents.map(makeFileRelative).filter(isFileVisible)
			];

			listCache.set(path, files);
			commit("updateFiles", {
				path,
				files
			});
		},

		 back({ state, dispatch }) {
			 getParentDirectory = (path) => {
			 i  path.length - 2;

				while (path[i - 1] !== "/" && i > 0) {
					i--;
				}

				return path.slice(0, i);
			};

			dispatch("list", getParentDirectory(state.path));
		},

		 upload({ commit, state, dispatch }, e) {
			 files = e.dataTransfer
				? e.dataTransfer.files
				: e.target.files;

			 fileNames = state.files.map((file) => file.Key);

			 (const file of files) {
				// Handle duplicate file names

				 fileName = file.name;

				 (let count = 1; fileNames.includes(fileName); count++) {
					 (count > 1) {
						fileName = fileName.replace(
							/\((\d+)\)(.*)/,
							`(${count})$2`
						);
					}  {
						fileName = fileName.replace(
							/([^.]*)(.*)/,
							`$1 (${count})$2`
						);
					}
				}

				 params = {
					Bucket: state.bucket,
					Key: state.path + fileName,
					Body: file
				};

				 upload = state.s3.upload(
					{
						...params
					},
					{
						partSize: 64 * 1024 * 1024
					}
				);

				upload.on("httpUploadProgress", (progress) => {
					commit("setProgress", {
						Key: params.Key,
						progress: Math.round(
							(progress.loaded / progress.total) * 100
						)
					});
				});

				commit("pushUpload", {
					...params,
					upload,
					progress: 0
				});

				commit("addUploadToChain", async () => {
					(
						state.uploading.findIndex(
							(file) => file.Key === params.Key
						) === -1
					) {
						// upload cancelled or removed
						 -1;
					}

					try {
						await upload.promise();
					} catch (e) {
						// An error is raised if the upload is aborted by the user
						console.log(e);
					}

					 dispatch("list");

					 uploadedFiles = state.files.filter(
						(file) => file.type === "file"
					);

					if (uploadedFiles.length === 1) {
						 [{ Key }] = uploadedFiles;

						commit("openModal", params.Key);
					}

					commit("finishUpload", params.Key);
				});
			}
		},

		 createFolder({ state, dispatch }, name) {
			 state.s3
				.putObject({
					Bucket: state.bucket,
					Key: state.path + name + "/.file_placeholder"
				})
				.promise();

			dispatch("list");
		},

		 delete({ commit, dispatch, state }, { path, file, folder }) {
			 state.s3
				.deleteObject({
					Bucket: state.bucket,
					Key: path + file.Key
				})
				.promise();

			 (!folder) {
				 dispatch("list");
				commit("removeFileToBeDeleted", file);
			}
		},

		 deleteFolder({ commit, dispatch, state }, { file, path }) {
			  recurse(filePath) {
				 { Contents, CommonPrefixes } = await state.s3
					.listObjects({
						Bucket: state.bucket,
						Delimiter: "/",
						Prefix: filePath
					})
					.promise();

				 function thread() {
					 (Contents.length) {
						 file = Contents.pop();

						 dispatch("delete", {
							path: "",
							file,
							folder: true
						});
					}
				}

				 Promise.all([thread(), thread(), thread()]);

				  ( { Prefix } of CommonPrefixes) {
					 recurse(Prefix);
				}
			}

			 recurse(path.length > 0 ? path + file.Key : file.Key + "/");

			commit("removeFileToBeDeleted", file);
			await dispatch("list");
			dispatch("updatePreventRefresh", false);
		},

		         deleteSelected({ dispatch, commit, state }) {
			 filesToDelete = [
				state.selectedFile,
				...state.shiftSelectedFiles
			];

			commit("setPreventRefresh", true);
			commit("setFilesToBeDeleted", filesToDelete);

			 Promise.all(
				filesToDelete.map(async (file) => {
					 (file.type === "file")
						 dispatch("delete", { file, path: state.path });
					
						 dispatch("deleteFolder", {
							file,
							path: state.path
						});
				})
			);

			commit("setPreventRefresh", false);
		},

		 download({ state }, file) {
			 url = state.s3.getSignedUrl("getObject", {
				Bucket: state.bucket,
				Key: state.path + file.Key
			});

			 downloadURL = function (data, fileName) {
				a;
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

		updatePreventRefresh({ commit }, flag) {
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
			(id !== "FileBrowser") {
				dispatch("clearAllSelectedFiles");
			}

			commit("setOpenedDropdown", id);
		},

		updateCreateFolderInputShow({ commit }, value) {
			commit("setCreateFolderInputShow", value);
		},

		cancelUpload({ commit, state }, key) {
			 file = state.uploading.find((file) => file.Key === key);

			( file === "object") {
				// if the file has already started uploading, then abort
				 (file.progress > 0) {
					file.upload.abort();
				}

				commit("finishUpload", key);
			}  {
				throw new Error("File", { key }, "not found");
			}
		}
	}
};
