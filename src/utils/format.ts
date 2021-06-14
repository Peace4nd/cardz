import { ItemValue, PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import moment, { MomentInput } from "moment";
import strings from "./strings";

/**
 * Vystupni vlastnosti
 */
export interface IFormatOutput {
	empty: boolean;
	value: string;
}

/**
 * Pomocna funkc epro zpracovani vystupu
 *
 * @param {boolean} empty Prazdnota
 * @param {string} value Hodnota
 * @param {string} unit Jednotka
 * @returns {IFormatOutput} Oetreny vystup
 */
function outputHelper(empty: boolean, value?: string, unit?: string): IFormatOutput {
	return {
		empty,
		value: empty ? strings("overviewUndefined") : value + (unit || "")
	};
}

/**
 * Datum
 *
 * @param {MomentInput} value Hodnota
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function date(value: MomentInput): IFormatOutput {
	if (value) {
		return outputHelper(false, moment(value).format("DD. MM. YYYY"));
	}
	return outputHelper(true);
}

/**
 * Pole
 *
 * @param {string[]} value Hodnota
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function array(value: string[]): IFormatOutput {
	if (Array.isArray(value)) {
		return outputHelper(false, value.join(", "));
	}
	return outputHelper(true);
}

/**
 * Cislo
 *
 * @param {number} value Hodnota
 * @param {string} unit Jednotka
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function number(value: number, unit?: string): IFormatOutput {
	if (isNaN(value)) {
		return outputHelper(true);
	}
	return outputHelper(false, value.toFixed(0), unit);
}

/**
 * Retezec
 *
 * @param {string} value Hodnota
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function string(value: string): IFormatOutput {
	if (!value) {
		return outputHelper(true);
	}
	return outputHelper(false, value);
}

/**
 * Rozsah
 *
 * @param {number[]} value Hodnota
 * @param {string} unit Jednotka
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function range(value: number[], unit?: string): IFormatOutput {
	if (Array.isArray(value) && (value[0] > 0 || value[1] > 0)) {
		if (value[0] && value[1]) {
			return outputHelper(false, value[0].toFixed(0) + " - " + value[1].toFixed(0), unit);
		} else {
			if (value[0]) {
				return outputHelper(false, "≥" + value[0].toFixed(0), unit);
			} else {
				return outputHelper(false, "≤" + value[1].toFixed(0), unit);
			}
		}
	}
	return outputHelper(true);
}

/**
 * Polozka
 *
 * @param {ItemValue} value Hodnota
 * @param {PickerItemProps[]} items Polozky
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function item(value: ItemValue, items: PickerItemProps[]): IFormatOutput {
	if (value) {
		const found = items.find((rec) => rec.value === value);
		if (found) {
			return outputHelper(false, found.label);
		}
	}
	return outputHelper(true);
}

/**
 * Hodnoceni
 *
 * @param {number} value Hodnota
 * @returns {IFormatOutput} Formatovana hodnota
 */
export function rating(value: number): IFormatOutput {
	if (isNaN(value) || value <= 0) {
		return outputHelper(true);
	}
	return outputHelper(false, value.toFixed(0) + "/10");
}

/**
 * Export
 */
export default {
	array,
	date,
	item,
	number,
	range,
	rating,
	string
};
