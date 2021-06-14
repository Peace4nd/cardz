import React from "react";
import { View } from "react-native";
import { IInput, IInputCore } from "..";
import Icon from "../../icon";
import Rating from "../../rating";
import styles from "../styles";

interface IInputRatingState {
	value: number;
}

/**
 * Dostupne vlastnosti
 */
export type IInputRating = IInput<number>;

/**
 * Hodnotici vstup
 */
export default class InputRating extends React.PureComponent<IInputRating, IInputRatingState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputRatingState = {
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputRating = {
		icon: null,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
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
		const { icon } = this.props;
		const { value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, icon ? styles.wrapperIcon : null]}>
				{icon && <Icon style={styles.icon} definition={icon} color="Dark" />}
				<View style={styles.fieldBasic}>
					<Rating value={value} onChange={this.handleChange} />
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
	 * Zmenova udalost
	 *
	 * @param {number} value Hodnota
	 */
	private handleChange = (value: number): void => {
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
