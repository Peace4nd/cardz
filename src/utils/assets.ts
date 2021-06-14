import fs from "react-native-fs";
import ImageResizer from "react-native-image-resizer";

/**
 * Overeni existence adresare pro assety
 */
async function checkAssetsPath(): Promise<void> {
	const exists = await fs.exists(fs.DocumentDirectoryPath);
	if (!exists) {
		await fs.mkdir(fs.DocumentDirectoryPath);
	}
}

// vychozi export
export default {
	/**
	 * Ulozeni souboru
	 *
	 * @param {string} source Zdrojovy soubor
	 * @param {string} id Identifikator zaznamu
	 * @returns {Promise<string>} Cesta k pridanemu souboru
	 */
	create: async (source: string, id: string): Promise<string> => {
		// definice
		const dest = fs.DocumentDirectoryPath + "/" + id + "." + source.split(".").pop();
		// overeni existence adresare
		await checkAssetsPath();
		// nakopirovani
		await fs.copyFile(source, dest);
		// komprese
		const res = await ImageResizer.createResizedImage(dest, 600, 600, "WEBP", 90, 0, fs.DocumentDirectoryPath, true, { onlyScaleDown: true });
		// odmazani zdrojoveho souboru
		await fs.unlink(dest);
		// vraceni cesty
		return res.path;
	},

	/**
	 * Nacteni souboru
	 *
	 * @param {string} file Soubor
	 * @returns {Promise<string>} Obsah souboru
	 */
	read: async (file: string): Promise<string> => {
		// nacteni souboru
		const content = await fs.readFile(file, "base64");
		// vraceni seznamu souboru
		return content;
	},

	/**
	 * Smazani souboru souboru
	 *
	 * @param {string} file Soubor
	 */
	remove: async (file: string): Promise<void> => {
		if (await fs.exists(file)) {
			await fs.unlink(file);
		}
	},

	/**
	 * Ulozeni souboru
	 *
	 * @param {string} file Soubor
	 * @param {string} content Obsah
	 */
	save: async (file: string, content: string): Promise<void> => {
		// overeni existence adresare
		await checkAssetsPath();
		// zapis
		await fs.writeFile(file, content, "base64");
	}
};
