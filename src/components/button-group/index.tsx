import React, { ReactElement } from "react";
import { View } from "react-native";
import { IButton } from "../button";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IButtonGroup {
	children: ReactElement<IButton> | Array<ReactElement<IButton>>;
}

/**
 * Klikaci tlacitko
 *
 * @param {IButtonGroup} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const ButtonGroup = (props: IButtonGroup): JSX.Element => {
	// rozlozeni props
	const { children } = props;
	// sestaveni a vraceni
	return (
		<View style={[styles.wrapper]}>
			{React.Children.map(children, (child, index) => React.cloneElement(child, { style: [styles.buttonBase, index > 0 ? styles.buttonGap : null] }))}
		</View>
	);
};

export default ButtonGroup;
