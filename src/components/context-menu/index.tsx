import { faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import Typography from "../typography";
import styles from "./styles";

interface IContextMenuState {
	opened: boolean;
}

/**
 * Polozka
 */
export interface IContextMenuItem {
	/**
	 * Ikona
	 */
	icon: IconDefinition;

	/**
	 * Popisek
	 */
	label: string;

	/**
	 * Kliknuti
	 */
	onPress: () => void;
}

/**
 * Dostupne vlastnosti
 */
export interface IContextMenu {
	/**
	 * Polozky
	 */
	items: IContextMenuItem[];
}

/**
 * Kontextova nabidka
 */
export default class ContextMenu extends React.PureComponent<IContextMenu, IContextMenuState> {
	/**
	 * Vychozi stav
	 */
	public state: IContextMenuState = {
		opened: false
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { items } = this.props;
		const { opened } = this.state;
		// sestaveni a vraceni
		return (
			<View>
				<TouchableOpacity style={styles.button} onPress={this.handleToggle}>
					<Icon definition={faBars} color="White" />
				</TouchableOpacity>
				{opened && (
					<View style={styles.menuWrapper}>
						{items.map((item, index) => {
							return (
								<TouchableOpacity key={index} style={styles.menuItem} onPress={this.handlePress.bind(this, item)}>
									<Icon definition={item.icon} color="Base" />
									<Typography style={styles.menuItemLabel}>{item.label}</Typography>
								</TouchableOpacity>
							);
						})}
					</View>
				)}
			</View>
		);
	}

	private handlePress(item: IContextMenuItem): void {
		this.setState(
			{
				opened: false
			},
			() => {
				item.onPress();
			}
		);
	}

	private handleToggle = (): void => {
		this.setState({
			opened: !this.state.opened
		});
	};
}
