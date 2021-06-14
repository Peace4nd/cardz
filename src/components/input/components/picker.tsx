import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import { PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import React from "react";
import { View } from "react-native";
import { IInput, IInputCore } from "..";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputPickerState {
	value: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputPicker extends IInput<string> {
	items: PickerItemProps[];
}

/**
 * Vyberovy vstup
 */
export default class InputPicker extends React.PureComponent<IInputPicker, IInputPickerState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputPickerState = {
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputPicker = {
		icon: null,
		items: [],
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: null
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, items, placeholder } = this.props;
		const { value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, icon ? styles.wrapperIcon : null]}>
				{icon && <Icon style={styles.icon} definition={icon} color="Dark" />}
				<Picker
					selectedValue={value}
					style={[styles.fieldBasic, styles.fieldPicker]}
					mode="dialog"
					prompt={placeholder}
					onValueChange={this.handleChange}
				>
					{items.map((item) => (
						<Picker.Item key={item.value} {...item} />
					))}
				</Picker>
				{!value && (
					<Typography type="Body1" style={[styles.placeholder, styles.placeholderOverlay, icon ? styles.placeholderOverlayIcon : null]}>
						{placeholder}
					</Typography>
				)}
				<View style={[styles.buttonGroup, styles.buttonElement]} pointerEvents="none">
					<Icon definition={faChevronDown} color="Base" />
				</View>
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
	 * Zmena
	 *
	 * @param {string} value Hodnota
	 */
	private handleChange = (value: string): void => {
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: true, valid: true });
			}
		);
	};
}
