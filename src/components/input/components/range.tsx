import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputRangeState {
	error: string;
	valueMin: number;
	valueMax: number;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputRange extends Omit<IInput<[number, number]>, "placeholder" | "icon"> {
	placeholder: [string, string];
	icon: [IconDefinition, IconDefinition];
}

/**
 * Rozsah (nejnizsi a nejvyssi hodnota)
 */
export default class InputRange extends React.PureComponent<IInputRange, IInputRangeState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputRangeState = {
		error: null,
		valueMax: this.props?.value?.[1] || 0,
		valueMin: this.props?.value?.[0] || 0
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputRange = {
		icon: null,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: [0, 0]
	};

	/**
	 * Reference
	 */
	private ref1: React.RefObject<TextInput> = React.createRef();

	/**
	 * Reference
	 */
	private ref2: React.RefObject<TextInput> = React.createRef();

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, onSubmit, placeholder, returnKey } = this.props;
		const { error, valueMax, valueMin } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, icon ? styles.wrapperIcon : null]}>
				{icon && <Icon style={styles.icon} definition={icon[0]} color="Dark" />}
				<TextInput
					ref={this.ref1}
					style={styles.fieldBasic}
					value={valueMin ? String(valueMin) : ""}
					placeholder={placeholder[0]}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={(text) => this.handleChange("min", text)}
					onSubmitEditing={() => {
						this.ref2.current.focus();
					}}
					blurOnSubmit={onSubmit?.blur ?? true}
					returnKeyType={returnKey}
				/>
				{icon && <Icon style={styles.icon} definition={icon[1]} color="Dark" />}
				<TextInput
					ref={this.ref2}
					style={styles.fieldBasic}
					value={valueMax ? String(valueMax) : ""}
					placeholder={placeholder[1]}
					placeholderTextColor={Color.Muted}
					keyboardType="numeric"
					onChangeText={(text) => this.handleChange("max", text)}
					onSubmitEditing={this.handleSubmit}
					blurOnSubmit={onSubmit?.blur ?? true}
					returnKeyType={returnKey}
				/>
				{error && (
					<Typography type="Subtitle2" style={styles.error}>
						{error}
					</Typography>
				)}
			</View>
		);
	}

	/**
	 * Zamereni
	 */
	public focus(): void {
		this.ref1.current.focus();
	}

	/**
	 * Odeslani hodnoty
	 */
	private handleSubmit = (): void => {
		// rozlozeni props
		const { onSubmit } = this.props;
		// reset hodnoty
		if (onSubmit.reset) {
			this.setState({
				valueMax: 0,
				valueMin: 0
			});
		}
		// handler
		if (typeof onSubmit?.handler === "function") {
			onSubmit.handler();
		}
	};

	/**
	 * Zmenova udalost
	 *
	 * @param {"min"|"max"} type Typ
	 * @param {string} value Hodnota
	 */
	private handleChange(type: "min" | "max", value: string): void {
		// rozlozeni props
		const { validator } = this.props;
		const { valueMax, valueMin } = this.state;
		// priprava
		const parsed = parseInt(value, 10) || 0;
		const updatedValueMax = type === "max" ? parsed : valueMax;
		const updatedValueMin = type === "min" ? parsed : valueMin;
		// aktualizace
		this.setState(
			{
				error: validator ? validator([updatedValueMin, updatedValueMax]) : null,
				valueMax: updatedValueMax,
				valueMin: updatedValueMin
			},
			() => {
				const current: [number, number] = [updatedValueMin, updatedValueMax];
				this.props.onChange(current, { filled: current.reduce((prev, cur) => prev + cur, 0) > 0, valid: this.state.error === null });
			}
		);
	}
}
