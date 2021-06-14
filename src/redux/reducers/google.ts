import update from "immutability-helper";
import { IReduxAction, IReduxGoogle } from "../../types/redux";

// vychozi state
const DEFAULT_STATE: IReduxGoogle = {
	resolved: false,
	signed: false,
	token: null,
	user: null
};

/**
 * Konfigurace
 *
 * @param {IReduxConfig} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxConfig} Store
 */
export default (state: IReduxGoogle = DEFAULT_STATE, action: IReduxAction): IReduxGoogle => {
	switch (action.type) {
		case "google-resolved": {
			return update(state, {
				$merge: {
					resolved: true,
					signed: !!action.payload,
					user: (action.payload as IReduxGoogle["user"]) || null
				}
			});
		}
		case "google-token": {
			return update(state, {
				token: {
					$set: action.payload as string
				}
			});
		}
	}
	return state;
};
