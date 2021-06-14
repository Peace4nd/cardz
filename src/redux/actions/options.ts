import { IDataOptions } from "../../types/data";
import { RecursivePartial } from "../../types/helpers";
import { IReduxThunk } from "../../types/redux";
import { IMergeArray } from "../../utils/merge";

/**
 * Nacteni nastaveni
 *
 * @param {Partial<IDataOptions>} values Hodnoty
 * @returns {IReduxThunk} Akce
 */
export function loadOptions(values: IDataOptions): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: values,
			type: "options-load"
		});
	};
}

/**
 * Aktualizace nastaveni
 *
 * @param {Partial<IDataOptions>} values Hodnoty
 * @param {IMergeArray} array Zpracovani pole
 * @returns {IReduxThunk} Akce
 */
export function updateOptions(values: RecursivePartial<IDataOptions>, array: IMergeArray = "append"): IReduxThunk {
	return (dispatch, getState) => {
		dispatch({
			payload: {
				array,
				values
			},
			type: "options-update"
		});
		dispatch({
			payload: getState().options.values,
			type: "collection-completeness"
		});
	};
}
