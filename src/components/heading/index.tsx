import React from "react";
import { Text, TextProps } from "react-native";
import { Typography } from "../../styles";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IHeading extends TextProps {
	size: Extract<keyof typeof Typography, "Headline1" | "Headline2" | "Headline3" | "Headline4" | "Headline5" | "Headline6" | "Subtitle1" | "Subtitle2">;
	margin?: boolean;
}

/**
 * Hlavicka
 */
export default class Heading extends React.PureComponent<IHeading> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IHeading = {
		margin: true,
		size: "Headline6"
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children, margin, size, style, ...rest } = this.props;
		// sestaveni a vraceni
		return (
			<Text style={[Typography[size], styles.wrapper, margin ? styles.wrapperMargin : null, style]} {...rest}>
				{children}
			</Text>
		);
	}
}
