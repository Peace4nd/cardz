import { matchPath } from "react-router";

/**
 * Dostupne routy
 */
export type IRouterPath = "/create" | "/update/:id" | "/overview" | "/overview/:id" | "/stats" | "/options";

/**
 * Overeni ouhlasu pozadovane cesty a aktualniho URL
 *
 * @param {IRouterPath} path Pozadovana cesta
 * @param {string} url URL
 * @returns {boolean} Souhlas
 */
export function matchRouterPath(path: IRouterPath, url: string): boolean {
	// overeni
	const match = matchPath(url, {
		exact: false,
		path,
		strict: false
	});
	// vyhodnoceni
	return match !== null;
}
