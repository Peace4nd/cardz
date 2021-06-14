import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { IInput, IInputCore } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputSpinnerState {
	value: number;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputSpinner extends IInput<number> {
	max: number;
	min: number;
	step: number;
}

/**
 * Ciselny vstup
 */
export default class InputNumber extends React.PureComponent<IInputSpinner, IInputSpinnerState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputSpinnerState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputSpinner = {
		icon: null,
		max: Infinity,
		min: -Infinity,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		step: 1,
		validator: null,
		value: 0
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, placeholder } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, styles.wrapperSpinner, icon ? styles.wrapperIcon : null, error ? styles.wrapperError : null]}>
				{icon && <Icon style={styles.icon} definition={icon} color="Dark" />}
				<TextInput
					style={styles.fieldBasic}
					value={value ? String(value) : ""}
					placeholder={placeholder}
					placeholderTextColor={Color.Muted}
					editable={false}
				/>
				<View style={styles.buttonGroup}>
					<TouchableOpacity onPress={this.handleDecrease} style={styles.buttonElement}>
						<Icon definition={faChevronDown} color="Base" />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.handleIncrease} style={styles.buttonElement}>
						<Icon definition={faChevronUp} color="Base" />
					</TouchableOpacity>
				</View>

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
		return;
	}

	/**
	 * Zvyseni hodnoty
	 */
	private handleIncrease = (): void => {
		// rozlozeni props
		const { max, step } = this.props;
		// vypocet
		let value = this.state.value + step;
		if (value > max) {
			value = max;
		}
		// aktualizace
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: value > 0, valid: true });
			}
		);
	};

	/**
	 * Snizeni hodnoty
	 */
	private handleDecrease = (): void => {
		// rozlozeni props
		const { min, step } = this.props;
		// vypocet
		let value = this.state.value - step;
		if (value < min) {
			value = min;
		}
		// aktualizace
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: value > 0, valid: true });
			}
		);
	};
}
