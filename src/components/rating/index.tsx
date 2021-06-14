import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IRating {
	/**
	 * Hodnota
	 */
	value: number;

	/**
	 * Zmena
	 */
	onChange?: (value: number) => void;
}

/**
 * Hodnoceni
 *
 * @returns {JSX.Element} Element
 */
export default class Rating extends React.PureComponent<IRating> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRating = {
		onChange: null,
		value: 0
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { onChange, value } = this.props;
		// definice
		const stars: JSX.Element[] = [];
		// sestaveni
		if (onChange) {
			for (let i = 0; i < 10; i++) {
				stars.push(
					<TouchableOpacity key={i} onPress={() => onChange(i + 1)}>
						<Icon definition={value > i ? faStarSolid : faStarRegular} color={value > i ? "Base" : "Muted"} />
					</TouchableOpacity>
				);
			}
		} else {
			for (let i = 0; i < 10; i++) {
				stars.push(
					<View key={i}>
						<Icon definition={value > i ? faStarSolid : faStarRegular} color={value > i ? "Base" : "Muted"} />
					</View>
				);
			}
		}
		// vraceni
		return <View style={styles.wrapper}>{stars}</View>;
	}
}
