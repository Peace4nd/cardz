import React from "react";
import { TouchableOpacity, View } from "react-native";
import confirm from "../../utils/confirm";
import Typography from "../typography";
import styles from "./styles";
export interface ITagsItem {
	value: string;
	label: string;
	color: string;
}

/**
 * Dostupne vlastnosti
 */
export interface ITags {
	/**
	 * Polozky
	 */
	items: string[];

	/**
	 * Popisky hodnot
	 */
	labels?: Record<string, string>;

	/**
	 * Smazani
	 */
	onDelete?: (tag: string) => void;

	/**
	 * Editace
	 */
	onModify?: (tag: string) => void;
}

/**
 * Tagy
 *
 * @param {ITags} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Tags = (props: ITags): JSX.Element => {
	// rozlozeni props
	const { items, labels, onDelete, onModify } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			{(items || []).sort().map((item, index) => (
				<TouchableOpacity
					key={index}
					style={styles.item}
					onPress={
						onDelete
							? confirm.delete({
									cancelable: true,
									onConfirm: () => {
										onDelete(item);
									}
							  })
							: null
					}
					onLongPress={onModify ? () => onModify(item) : null}
				>
					<Typography type="Body1" style={styles.label}>
						{labels && labels?.[item] ? labels[item] : item}
					</Typography>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Tags;
