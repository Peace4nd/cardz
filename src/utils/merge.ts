import deepmerge from "deepmerge";

/**
 * Zpusob zpracovani pole
 */
export type IMergeArray = "replace" | "append";

/**
 * Slouceni objektu
 *
 * @param {Partial<T>} x Objekt
 * @param {Partial<T>} y Objekt
 * @param {IMergeArray} array Prace s polem
 * @returns {Partial<T>} Objekt
 */
export default function merge<T>(x: Partial<T>, y: Partial<T>, array: IMergeArray = "replace"): Partial<T> {
	// osetreni prace s polem
	const options: deepmerge.Options = {};
	if (array === "replace") {
		options.arrayMerge = (dest: T[], src: T[]) => src;
	}
	// zpracovani
	return deepmerge(x, y, options);
}
