import { faCity, faTags } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { IDataCollection } from "../../types/data";
import Icon from "../icon";
import Image from "../image";
import Tags from "../tags";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ICollection {
	/**
	 * Zaznamy kolekce
	 */
	record: IDataCollection;

	/**
	 * Cache busting
	 */
	busting?: Date;

	/**
	 * Kompleni zaznam
	 */
	complete: boolean;

	/**
	 * Stisknuti
	 */
	onPress: (record: IDataCollection) => void;
}

/**
 * Sbirka
 *
 * @returns {JSX.Element} Element
 */
export default class Collection extends React.PureComponent<ICollection> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: ICollection = {
		complete: false,
		onPress: null,
		record: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { busting, onPress, record } = this.props;
		// sestaveni a vraceni
		return (
			<Pressable style={({ pressed }) => [styles.wrapper, pressed ? styles.wrapperPressed : null]} onPress={() => onPress(record)}>
				<Typography type="Headline6" style={styles.infoName} numberOfLines={1}>
					{record.name}
				</Typography>

				<Image source={record.images} busting={busting} style={styles.image} />

				<View>
					<Icon definition={faCity} />
					<Typography>{record.city}</Typography>
				</View>

				<View>
					<Icon definition={faTags} />
					<Tags items={record.category} />
				</View>
			</Pressable>
		);
	}
}
