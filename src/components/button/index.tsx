import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Icon from "../icon";
import Loading from "../loading";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IButton {
	/**
	 * Ikona
	 */
	icon?: IconDefinition;

	/**
	 * Popisek
	 */
	label?: string;

	/**
	 * Zakazane
	 */
	disabled?: boolean;

	/**
	 * Probiha zpracovani
	 */
	busy?: boolean;

	/**
	 * Akce po stisknuti
	 */
	onPress?: () => void;

	/**
	 * Styly
	 */
	style?: TouchableOpacityProps["style"];
}

/**
 * Klikaci tlacitko
 *
 * @param {IButton} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Button = (props: IButton): JSX.Element => {
	// rozlozeni props
	const { busy, disabled, icon, label, onPress, style } = props;
	// sestaveni a vraceni
	return (
		<TouchableOpacity style={[styles.wrapper, disabled || busy ? styles.wrapperDisabled : null, style]} onPress={onPress}>
			{icon && !busy && <Icon definition={icon} style={styles.icon} color="Highlight" size="2x" />}
			{busy && <Loading size="small" color="Highlight" style={styles.icon} />}
			{label && (
				<Typography type="Button" style={styles.label}>
					{label}
				</Typography>
			)}
		</TouchableOpacity>
	);
};

export default Button;
