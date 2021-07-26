import { faCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Image as NativeImage, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import confirm from "../../utils/confirm";
import Icon from "../icon";
import styles from "./styles";

interface IImageState {
	index: number;
}

/**
 * Dostupne vlastnosti
 */
export interface IImage {
	/**
	 * Zdroj
	 */
	source: string[];

	/**
	 * Cache busting
	 */
	busting?: Date;

	onDelete?: (index: number) => void;

	/**
	 * Doplnkove styly
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * Obrazek
 *
 * @param {IImage | IImageBare} props Vlastnosti
 * @returns {JSX.Element} Element
 */
export class Image extends React.Component<IImage, IImageState> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IImage = {
		busting: new Date(),
		source: [],
		style: {}
	};

	/**
	 * Vychozi stav
	 */
	public state: IImageState = {
		index: 0
	};

	public render(): JSX.Element {
		// rozlozeni props
		const { style } = this.props;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapper, style]}>
				{this.renderImage()}
				{this.renderIndicator()}
			</View>
		);
	}

	private renderImage(): JSX.Element {
		// rozlozeni props
		const { busting, source } = this.props;
		const { index } = this.state;
		// sestaveni
		return (
			// <Swipable> => react-native-gesture-handler

			<TouchableOpacity
				onLongPress={confirm.delete({
					cancelable: true,
					description: "nejaky kes o smazani obrazku",
					onConfirm: this.handleDelete
				})}
			>
				<NativeImage source={{ uri: this.getImageUri(source[index], busting) }} resizeMode="contain" style={styles.image} />
			</TouchableOpacity>
		);
	}

	private handleDelete = (): void => {
		// rozlozeni props
		const { onDelete } = this.props;
		// akce
		if (typeof onDelete === "function") {
			onDelete(this.state.index);
		}
	};

	private renderIndicator(): JSX.Element {
		// rozlozeni props
		const { source } = this.props;
		const { index } = this.state;
		// definice
		const dots: JSX.Element[] = [];
		const count: number = source.length - 1;
		// sestaveni
		for (let i = 0; i < count; i++) {
			if (i === index) {
				dots.push(
					<TouchableOpacity onPress={this.handleIndex.bind(this, i)}>
						<Icon definition={faCircle} size="1x" color="Base" />
					</TouchableOpacity>
				);
			} else {
				dots.push(<Icon definition={faCircle} size="1x" color="Muted" />);
			}
		}
		// vraceni
		return <View>{dots}</View>;
	}

	private handleIndex(index: number): void {
		this.setState({
			index
		});
	}

	private getImageUri(source: string, busting: Date): string {
		// overeni existence protokolu
		let uri = source;
		if (!/^(file|content):\/\//.test(source)) {
			uri = "file://" + source;
		}
		// cache busting
		if (/^file:\/\//.test(uri)) {
			uri += "?busting=" + busting.getTime().toString();
		}
		// vraceni
		return uri;
	}
}

// export
export default Image;
