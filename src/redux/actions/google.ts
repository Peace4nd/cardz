import { User } from "@react-native-community/google-signin";
import { IReduxThunk } from "../../types/redux";

/**
 * Overeni prihlaseni
 *
 * @param {User["user"]} user Data uzivatele
 * @returns {IReduxThunk} Akce
 */
export function signResolved(user?: User["user"]): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: user,
			type: "google-resolved"
		});
	};
}

/**
 * Nastaveni bezpecnostniho tokenu
 *
 * @param {string} token Token
 * @returns {IReduxThunk} Akce
 */
export function setToken(token: string): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: token,
			type: "google-token"
		});
	};
}
