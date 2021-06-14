import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { Color } from "../../styles";

/**
 * Dostupne vlasnosti
 */
interface ILoading {
	/**
	 * Velikost
	 */
	size?: "small" | "large";

	/**
	 * Barva
	 */
	color?: keyof typeof Color;

	/**
	 * Styly
	 */
	style?: ActivityIndicatorProps["style"];
}

/**
 * Nacitani
 *
 * @param {ILoading} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Loading = (props: ILoading): JSX.Element => {
	// rozlozeni props
	const { color, size, style } = props;
	// sestaveni a vraceni
	return <ActivityIndicator size={size || "large"} color={Color[color || "Base"]} style={style} />;
};

export default Loading;
