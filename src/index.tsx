import { GoogleSignin } from "@react-native-community/google-signin";
import React from "react";
import { Permission, PermissionsAndroid } from "react-native";
import "react-native-get-random-values";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { BackButton, NativeRouter, Redirect, Route, Switch } from "react-router-native";
import store from "./redux/store";
import Create from "./routes/create";
import Options from "./routes/options";
import { Collection, Detail } from "./routes/overview";
import Update from "./routes/update";

/**
 * Aplikacni vstupni bod
 */
class App extends React.PureComponent {
	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		// pozadavek na prava
		this.requestPermissions();
		// inicializace google API
		GoogleSignin.configure({
			forceCodeForRefreshToken: true,
			scopes: ["https://www.googleapis.com/auth/drive.appdata"]
		});
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		return (
			<Provider store={store}>
				<MenuProvider>
					<NativeRouter>
						<BackButton />
						<Switch>
							<Redirect exact={true} strict={true} from="/" to={"/overview"} />
							<Route exact={true} strict={true} path={"/overview"} component={Collection} />
							<Route exact={true} strict={true} path={"/overview/:id"} component={Detail} />
							<Route exact={true} strict={true} path={"/create"} component={Create} />
							<Route exact={true} strict={true} path={"/update/:id"} component={Update} />
							<Route exact={true} strict={true} path={"/options"} component={Options} />
						</Switch>
					</NativeRouter>
				</MenuProvider>
			</Provider>
		);
	}

	/**
	 * Ziskani potrebnych opravneni
	 *
	 * @returns {Promise<boolean>} Opravneni byla pridelena
	 */
	private async requestPermissions(): Promise<boolean> {
		// definice
		const permissions: Permission[] = [];
		let granted: boolean = true;
		// cteni z uloziste
		const pRead = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
		if (!pRead) {
			permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
		}
		// ziskani potrebnych opravneni
		if (permissions.length > 0) {
			// pozadavek na opravneni
			const response = await PermissionsAndroid.requestMultiple(permissions);
			// overeni ze potrebna opravneni byla pridelena
			for (const permission in response) {
				granted = granted && response[permission] === PermissionsAndroid.RESULTS.GRANTED;
			}
		}
		// vraceni
		return granted;
	}
}

export default App;
