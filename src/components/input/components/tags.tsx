import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { View } from "react-native";
import { IInput, IInputCore } from "..";
import Dropdown from "../../dropdown";
import Icon from "../../icon";
import Tags from "../../tags";
import Typography from "../../typography";
import styles from "../styles";

interface IInputTagsState {
	value: string[];
}

/**
 * Dostupne vlastnosti
 */
export interface IInputTags extends IInput<string[]> {
	/**
	 * Polozky
	 */
	items: string[];

	/**
	 * Popisky hodnot
	 */
	labels?: Record<string, string>;
}

/**
 * Vyberovy vstup
 */
export default class InputTags extends React.PureComponent<IInputTags, IInputTagsState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputTagsState = {
		value: this.props.value || []
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputTags = {
		icon: null,
		items: [],
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: []
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, items, labels, placeholder } = this.props;
		const { value } = this.state;
		// vyfiltrovani pouzitych hodnot
		const filtered = (items || []).filter((item) => !value.includes(item));
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, icon ? styles.wrapperIcon : null, styles.wrapperButton, styles.wrapperSpring]}>
				{icon && <Icon style={styles.icon} definition={icon} color="Dark" />}
				{value.length === 0 && (
					<Typography type="Body1" style={[styles.fieldBasic, styles.fieldPlaceholder]}>
						{placeholder}
					</Typography>
				)}
				{value.length > 0 && (
					<View style={styles.fieldTags}>
						<Tags items={value} labels={labels} onDelete={this.handleRemove} />
					</View>
				)}
				<Dropdown icon={faPlus} items={filtered} labels={labels} onSelect={this.handleAdd} />
			</View>
		);
	}

	/**
	 * Zamereni
	 */
	public focus(): void {
		return;
	}

	/**
	 * Obecne zpracovani zmeny
	 *
	 * @param {string[]} value Hodnota
	 */
	private handleChange(value: string[]): void {
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: true, valid: true });
			}
		);
	}

	/**
	 * Pridani
	 *
	 * @param {string} value Hodnota
	 */
	private handleAdd = (value: string): void => {
		this.handleChange([...this.state.value, value]);
	};

	/**
	 * Odebrani
	 *
	 * @param {string} value Hodnota
	 */
	private handleRemove = (value: string): void => {
		// definice
		const current = this.state.value.slice(0);
		const index = current.indexOf(value);
		// index existuje
		if (index > -1) {
			current.splice(index, 1);
			this.handleChange(current);
		}
	};
}
