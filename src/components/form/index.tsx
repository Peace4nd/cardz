import React from "react";
import { ReturnKeyType, View } from "react-native";
import Input, { IInputCore, IInputState } from "../input";
import { IInputDate } from "../input/components/date";
import { IInputImage } from "../input/components/image";
import { IInputMultiline } from "../input/components/multiline";
import { IInputNumber } from "../input/components/number";
import { IInputPicker } from "../input/components/picker";
import { IInputRange } from "../input/components/range";
import { IInputRating } from "../input/components/rating";
import { IInputTags } from "../input/components/tags";
import { IInputText } from "../input/components/text";
import styles from "./styles";

type IFormStateValues<V> = Partial<Record<keyof V, { value: unknown; state: IInputState }>>;

interface IFormState<V> {
	fields: IFormStateValues<V>;
}

export interface IFormFieldShared<V> {
	name: keyof V;
}

export interface IFormFieldDate<V> extends IFormFieldShared<V>, Omit<IInputDate, "onChange" | "value"> {
	type: "date";
}

export interface IFormFieldImage<V> extends IFormFieldShared<V>, Omit<IInputImage, "onChange" | "value"> {
	type: "image";
}

export interface IFormFieldMultiline<V> extends IFormFieldShared<V>, Omit<IInputMultiline, "onChange" | "value"> {
	type: "multiline";
}

export interface IFormFieldNumber<V> extends IFormFieldShared<V>, Omit<IInputNumber, "onChange" | "value"> {
	type: "number";
}

export interface IFormFieldPicker<V> extends IFormFieldShared<V>, Omit<IInputPicker, "onChange" | "value"> {
	type: "picker";
}

export interface IFormFieldRange<V> extends IFormFieldShared<V>, Omit<IInputRange, "onChange" | "value"> {
	type: "range";
}

export interface IFormFieldRating<V> extends IFormFieldShared<V>, Omit<IInputRating, "onChange" | "value"> {
	type: "rating";
}

export interface IFormFieldText<V> extends IFormFieldShared<V>, Omit<IInputText, "onChange" | "value"> {
	type: "text";
}

export interface IFormFieldTags<V> extends IFormFieldShared<V>, Omit<IInputTags, "onChange" | "value"> {
	type: "tags";
}

export interface IFormFieldHidden<V> extends IFormFieldShared<V> {
	type: "hidden";
	value?: unknown;
}

export type IFormField<V> =
	| IFormFieldDate<V>
	| IFormFieldImage<V>
	| IFormFieldMultiline<V>
	| IFormFieldNumber<V>
	| IFormFieldPicker<V>
	| IFormFieldRange<V>
	| IFormFieldRating<V>
	| IFormFieldText<V>
	| IFormFieldTags<V>
	| IFormFieldHidden<V>;

/**
 * Dostupne vlastnosti
 */
export interface IForm<V> {
	/**
	 * Definice poli
	 */
	fields: Array<IFormField<V>>;

	/**
	 * Zmenova udalost
	 */
	onChange: (values: V, field: keyof V) => void;

	/**
	 * Vychozi hodnoty
	 */
	values?: V;
}

/**
 * Formular
 *
 * @returns {JSX.Element} Element
 */
export default class Form<V> extends React.PureComponent<IForm<V>, IFormState<V>> {
	/**
	 * Vychozi stav
	 */
	public state: IFormState<V> = {
		fields: this.createDefaultValues()
	};

	/**
	 * Reference na pole
	 */
	private fields: IInputCore[] = [];

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { fields } = this.props;
		// definice
		const visible = fields.filter((field) => field.type !== "hidden");
		const count = visible.length;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				{visible.map((field, index) => (
					<React.Fragment key={index}>
						{index > 0 && <View style={styles.rowGap} />}
						{this.renderField(field, index, count - 1 === index)}
					</React.Fragment>
				))}
			</View>
		);
	}

	/**
	 * Sestaveni vstupniho pole
	 *
	 * @param {IFormField<V>} field Pole
	 * @param {number} index Index
	 * @param {boolean} last Posledni
	 * @returns {JSX.Element} Element
	 */
	private renderField(field: IFormField<V>, index: number, last: boolean): JSX.Element {
		// rozlozeni props
		const { fields } = this.state;
		const { name, type, ...rest } = field;
		// definice
		const returnKey: ReturnKeyType = last ? "done" : "next";
		// sestaveni
		switch (type) {
			case "date":
				return (
					<Input.Date
						{...(rest as IInputDate)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as Date}
						onChange={(...input) => this.handleChange(name, ...input)}
					/>
				);
			case "image":
				return (
					<Input.Image
						{...(rest as IInputImage)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as string}
						onChange={(...input) => this.handleChange(name, ...input)}
					/>
				);
			case "multiline":
				return (
					<Input.Multiline
						{...(rest as IInputMultiline)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as string}
						onChange={(...input) => this.handleChange(name, ...input)}
						returnKey={returnKey}
						onSubmit={{
							handler: () => {
								this.handleFocus(index);
							}
						}}
					/>
				);
			case "number":
				return (
					<Input.Number
						{...(rest as IInputNumber)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as number}
						onChange={(...input) => this.handleChange(name, ...input)}
						returnKey={returnKey}
						onSubmit={{
							handler: () => {
								this.handleFocus(index);
							}
						}}
					/>
				);
			case "picker":
				return (
					<Input.Picker
						{...(rest as IInputPicker)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as string}
						onChange={(...input) => this.handleChange(name, ...input)}
					/>
				);
			case "rating":
				return (
					<Input.Rating
						{...(rest as IInputRating)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as number}
						onChange={(...input) => this.handleChange(name, ...input)}
					/>
				);
			case "range":
				return (
					<Input.Range
						{...(rest as IInputRange)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as [number, number]}
						onChange={(...input) => this.handleChange(name, ...input)}
						returnKey={returnKey}
						onSubmit={{
							handler: () => {
								this.handleFocus(index);
							}
						}}
					/>
				);
			case "tags":
				return (
					<Input.Tags
						{...(rest as IInputTags)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as string[]}
						onChange={(...input) => this.handleChange(name, ...input)}
						returnKey={returnKey}
						onSubmit={{
							handler: () => {
								this.handleFocus(index);
							}
						}}
					/>
				);
			case "text":
				return (
					<Input.Text
						{...(rest as IInputText)}
						ref={(ref) => {
							this.fields[index] = ref;
						}}
						value={fields[name].value as string}
						onChange={(...input) => this.handleChange(name, ...input)}
						returnKey={returnKey}
						onSubmit={{
							handler: () => {
								this.handleFocus(index);
							}
						}}
					/>
				);
		}
		// v pripade ze je pole skryte
		return null;
	}

	/**
	 * Posun zamereni pole
	 *
	 * @param {number} index Index
	 */
	private handleFocus(index: number): void {
		if (this.fields[index + 1]) {
			this.fields[index + 1].focus();
		}
	}

	/**
	 * Priprava vychozich hodnot
	 *
	 * @returns {IFormStateValues<V>} Hodnoty
	 */
	private createDefaultValues(): IFormStateValues<V> {
		// rozlozeni props
		const { values } = this.props;
		// definice
		const defaults: IFormStateValues<V> = {};
		// prochazeni jednotlivych poli
		for (const field of this.props.fields) {
			// vychozi hodnota
			let value: unknown = null;
			switch (field.type) {
				case "date":
				case "image":
				case "picker":
					value = null;
					break;
				case "multiline":
				case "text":
					value = "";
					break;
				case "number":
				case "rating":
					value = 0;
					break;
				case "range":
					value = [0, 0];
					break;
				case "hidden":
					value = field.value;
					break;
			}
			// preddefinovana
			if (values?.[field.name] !== undefined) {
				value = values[field.name];
			}
			// naplneni
			defaults[field.name] = {
				state: {
					filled: false,
					valid: false
				},
				value
			};
		}
		// vraceni
		return defaults;
	}

	/**
	 * Ziskani aktualnich hodnot
	 *
	 * @returns {V} Hodnoty
	 */
	private getCurrentValues(): V {
		// rozlozeni props
		const { fields } = this.state;
		// definice
		const values: Record<string, unknown> = {};
		// naplneni
		for (const name in fields) {
			values[name] = fields[name].value;
		}
		// vraceni
		return values as V;
	}

	/**
	 * Zmenova udalost
	 *
	 * @param {keyof V} name Nazev pole
	 * @param {unknown} value Hodnota
	 * @param {IInputState} state Stav
	 */
	private handleChange(name: keyof V, value: unknown, state: IInputState): void {
		this.setState(
			{
				fields: {
					...this.state.fields,
					[name]: {
						state,
						value
					}
				}
			},
			() => {
				this.props.onChange(this.getCurrentValues(), name);
			}
		);
	}
}
