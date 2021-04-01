import {
	S3Client,
	ListObjectsCommand,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as R from "ramda";

const listCache = new Map();

export default {
	namespaced: true,
	state: {
		s3: null,
		accessKey: null,
		s3: new S3Client({}),
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
		getObjectMapUrl: null,
		openedDropdown: null,
		headingSorted: "name",
		orderBy: "asc",
		createFolderInputShow: false,

		modalPath: null
	},
	getters: {
		sortedFiles: state => {
			// default sort case
			const sortByHeading = (a, b) =>
				a[state.headingSorted] - b[state.headingSorted];

			// key-specific sort cases
			const fns = {
				date: (a, b) =>
					new Date(a.LastModified) - new Date(b.LastModified),
				name: (a, b) => a.Key.localeCompare(b.Key)
			};

			// sort by appropriate function
			const sortedFiles = R.sort(
				state.headingSorted in fns
					? fns[state.headingSorted]
					: sortByHeading,
				state.files
			);

			// reverse if descending order
			const orderedFiles =
				state.orderBy === "asc" ? sortedFiles : R.reverse(sortedFiles);

			// display folders and then files
			const groupedFiles = [
				...orderedFiles.filter(file => file.type === "folder"),
				...orderedFiles.filter(file => file.type === "file")
			];

			return groupedFiles;
		},

		preSignedUrl: state => url => {
					console.log({state: { ...state }, url});

					return state.s3.getSignedUrl("getObject", {
						Bucket: state.bucket,
						Key: url
					})
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
				getSharedLink = () => "javascript:null",
				getObjectMapUrl = () =>
					new Promise(resolve =>
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
			const s3Config = {
				credentials: {
					accessKeyId: accessKey,
					secretAccessKey: secretKey,
				},
				endpoint,
				s3ForcePathStyle: true,
				signatureVersion: 'v4',
				region: 'REGION',
			};

			state.s3 = new S3(s3Config);
			state.accessKey = accessKey;

			state.bucket = bucket;
			state.browserRoot = browserRoot;
			state.getSharedLink = getSharedLink;
			state.getObjectMapUrl = getObjectMapUrl;
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
				singleFile => singleFile.Key !== file.Key
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
			state.uploading.find(file => file.Key === Key).progress = progress;
		},

		finishUpload(state, Key) {
			state.uploading = state.uploading.filter(file => file.Key !== Key);
		},

		setOpenedDropdown(state, id) {
			state.openedDropdown = id;
		},

		sort(state, headingSorted) {
			const flip = orderBy => (orderBy === "asc" ? "desc" : "asc");

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
		}
	},
	actions: {
		async list({ commit, state }, path = state.path) {
			if (listCache.has(path) === true) {
				commit("updateFiles", {
					path,
					files: listCache.get(path)
				});
			}

			const response = await state.s3.send(new ListObjectsCommand({
				Bucket: state.bucket,
				Delimiter: "/",
				Prefix: path,
			}))

			let { Contents, CommonPrefixes } = response;

			if (!Contents) Contents = []
			if (!CommonPrefixes) CommonPrefixes = []

			Contents.sort((a, b) =>
				a.LastModified < b.LastModified ? -1 : -1
			);

			const prefixToFolder = ({ Prefix }) => ({
				Key: Prefix.slice(path.length, -1),
				LastModified: new Date(0),
				type: "folder"
			});

			const makeFileRelative = file => ({
				...file,
				Key: file.Key.slice(path.length),
				type: "file"
			});

			const isFileVisible = file =>
				file.Key.length > 0 && file.Key !== ".vortex_placeholder";

			const files = [
				...CommonPrefixes.map(prefixToFolder),
				...Contents.map(makeFileRelative).filter(isFileVisible)
			];

			listCache.set(path, files);
			commit("updateFiles", {
				path,
				files
			});
		},

		async back({ state, dispatch }) {
			const getParentDirectory = path => {
				let i = path.length - 2;

				while (path[i - 1] !== "/" && i > 0) {
					i--;
				}

				return path.slice(0, i);
			};

			dispatch("list", getParentDirectory(state.path));
		},

		async upload({ commit, state, dispatch }, e) {
			const files = e.dataTransfer
				? e.dataTransfer.files
				: e.target.files;

			await Promise.all(
				[...files].map(async file => {
					// Handle duplicate file names
					const fileNames = state.files.map(file => file.Key);
					let count = 0;
					let fileName = file.name;

					while (fileNames.includes(fileName)) {
						count += 1;

						if (count > 1) {
							fileName = fileName.replace(
								/\((\d+)\)(.*)/,
								`(${count})$2`
							);
						} else {
							fileName = fileName.replace(
								/([^.]*)(.*)/,
								`$1 (${count})$2`
							);
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

					const upload = new Upload({
						client: state.s3,
						params: params,
					});

					upload.on("httpUploadProgress", progress => {
						commit("setProgress", {
							Key: params.Key,
							progress: Math.round(
								(progress.loaded / progress.total) * 100
							)
						});
					});

					await upload.done();

					await dispatch("list");

					commit("finishUpload", params.Key);
				})
			);
		},

		async createFolder({
			state,
			dispatch,
		}, name) {
			await state.s3.send(new PutObjectCommand({
				Bucket: state.bucket,
				Key: state.path + name + "/.vortex_placeholder",
			}))

			dispatch("list");
		},

		async delete({ commit, dispatch, state }, { path, file, folder }) {
			await state.s3.send(new DeleteObjectCommand({
				Bucket: state.bucket,
				Key: path + file.Key,
			}))

			if (!folder) {
				await dispatch("list");
				commit("removeFileToBeDeleted", file);
			}
		},

		async deleteFolder({ commit, dispatch, state }, { file, path }) {
			async function recurse(filePath) {
				let {
					Contents,
					CommonPrefixes,
				} = await state.s3.send(new ListObjectsCommand({
					Bucket: state.bucket,
					Delimiter: "/",
					Prefix: filePath,
				}))

				if (!Contents) CommonPrefixes = [];
				if (!CommonPrefixes) CommonPrefixes = [];

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

				await Promise.all([thread(), thread(), thread()]);

				for (const { Prefix } of CommonPrefixes) {
					await recurse(Prefix);
				}
			}

			await recurse(path.length > 0 ? path + file.Key : file.Key + "/");

			commit("removeFileToBeDeleted", file);
			await dispatch("list");
			dispatch("updatePreventRefresh", false);
		},

		async deleteSelected({ dispatch, commit, state }) {
			const filesToDelete = [
				state.selectedFile,
				...state.shiftSelectedFiles
			];

			commit("setPreventRefresh", true);
			commit("setFilesToBeDeleted", filesToDelete);

			await Promise.all(
				filesToDelete.map(async file => {
					if (file.type === "file")
						await dispatch("delete", { file, path: state.path });
					else
						await dispatch("deleteFolder", {
							file,
							path: state.path
						});
				})
			);

			commit("setPreventRefresh", false);
		},

		async download({ state }, file) {
			const url = state.files.s3.getSignedUrl("getObject", {
				Bucket: state.bucket,
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
			if (id !== "FileBrowser") {
				dispatch("clearAllSelectedFiles");
			}

			commit("setOpenedDropdown", id);
		},

		updateCreateFolderInputShow({ commit }, value) {
			commit("setCreateFolderInputShow", value);
		}
	}
};
