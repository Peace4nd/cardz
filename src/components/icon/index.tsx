import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Color, Size } from "../../styles";

/**
 * Dostupne vlastnosti
 */
export interface IIcon {
	/**
	 * Definice
	 */
	definition: IconProp;

	/**
	 * Velikost
	 */
	size?: keyof typeof Size;

	/**
	 * Barva
	 */
	color?: keyof typeof Color;

	/**
	 * Doplnkove styly
	 */
	style?: FontAwesomeIconStyle;
}

/**
 * Ikona
 *
 * @param {Props} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Icon = (props: IIcon): JSX.Element => {
	// rozlozeni props
	const { color, definition, size, style } = props;
	// sestaveni a vraceni
	return <FontAwesomeIcon icon={definition} size={Size[size || "3x"]} color={Color[color || "Text"]} style={style} />;
};

// export
export default Icon;
