/**
 * Datovy typ zaznamu kolekce
 */
export interface IDataCollection {
	/**
	 * Identifikator
	 */
	id: string;

	/**
	 * Nazev zajimavosti
	 */
	name: string;

	/**
	 * Obec kde se zajimavost nachazi
	 */
	city: string;

	/**
	 * GPS souradnice
	 */
	coordinates: {
		/**
		 * Zemepisna sirky
		 */
		lat: string;

		/**
		 * Zemepisna delka
		 */
		long: string;
	};

	/**
	 * Obrazky
	 */
	images: string[];

	/**
	 * Navstiveno
	 */
	visited: string;

	/**
	 * Poznamky
	 */
	notes: string;

	/**
	 * Hodnoceni (0 - 10)
	 */
	rating: number;

	/**
	 * Kategorie (hrad, zamek, jeskyne, ...)
	 */
	category: string[];
}

/**
 * Mira dokonceni
 */
export type IDataCollectionCompleteness = Record<string, boolean>;

/**
 * Datovy typ nastaveni
 */
export interface IDataOptions {
	/**
	 * Kategorie zajimavosti
	 */
	category: string[];

	/**
	 * Mandatorni polozky kolekce
	 */
	mandatory: string[];
}
