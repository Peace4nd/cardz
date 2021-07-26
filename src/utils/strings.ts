import moment from "moment";
import data from "../../locale/main.json";
import { ILocaleStrings } from "../types/locale";

/**
 * Jednotky velikosti (v bytech)
 */
const byteUnits = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Prekladovy retezec
 *
 * @param {ILocaleStrings} key Retezec
 * @param {unknown[]} params Parametry
 * @returns {string} Text
 */
export default function strings(key: ILocaleStrings, ...params: unknown[]): string {
	// regularni vyrazy
	const rGlobal = /\{[^{]+\}/i;
	const rParam = /\{\s*([0-9]+)(\s*\|\s*([a-z]+))?\s*\}/gi;
	const tKey: string = data[key] ?? key;
	// nahrazeni parametru
	return tKey.replace(rGlobal, (param): string => {
		// definice
		const parts = rParam.exec(param);
		const index = parseInt(parts[1], 10);
		const value = params[index];
		// formatovani
		switch (parts[3]) {
			case "date": {
				return moment(value).format("DD. MM. YYYY");
			}
			case "bytes": {
				const v = value as number;
				const power = value > 0 ? Math.floor(Math.log(v) / Math.log(1024)) : 0;
				return (v / Math.pow(1024, power)).toFixed(0) + " " + byteUnits[power];
			}
			default: {
				return String(value);
			}
		}
	});
}
