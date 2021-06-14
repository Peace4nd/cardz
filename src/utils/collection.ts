import { IDataCollection } from "../types/data";
import { ILocaleStrings } from "../types/locale";
import country from "./country";
import format from "./format";
import strings from "./strings";

/**
 * Sestaveni sdileneho textu
 *
 * @param {IDataCollection} record Zaznam
 * @returns {string} Sdileny text
 */
export function stringify(record: IDataCollection): string {
	// definice
	let output: string = "";
	// sestaveni
	output += makeLine("createName", format.string(record.name).value);
	output += makeLine("createSubname", format.string(record.subname).value);
	output += makeLine("createManufacturer", format.string(record.manufacturer).value);
	output += makeLine("createVolume", format.number(record.volume, "ml").value);
	output += makeLine("createAlcohol", format.number(record.alcohol, "%").value);
	output += makeLine("createColor", format.array(record.color).value);
	output += makeLine("createAroma", format.array(record.aroma).value);
	output += makeLine("createTaste", format.array(record.taste).value);
	output += makeLine("createCask", format.array(record.cask).value);
	output += makeLine("createPrice", format.number(record.price, "Kč").value);
	output += makeLine("createRipening", format.range(record.ripening, strings("overviewRipeningYears")).value);
	output += makeLine(
		"createOrigin",
		format.item(
			record.origin,
			Object.entries(country).map((entry) => ({ label: entry[1].name, value: entry[0] }))
		).value
	);
	output += makeLine("createPurchased", format.date(record.purchased).value);
	output += makeLine("createRating", format.rating(record.rating).value);
	output += makeLine("createNotes", format.string(record.notes).value);
	// vraceni
	return output;
}

/**
 * Sestaveni radku
 *
 * @param {ILocaleStrings} label Popisek
 * @param {string} value Hodnota
 * @returns {string} Radek
 */
function makeLine(label: ILocaleStrings, value: string): string {
	return `${strings(label)}: ${value}\n`;
}
