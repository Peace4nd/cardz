import { User } from "@react-native-community/google-signin";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IGoogleDriveFile } from "../utils/google";
import { IDataCollection, IDataCollectionCompleteness, IDataOptions } from "./data";

/**
 * Typy
 */
export type IReduxType =
	| "google-resolved"
	| "google-token"
	| "collection-bottle"
	| "collection-load"
	| "collection-push"
	| "collection-update"
	| "collection-remove"
	| "collection-predefined"
	| "collection-completeness"
	| "options-load"
	| "options-update"
	| "backup-load";

/**
 * Akce
 */
export type IReduxAction = Action<IReduxType> & { payload?: unknown };

/**
 * Thunk
 */
export type IReduxThunk = ThunkAction<void, IReduxStore, unknown, IReduxAction>;

/**
 * Dispatch
 */
export interface IReduxDispatch {
	dispatch: ThunkDispatch<IReduxStore, unknown, IReduxAction>;
}

/**
 * Sdilene vlastnisti pro wrapper
 */
export interface IDataWrapperShared {
	changed: Date;
	init: boolean;
}

/**
 * Wrapper pro pole
 */
export interface IDataWrapperArray<T> extends IDataWrapperShared {
	records: T[];
}

/**
 * Wrapper pro objekt
 */
export interface IDataWrapperObject<T> extends IDataWrapperShared {
	values: T;
}

/**
 * Google
 */
export interface IReduxGoogle {
	user: User["user"];
	signed: boolean;
	resolved: boolean;
	token: string;
}

/**
 * Zaloha
 */
export interface IReduxBackup {
	loaded: boolean;
	files: IGoogleDriveFile[];
	exist: boolean;
	database: IGoogleDriveFile;
	modified: string;
	stats: {
		records: number;
		size: number;
	};
}

/**
 * Kolekce
 */
export interface IReduxCollection extends IDataWrapperArray<IDataCollection> {
	/**
	 * Preddefinovane hodnoty
	 */
	predefined: {
		/**
		 * Vyrobce
		 */
		manufacturer: Array<IDataCollection["manufacturer"]>;
	};

	/**
	 * Dokoncenost zaznamu
	 */
	completeness: IDataCollectionCompleteness;
}

/**
 * Nastaveni
 */
export type IReduxOptions = IDataWrapperObject<IDataOptions>;

/**
 * Store
 */
export interface IReduxStore {
	backup: IReduxBackup;
	google: IReduxGoogle;
	collection: IReduxCollection;
	options: IReduxOptions;
}
