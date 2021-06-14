import React from "react";
import { Text, TextProps } from "react-native";
import { Typography as TypeStyle } from "../../styles";

/**
 * Dostupne vlastnosti
 */
export interface ITypography extends TextProps {
	type: keyof typeof TypeStyle;
}

/**
 * Hlavicka
 */
export default class Typography extends React.PureComponent<ITypography> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: ITypography = {
		type: "Body1"
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children, style, type, ...rest } = this.props;
		// sestaveni a vraceni
		return (
			<Text style={[TypeStyle[type], style]} {...rest}>
				{children}
			</Text>
		);
	}
}
