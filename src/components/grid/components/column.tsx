import React, { ReactNode, ReactNodeArray } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { IGridAlign, IGridHidden } from "..";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IGridColumn {
	children: ReactNode | ReactNodeArray;
	flex?: number;
	vertical?: IGridAlign;
	horizontal?: IGridAlign;
}

/**
 * Sloupec
 */
export default class GridColumn extends React.PureComponent<IGridColumn> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IGridColumn = {
		children: null,
		flex: 1,
		horizontal: "flex-start",
		vertical: "flex-start"
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { flex, children, gap, index, horizontal, vertical } = this.props as IGridColumn & IGridHidden;
		// definice
		const style: StyleProp<ViewStyle> = [styles.columnBase];
		// styly
		if (gap && index > 0) {
			style.push(styles.columnGap);
		}
		// flex
		style.push({
			alignItems: horizontal,
			flex,
			justifyContent: vertical
		});
		// sestaveni a vraceni
		return <View style={StyleSheet.flatten(style)}>{children}</View>;
	}
}
