import React from "react";
import { ExtractRouteParams, generatePath } from "react-router";
import { RouteComponentProps } from "react-router-native";
import { IRouterPath } from "../../../utils/router";

/**
 * Obecna routa
 */
export default abstract class RouteContent<P = unknown, S = unknown, M = unknown> extends React.PureComponent<P & RouteComponentProps<M>, S> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public abstract render(): JSX.Element;

	/**
	 * Presmerovani
	 *
	 * @param {T} path Cesta
	 * @param {ExtractRouteParams<T>} params Parametry
	 */
	public redirect<T extends IRouterPath>(path: T, params?: ExtractRouteParams<T>): void {
		this.props.history.push(generatePath(path, params));
	}

	/**
	 * Zpet
	 */
	public back = (): void => {
		this.props.history.goBack();
	};

	/**
	 * Ziskani hodnoty parametru
	 *
	 * @param {N} name Nazev parametru
	 * @returns {M[N]} Hodnota
	 */
	public getParamValue<N extends keyof M>(name: N): M[N] {
		return this.props.match?.params?.[name];
	}
}
