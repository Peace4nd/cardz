import { IDataCollection } from "../types/data";

export interface IStatisticsPair {
	pair: {
		key: string;
		value: number;
	};
	role: "id" | "name";
}

export interface IStatisticsGlobal {
	type: "manufacturer" | "origin";
	pairs: IStatisticsPair[];
}

export interface IStatisticsRecord {
	type: "maturity" | "rating" | "price";
	pairs: IStatisticsPair[];
}

export interface IStatistics {
	global: IStatisticsGlobal[];
	record: IStatisticsRecord[];
}

/**
 * Serazeni statistickeho objektu
 *
 * @param {T[]} pairs Statisticka data
 * @param {"asc" | "desc"} direction Smer razeni
 * @param {numberl} slice Pocet signifikantnich hodnot
 * @returns {Array<[string, T]>} Serazeni statisticky objekt
 */
function sortPairs<T extends IStatisticsPair>(pairs: T[], direction: "asc" | "desc", slice?: number): T[] {
	// serazeni
	pairs
		.sort((a, b) => a.pair.key.localeCompare(b.pair.key))
		.sort((a, b) => {
			if (direction === "desc") {
				return b.pair.value - a.pair.value;
			}
			return a.pair.value - b.pair.value;
		});
	// oriznuti je-li treba
	if (slice && slice > 0) {
		return pairs.slice(0, slice);
	}
	// vraceni
	return pairs;
}

/**
 * Vypocet statistik
 *
 * @param {IDataCollection} records Zaznam
 * @returns {IStatistics} Statistika
 */
export function calculateStats(records: IDataCollection[]): IStatistics {
	// definice
	const origin: Record<string, IStatisticsPair> = {};
	const manufacturer: Record<string, IStatisticsPair> = {};
	const price: IStatisticsPair[] = [];
	const rating: IStatisticsPair[] = [];
	const maturity: IStatisticsPair[] = [];
	// krokovani
	for (const record of records) {
		// puvod
		if (origin[record.origin] === undefined) {
			origin[record.origin] = {
				pair: {
					key: record.origin,
					value: 1
				},
				role: "name"
			};
		} else {
			origin[record.origin].pair.value += 1;
		}
		// vyrobce
		if (manufacturer[record.manufacturer] === undefined) {
			manufacturer[record.manufacturer] = {
				pair: {
					key: record.manufacturer,
					value: 1
				},
				role: "name"
			};
		} else {
			manufacturer[record.manufacturer].pair.value += 1;
		}
		// cena
		price.push({
			pair: {
				key: record.id,
				value: record.price
			},
			role: "id"
		});
		// hodnoceni
		rating.push({
			pair: {
				key: record.id,
				value: record.rating
			},
			role: "id"
		});
		// nejstarsi
		maturity.push({
			pair: {
				key: record.id,
				value: Math.max(...record.ripening)
			},
			role: "id"
		});
	}
	// sestaveni a vraceni statistiky
	return {
		global: [
			{
				pairs: sortPairs(Object.values(manufacturer), "desc", 3),
				type: "manufacturer"
			},
			{
				pairs: sortPairs(Object.values(origin), "desc", 3),
				type: "origin"
			}
		],
		record: [
			{
				pairs: sortPairs(maturity, "desc", 3),
				type: "maturity"
			},
			{
				pairs: sortPairs(price, "desc", 3),
				type: "price"
			},
			{
				pairs: sortPairs(rating, "desc", 3),
				type: "rating"
			}
		]
	};
}
