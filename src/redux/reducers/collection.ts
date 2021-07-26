import update from "immutability-helper";
import { IDataCollection, IDataCollectionCompleteness, IDataOptions } from "../../types/data";
import { IReduxAction, IReduxCollection } from "../../types/redux";

// vychozi state
export const DEFAULT_STATE: IReduxCollection = {
	changed: new Date(),
	completeness: {},
	init: false,
	predefined: {
		manufacturer: []
	},
	records: []
};

/**
 * Kolekce
 *
 * @param {IReduxCollection} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxCollection} Store
 */
export default (state: IReduxCollection = DEFAULT_STATE, action: IReduxAction): IReduxCollection => {
	switch (action.type) {
		case "collection-load": {
			// priprava
			const payload = action.payload as IDataCollection[];
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				init: {
					$set: true
				},
				records: {
					$set: payload || DEFAULT_STATE.records
				}
			});
		}
		case "collection-push": {
			const payload = action.payload as IDataCollection;
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					$push: [payload]
				}
			});
		}
		case "collection-update": {
			// priprava
			const payload = action.payload as { id: string; record: Partial<IDataCollection> };
			const index = state.records.findIndex((record) => record.id === payload.id);
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					[index]: {
						$merge: payload.record
					}
				}
			});
		}
		case "collection-remove": {
			// priprava
			const payload = action.payload as string;
			const index = state.records.findIndex((record) => record.id === payload);
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					$splice: [[index, 1]]
				}
			});
		}
		case "collection-completeness": {
			// definice
			const options = action.payload as IDataOptions;
			const completeness: IDataCollectionCompleteness = {};
			// prochazeni zaznamu
			for (const record of state.records) {
				let complete = true;
				options.mandatory.forEach((property) => {
					complete = complete && Boolean(record[property]);
				});
				completeness[record.id] = complete;
			}
			// aktualizace
			return update(state, {
				completeness: {
					$set: completeness
				}
			});
		}
	}
	return state;
};
