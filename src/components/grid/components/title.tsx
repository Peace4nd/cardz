import React from "react";
import { IGridHidden } from "..";
import Heading from "../../heading";

/**
 * Dostupne vlastnosti
 */
export interface IGridTitle {
	children: string;
}

/**
 * Nadpis
 */
export default class GridTitle extends React.PureComponent<IGridTitle> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IGridTitle = {
		children: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children } = this.props as IGridTitle & IGridHidden;
		// sestaveni a vraceni
		return <Heading margin={false}>{children}</Heading>;
	}
}
