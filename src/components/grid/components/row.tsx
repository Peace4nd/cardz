import React, { ReactElement } from "react";
import { View } from "react-native";
import { IGridHidden } from "..";
import styles from "../styles";
import { IGridColumn } from "./column";

/**
 * Dostupne vlastnosti
 */
export interface IGridRow {
	children: ReactElement<IGridColumn> | Array<ReactElement<IGridColumn>>;
}

/**
 * Radek
 */
export default class GridRow extends React.PureComponent<IGridRow> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IGridRow = {
		children: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children, gap, index } = this.props as IGridRow & IGridHidden;
		// sestaveni a vraceni
		return (
			<View style={[styles.rowBase, gap && index > 0 ? styles.rowGap : null]}>
				{React.Children.toArray(children)
					.filter((child) => !!child)
					.map((child, columnIndex) => {
						return React.cloneElement(child as any, { gap, index: columnIndex } as IGridColumn & IGridHidden);
					})}
			</View>
		);
	}
}
