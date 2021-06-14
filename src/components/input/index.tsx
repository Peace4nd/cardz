import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReturnKeyTypeOptions } from "react-native";
import Date from "./components/date";
import Image from "./components/image";
import Multiline from "./components/multiline";
import Number from "./components/number";
import Picker from "./components/picker";
import Range from "./components/range";
import Rating from "./components/rating";
import Spinner from "./components/spinner";
import Tags from "./components/tags";
import Text from "./components/text";

export interface IInputState {
	filled: boolean;
	valid: boolean;
}

/**
 * Dostupne vlastnosti
 */
export interface IInput<VI, VO = VI> {
	/**
	 * Placeholder
	 */
	placeholder?: string;

	/**
	 * Vychozi hodnota
	 */
	value?: VI;

	/**
	 * Zmena hodnoty
	 */
	onChange: (value: VO, state: IInputState) => void;

	/**
	 * Odeslani
	 */
	onSubmit?: {
		/**
		 * Resetovat hodnotu
		 */
		reset?: boolean;

		/**
		 * Zrusit zamereni
		 */
		blur?: boolean;

		/**
		 * Callback
		 */
		handler?: () => void;
	};

	/**
	 * Klavesa odeslani
	 */
	returnKey?: ReturnKeyTypeOptions;

	/**
	 * Ikona
	 */
	icon?: IconDefinition;

	/**
	 * Validator
	 */
	validator?: (value: VI) => string;
}

/**
 * Zakladni interface vstupniho pole
 */
export interface IInputCore {
	focus(): void;
}

export default {
	Date,
	Image,
	Multiline,
	Number,
	Picker,
	Range,
	Rating,
	Spinner,
	Tags,
	Text
};
