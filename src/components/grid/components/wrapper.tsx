import React, { ReactElement } from "react";
import { View } from "react-native";
import { IGridHidden } from "..";
import Heading from "../../heading";
import styles from "../styles";
import { IGridRow } from "./row";

/**
 * Dostupne vlastnosti
 */
export interface IGridWrapper {
	children: ReactElement<IGridRow> | Array<ReactElement<IGridRow>>;
	gap?: boolean;
	margin?: boolean;
	title?: string;
}

/**
 * Wrapper
 */
export default class GridWrapper extends React.PureComponent<IGridWrapper> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IGridWrapper = {
		children: null,
		gap: true,
		margin: true
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children, gap, margin, title } = this.props;
		// sestaveni a vraceni
		return (
			<React.Fragment>
				{title && <Heading size="Headline6">{title}</Heading>}
				<View style={[styles.wrapper, margin ? styles.wrapperMargin : null]}>
					{React.Children.toArray(children)
						.filter((child) => !!child)
						.map((child, rowIndex) => {
							return React.cloneElement(child as any, { gap, index: rowIndex } as IGridRow & IGridHidden);
						})}
				</View>
			</React.Fragment>
		);
	}
}
