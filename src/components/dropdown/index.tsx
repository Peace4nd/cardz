import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import Icon from "../icon";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IDropdown {
	/**
	 * Polozky
	 */
	items: string[];

	/**
	 * Ikona
	 */
	icon: IconDefinition;

	/**
	 * Popisky hodnot
	 */
	labels?: Record<string, string>;

	/**
	 * Vyber polozky
	 */
	onSelect: (item: string) => void;

	/**
	 * Vzhled
	 */
	appearance?: keyof typeof renderers;
}

/**
 * Dropdown
 *
 * @param {IDropdown} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Dropdown = (props: IDropdown): JSX.Element => {
	// rozlozeni props
	const { appearance, icon, items, labels, onSelect } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.buttonGroup} pointerEvents={items.length ? "auto" : "none"}>
			<Menu onSelect={onSelect} renderer={renderers[appearance || "ContextMenu"]}>
				<MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerWrapper: styles.buttonElement }}>
					<Icon definition={icon} color={items.length ? "Base" : "Muted"} />
				</MenuTrigger>
				<MenuOptions>
					<ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={appearance !== "Popover"}>
						{items.sort().map((item, index) => (
							<MenuOption key={index} value={item} style={styles.menuItem}>
								<Typography type="Body1">{labels && labels?.[item] ? labels[item] : item}</Typography>
							</MenuOption>
						))}
					</ScrollView>
				</MenuOptions>
			</Menu>
		</View>
	);
};

// export
export default Dropdown;
