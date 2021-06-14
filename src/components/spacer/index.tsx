import React from "react";
import { View, ViewProps } from "react-native";
import { Size } from "../../styles";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ISpacer extends ViewProps {
	/**
	 * Velikost
	 */
	size: keyof typeof Size;
}

/**
 * Hlavicka
 */
export default class Spacer extends React.PureComponent<ISpacer> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: ISpacer = {
		size: "1x"
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { size, style, ...rest } = this.props;
		// sestaveni a vraceni
		return <View style={[{ height: Size[size] }, styles.wrapper, style]} {...rest} />;
	}
}
