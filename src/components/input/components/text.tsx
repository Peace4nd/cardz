import { faTags } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput, IInputCore } from "..";
import { Color } from "../../../styles";
import Dropdown from "../../dropdown";
import Icon from "../../icon";
import Typography from "../../typography";
import styles from "../styles";

interface IInputTextState {
	value: string;
	error: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputText extends IInput<string> {
	/**
	 * Preddefinovane hodnoty
	 */
	predefined?: string[];
}

/**
 * Textovy vstup
 */
export default class InputText extends React.PureComponent<IInputText, IInputTextState> implements IInputCore {
	/**
	 * Vychozi stav
	 */
	public state: IInputTextState = {
		error: null,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputText = {
		icon: null,
		onChange: null,
		onSubmit: null,
		placeholder: null,
		returnKey: "default",
		validator: null,
		value: ""
	};

	/**
	 * Reference
	 */
	private ref: React.RefObject<TextInput> = React.createRef();

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, onSubmit, placeholder, predefined, returnKey } = this.props;
		const { error, value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, icon ? styles.wrapperIcon : null, error ? styles.wrapperError : null]}>
				{icon && <Icon style={styles.icon} definition={icon} color="Dark" />}
				<TextInput
					ref={this.ref}
					style={styles.fieldBasic}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={Color.Muted}
					onChangeText={this.handleChange}
					onSubmitEditing={this.handleSubmit}
					blurOnSubmit={onSubmit?.blur ?? true}
					returnKeyType={returnKey}
				/>
				{predefined && <Dropdown appearance="Popover" icon={faTags} items={predefined} onSelect={this.handleChange} />}
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
		this.ref.current.focus();
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
				value: ""
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
	 * @param {string} value Hodnota
	 */
	private handleChange = (value: string): void => {
		// rozlozeni props
		const { validator } = this.props;
		// aktualizace
		this.setState(
			{
				error: validator ? validator(value) : null,
				value
			},
			() => {
				this.props.onChange(this.state.value, { filled: this.state.value !== "", valid: this.state.error === null });
			}
		);
	};
}
