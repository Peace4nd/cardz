import React from "react";
import { Image as NativeImage, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { Color } from "../../styles";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IImage<B> {
	/**
	 * Zdroj
	 */
	source: string;

	/**
	 * Holy obrazek
	 */
	bare?: B;

	/**
	 * Cernobile
	 */
	grayscale?: boolean;

	/**
	 * Badge
	 */
	badge?: keyof typeof Color;

	/**
	 * Doplnkove styly
	 */
	style?: B extends true ? StyleProp<ImageStyle> : StyleProp<ViewStyle>;
}

/**
 * Obrazek
 *
 * @param {IImage | IImageBare} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Image = <B extends boolean>(props: IImage<B>): JSX.Element => {
	// rozlozeni props
	const { badge, bare, grayscale, source, style } = props;
	// overeni existence protokolu
	let uri = source;
	if (!/^(file|content):\/\//.test(source)) {
		uri = "file://" + source;
	}
	// cache busting
	if (/^file:\/\//.test(uri)) {
		uri += "?busting=" + new Date().getTime().toString();
	}
	// priprava badge
	let badgeView: JSX.Element = null;
	if (badge) {
		badgeView = <View style={[styles.badge, { backgroundColor: Color[badge] }]} />;
	}
	// holy obrazek
	if (bare === true) {
		if (grayscale) {
			return (
				<Grayscale>
					<NativeImage source={{ uri }} resizeMode="contain" style={style as StyleProp<ImageStyle>} />
				</Grayscale>
			);
		}
		return <NativeImage source={{ uri }} resizeMode="contain" style={style as StyleProp<ImageStyle>} />;
	}
	// sestaveni a vraceni
	if (grayscale) {
		return (
			<Grayscale style={[styles.wrapper, style]}>
				<NativeImage source={{ uri }} resizeMode="contain" style={styles.image} />
				{badgeView}
			</Grayscale>
		);
	}
	return (
		<View style={[styles.wrapper, style]}>
			<NativeImage source={{ uri }} resizeMode="contain" style={styles.image} />
			{badgeView}
		</View>
	);
};

// export
export default Image;
