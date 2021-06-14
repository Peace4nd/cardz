import { IReduxThunk } from "../../types/redux";
import { IGoogleDriveFile } from "../../utils/google";

/**
 * Nacteni zalohy
 *
 * @param {IGoogleDriveFile[]} files Soubory zalohy
 * @returns {IReduxThunk} Akce
 */
export function loadBackup(files: IGoogleDriveFile[]): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: files,
			type: "backup-load"
		});
	};
}
