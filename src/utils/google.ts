import { GoogleSignin, User } from "@react-native-community/google-signin";
import mime from "mime";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { setToken } from "../redux/actions/google";
import redux from "../redux/store";

/**
 * Objekt souboru
 */
export interface IGoogleDriveFile {
	id: string;
	size: string;
	name: string;
	mimeType: string;
	description: string;
	createdTime: string;
	modifiedTime: string;
	properties?: Record<string, unknown>;
}

/**
 * Vstupni metadata pro popis souboru
 */
export type IGoogleDriveMeta = Partial<Omit<IGoogleDriveFile, "id" | "size">>;

// globalni promenne
const boundary = uuidv4().replace(/-/g, "");
const fields = "createdTime,description,id,mimeType,modifiedTime,name,size,properties";

/**
 * Vytvoreni multi-part dat pro upload souboru
 *
 * @param {IGoogleDriveMeta} meta Metadata
 * @param {string} content Obsah souboru
 * @returns {string} Multi-part data
 */
function createUploadBody(meta: IGoogleDriveMeta & Record<string, unknown>, content: string): string {
	const multipart =
		`\r\n` +
		`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
		`${JSON.stringify(meta)}\r\n` +
		`--${boundary}\r\nContent-Type: ${meta.mimeType || "*/*"}\r\n` +
		`\r\n${content}\r\n` +
		`--${boundary}--`;
	// vraceni
	return multipart;
}

/**
 * Vytvoreni souboru
 *
 * @param {IGoogleDriveMeta} meta Metadata
 * @param {string} content Obsah souboru
 * @returns {Promise<IGoogleDriveFile>} Souborova metadata
 */
export async function create(meta: IGoogleDriveMeta, content: string): Promise<IGoogleDriveFile> {
	// definice
	const now = moment().toISOString();
	const body = createUploadBody(
		{
			...meta,
			createdTime: now,
			mimeType: mime.getType(meta.name),
			modifiedTime: now,
			parents: ["appDataFolder"]
		},
		content
	);
	const state = redux.getState();
	// overeni prihlaseni
	if (state.google.signed) {
		// fetch
		const fetched = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${fields}`, {
			body,
			headers: {
				"Authorization": `Bearer ${state.google.token}`,
				"Content-Type": `multipart/related; boundary=${boundary}`
			},
			method: "POST"
		});
		// parse
		const parsed = (await fetched.json()) as IGoogleDriveFile;
		// vraceni
		return parsed;
	}
	// vychozi navratova hodnota
	return null;
}

/**
 * Aktualizace souboru
 *
 * @param {IGoogleDriveFile} file Soubor
 * @param {string} content Obsah souboru
 * @param {IGoogleDriveMeta} meta Doplnkova metadata
 * @returns {Promise<IGoogleDriveFile>} Souborova metadata
 */
export async function update(file: IGoogleDriveFile, content: string, meta: IGoogleDriveMeta = null): Promise<IGoogleDriveFile> {
	// definice
	const now = moment().toISOString();
	const body = createUploadBody(
		{
			...meta,
			mimeType: mime.getType(file.name),
			modifiedTime: now
		},
		content
	);
	const state = redux.getState();
	// overeni prihlaseni
	if (state.google.signed) {
		// fetch
		const fetched = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=multipart&fields=${fields}`, {
			body,
			headers: {
				"Authorization": `Bearer ${state.google.token}`,
				"Content-Type": `multipart/related; boundary=${boundary}`
			},
			method: "PATCH"
		});
		// parse
		const parsed = (await fetched.json()) as IGoogleDriveFile;
		// vraceni
		return parsed;
	}
	// vychozi navratova hodnota
	return null;
}

/**
 * Odstraneni souboru
 *
 * @param {string} fileId ID souboru
 */
export async function remove(fileId: string): Promise<void> {
	// definice
	const state = redux.getState();
	// overeni prihlaseni
	if (state.google.signed) {
		// fetch
		const fetched = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
			headers: {
				Authorization: `Bearer ${state.google.token}`
			},
			method: "DELETE"
		});
		// parse
		await fetched.text();
	}
}

/**
 * Prehled dostupnych souboru
 *
 * @returns {Promise<IGoogleDriveFile[]>} Metadata dostupnych souboru
 */
export async function list(): Promise<IGoogleDriveFile[]> {
	// definice
	const state = redux.getState();
	// overeni prihlaseni
	if (state.google.signed) {
		// fetch
		const fetched = await fetch(`https://www.googleapis.com/drive/v3/files?&spaces=appDataFolder&fields=files(${fields})`, {
			headers: {
				Authorization: `Bearer ${state.google.token}`
			},
			method: "GET"
		});
		// parse
		const parsed = (await fetched.json()) as { files: IGoogleDriveFile[] };
		// vraceni
		return parsed.files || [];
	}
	// vychozi navratova hodnota
	return [];
}

/**
 * Stazeni
 *
 * @param {string} fileId ID souboru
 * @returns {Promise<string>} Soubor
 */
export async function download(fileId?: string): Promise<string> {
	// definice
	const state = redux.getState();
	// overeni prihlaseni
	if (state.google.signed) {
		// fetch
		const fetched = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
			headers: {
				Authorization: `Bearer ${state.google.token}`
			},
			method: "GET"
		});
		// parse
		const content = await fetched.text();
		// vraceni
		return content;
	}
	// vychozi navratova hodnota
	return null;
}

// export
export default {
	/**
	 * Autorizace
	 */
	auth: {
		/**
		 * Data aktualne prihlaseneho uzivatele
		 *
		 * @returns {User["user"]} Data uzivatele
		 */
		getCurrentUser: async (): Promise<User["user"]> => {
			const data = await GoogleSignin.getCurrentUser();
			return data.user;
		},

		/**
		 * Overeni prihlaseni
		 *
		 * @returns {Promise<boolean>} Prihlaseno
		 */
		isSignedIn: (): Promise<boolean> => GoogleSignin.isSignedIn(),

		/**
		 * Prihlaseni
		 *
		 * @returns {Promise<IGoogleData>} Data
		 */
		signIn: async (): Promise<User["user"]> => {
			// zpracovani
			const user = await GoogleSignin.signIn();
			const tokens = await GoogleSignin.getTokens();
			// nastaveni tokenu
			redux.dispatch(setToken(tokens.accessToken));
			// vraceni
			return user.user;
		},

		/**
		 * Tiche prihlaseni
		 *
		 * @returns {Promise<IGoogleData>} Data
		 */
		signInSilently: async (): Promise<User["user"]> => {
			// zpracovani
			const user = await GoogleSignin.signInSilently();
			const tokens = await GoogleSignin.getTokens();
			// nastaveni tokenu
			redux.dispatch(setToken(tokens.accessToken));
			// vraceni
			return user.user;
		},

		/**
		 * Odhlaseni
		 */
		signOut: async (): Promise<void> => {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
		}
	},

	/**
	 * Drive
	 */
	drive: {
		create,
		download,
		list,
		remove,
		update
	}
};
