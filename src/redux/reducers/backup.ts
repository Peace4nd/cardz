import update from "immutability-helper";
import { IReduxAction, IReduxBackup } from "../../types/redux";
import { IGoogleDriveFile } from "../../utils/google";
import { DATABASE } from "../../utils/storage";

// vychozi state
const DEFAULT_STATE: IReduxBackup = {
	database: null,
	exist: false,
	files: [],
	loaded: false,
	modified: null,
	stats: {
		records: 0,
		size: 0
	}
};

/**
 * Zaloha
 *
 * @param {IReduxConfig} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxConfig} Store
 */
export default (state: IReduxBackup = DEFAULT_STATE, action: IReduxAction): IReduxBackup => {
	switch (action.type) {
		case "backup-load": {
			// soubory
			const files = action.payload as IGoogleDriveFile[];
			// definice
			let records: number = 0;
			let modified: string = null;
			let size: number = 0;
			let exist: boolean = false;
			let database: IGoogleDriveFile = null;
			// statistika
			if (files.length > 0) {
				// nalezeni databazoveho souboru
				database = files.find((file) => file.name === DATABASE);
				// vypocet
				records = parseInt(database.properties.records as string, 10);
				modified = database.modifiedTime;
				size = files.reduce((prev, current) => prev + parseInt(current.size, 10), 0);
				exist = true;
			}
			// aktualizace
			return update(state, {
				$set: {
					database,
					exist,
					files,
					loaded: true,
					modified,
					stats: {
						records,
						size
					}
				}
			});
		}
	}
	return state;
};
