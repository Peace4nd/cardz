import Column from "./components/column";
import Row from "./components/row";
import Title from "./components/title";
import Wrapper from "./components/wrapper";

export interface IGridHidden {
	gap?: boolean;
	index?: number;
}

export type IGridAlign = "flex-start" | "center" | "flex-end";

export default {
	Column,
	Row,
	Title,
	Wrapper
};
