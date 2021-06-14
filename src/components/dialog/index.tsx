import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { Header } from "..";
import Button, { IButton } from "../button";
import Icon from "../icon";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IDialog {
	/**
	 * Otevreno
	 */
	opened: boolean;

	/**
	 *
	 */
	onToggle: (opened: boolean) => void;

	/**
	 * Nadpis
	 */
	title?: string;

	/**
	 * Cela obrazovka
	 */
	fullscreen?: boolean;

	/**
	 * Tlacitko
	 */
	button?: IButton;
}

/**
 * Dialogove okno
 */
export default class Dialog extends React.PureComponent<IDialog> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { button, children, fullscreen, onToggle, opened, title } = this.props;
		// sestaveni a vraceni
		return (
			<Modal animationType="fade" transparent={true} visible={opened} onRequestClose={() => onToggle(false)}>
				<MenuProvider skipInstanceCheck={true}>
					{fullscreen && (
						<Header
							title={title}
							actions={[
								{
									icon: faTimes,
									onPress: () => onToggle(false),
									type: "press"
								}
							]}
						/>
					)}
					<View style={[styles.wrapper, fullscreen ? styles.wrapperFullscreen : null]}>
						<View style={[styles.contentWrapper, fullscreen ? styles.contentWrapperFullscreen : null]}>
							{title && (
								<View style={styles.contentTitle}>
									<Typography type="Headline6">{title}</Typography>
									<TouchableOpacity onPress={() => onToggle(false)}>
										<Icon definition={faTimes} color="Base" />
									</TouchableOpacity>
								</View>
							)}
							<View style={styles.contentChildren}>{children}</View>
							{button && (
								<View style={styles.contentButton}>
									<Button {...button} />
								</View>
							)}
						</View>
					</View>
				</MenuProvider>
			</Modal>
		);
	}
}
