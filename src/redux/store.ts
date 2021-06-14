import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { debounce } from "throttle-debounce";
import { IReduxStore } from "../types/redux";
import storage from "../utils/storage";
import backup from "./reducers/backup";
import collection from "./reducers/collection";
import google from "./reducers/google";
import options from "./reducers/options";

// reducery
const reducers = combineReducers({
	backup,
	collection,
	google,
	options
});

// priprava
const middleware = applyMiddleware(thunk);
const store = createStore(reducers, {}, middleware);

// serializace dat do uloziste
let currentState: IReduxStore = null;
const handleChange = debounce(1000, () => {
	// predchozi stav
	const previousState: IReduxStore = currentState;
	// aktualni stav
	currentState = store.getState();
	// pokud predchozi stav neexistuje
	if (previousState === null) {
		storage.collection.write(currentState.collection);
		storage.options.write(currentState.options);
	} else {
		// kolekce
		if (previousState.collection.changed !== currentState.collection.changed) {
			storage.collection.write(currentState.collection);
		}
		// nastaveni
		if (previousState.options.changed !== currentState.options.changed) {
			storage.options.write(currentState.options);
		}
	}
});
store.subscribe(handleChange);

// export
export default store;
