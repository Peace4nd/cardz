import { IDataCollection } from "../../types/data";
import { IReduxThunk } from "../../types/redux";

/**
 * Nacteni kompletni kolekce zaznamu do kolekce
 *
 * @param {IDataCollection[]} records Zaznamy
 * @returns {IReduxThunk} Akce
 */
export function loadRecords(records: IDataCollection[]): IReduxThunk {
	return (dispatch, getState) => {
		dispatch({
			payload: records,
			type: "collection-load"
		});
		dispatch({
			type: "collection-predefined"
		});
		dispatch({
			payload: getState().options.values,
			type: "collection-completeness"
		});
	};
}

/**
 * Pridani zaznamu do kolekce
 *
 * @param {IDataCollection} record Zaznam
 * @returns {IReduxThunk} Akce
 */
export function pushRecord(record: IDataCollection): IReduxThunk {
	return (dispatch, getState) => {
		dispatch({
			payload: record,
			type: "collection-push"
		});
		dispatch({
			type: "collection-predefined"
		});
		dispatch({
			payload: getState().options.values,
			type: "collection-completeness"
		});
	};
}

/**
 * Aktualizace zaznamu v kolekci
 *
 * @param {string} id ID zaznamu
 * @param {Partial<IDataCollection>} record Zaznam
 * @returns {IReduxThunk} Akce
 */
export function updateRecord(id: string, record: Partial<IDataCollection>): IReduxThunk {
	return (dispatch, getState) => {
		dispatch({
			payload: {
				id,
				record
			},
			type: "collection-update"
		});
		dispatch({
			type: "collection-predefined"
		});
		dispatch({
			payload: getState().options.values,
			type: "collection-completeness"
		});
	};
}

/**
 * Odstraneni zaznamu z kolekce
 *
 * @param {string} id Identifikator
 * @returns {IReduxThunk} Akce
 */
export function removeRecord(id: string): IReduxThunk {
	return (dispatch, getState) => {
		dispatch({
			payload: id,
			type: "collection-remove"
		});
		dispatch({
			type: "collection-predefined"
		});
		dispatch({
			payload: getState().options.values,
			type: "collection-completeness"
		});
	};
}

/**
 * Pridani nove lahve
 *
 * @param {string} id  Identifikator
 * @returns {IReduxThunk} Akce
 */
export function addBottle(id: string): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: id,
			type: "collection-bottle"
		});
	};
}
