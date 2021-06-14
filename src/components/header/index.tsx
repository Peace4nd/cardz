import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Icon } from "..";
import { IRouterPath } from "../../utils/router";
import Typography from "../typography";
import styles from "./styles";

/**
 * Polozka menu (presmerovani)
 */
interface IHeaderActionMenuItemPath {
	type: "path";
	label: string;
	path: IRouterPath;
}

/**
 * Polozka menu (kliknuti)
 */
interface IHeaderActionMenuItemPress {
	type: "press";
	label: string;
	onPress: () => void;
}

/**
 * Polozka menu
 */
export type IHeaderActionMenuItem = IHeaderActionMenuItemPath | IHeaderActionMenuItemPress;

/**
 * Akce (presmerovani)
 */
interface IHeaderActionPath {
	type: "path";
	icon: IconDefinition;
	path: IRouterPath;
	disabled?: boolean;
}

/**
 * Akce (kliknuti)
 */
interface IHeaderActionPress {
	type: "press";
	icon: IconDefinition;
	onPress: () => void;
	disabled?: boolean;
}

/**
 * Akce (nabidka)
 */
interface IHeaderActionMenu {
	type: "menu";
	icon: IconDefinition;
	items: IHeaderActionMenuItem[];
	disabled?: boolean;
}

/**
 * Akce
 */
export type IHeaderAction = IHeaderActionPath | IHeaderActionPress | IHeaderActionMenu;

/**
 * Dostupne vlastnosti
 */
export interface IHeader {
	/**
	 * Nadpis
	 */
	title: string;

	/**
	 * Podnadpis
	 */
	subtitle?: string;

	/**
	 * Zpet
	 */
	back?: IHeaderAction;

	/**
	 * Nabidka
	 */
	actions?: IHeaderAction[];
}

/**
 * Hlavicka
 */
class Header extends React.PureComponent<IHeader & RouteComponentProps> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IHeader = {
		actions: [],
		back: null,
		title: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { actions, back, subtitle, title } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				<View style={[styles.sectionAction, styles.sectionActionLeft]}>
					<View style={styles.actionWrapper}>{this.renderAction(back)}</View>
				</View>
				<View style={styles.sectionTitle}>
					<Typography type="Headline6" style={styles.title}>
						{title}
					</Typography>
					{subtitle && (
						<Typography type="Subtitle2" style={styles.subtitle}>
							{subtitle}
						</Typography>
					)}
				</View>
				<View style={[styles.sectionAction, styles.sectionActionRight]}>
					{actions.map((action, index) => (
						<View key={index} style={styles.actionWrapper}>
							{this.renderAction(action)}
						</View>
					))}
				</View>
			</View>
		);
	}

	/**
	 * Sestaveni akce
	 *
	 * @param {IHeaderAction} action Definice akce
	 * @returns {JSX.Element} Element
	 */
	private renderAction(action: IHeaderAction): JSX.Element {
		// rozlozeni props
		const { history } = this.props;
		// pokud existuje akce
		if (action) {
			switch (action.type) {
				// menu
				case "menu": {
					return (
						<Menu
							onSelect={(value: number) => {
								// vybrana polozka menu
								const item = action.items[value];
								// zpracovani akce
								switch (item.type) {
									case "path":
										history.push(item.path);
										break;
									case "press":
										item.onPress();
										break;
								}
							}}
						>
							<MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
								<Icon definition={action.icon} color={action.disabled ? "Light" : "Highlight"} />
							</MenuTrigger>
							<MenuOptions>
								{action.items.map((item, index) => (
									<MenuOption key={index} style={styles.actionOption} value={index}>
										<Typography type="Body1">{item.label}</Typography>
									</MenuOption>
								))}
							</MenuOptions>
						</Menu>
					);
				}
				// presmerovani
				case "path": {
					return (
						<TouchableOpacity onPress={() => history.push(action.path)} disabled={action.disabled || false}>
							<Icon definition={action.icon} color={action.disabled ? "Light" : "Highlight"} />
						</TouchableOpacity>
					);
				}
				// kliknuti
				case "press": {
					return (
						<TouchableOpacity onPress={action.onPress} disabled={action.disabled || false}>
							<Icon definition={action.icon} color={action.disabled ? "Light" : "Highlight"} />
						</TouchableOpacity>
					);
				}
			}
		}
		// zadna akce
		return null;
	}
}

export default withRouter(Header);
