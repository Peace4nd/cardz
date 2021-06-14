import { StyleSheet } from "react-native";

// utility
export * from "./utils";

/**
 * Zakladni rozmer
 */
export const Root: number = 8;

/**
 * Barvy
 */
export const Color = {
	Base: "#7cb342",
	Dark: "#4b830d",
	Highlight: "#fafafa",
	Light: "#aee571",
	Muted: "#757575",
	Text: "#212121",
	White: "#ffffff"
};

/**
 * Definice velikosti
 */
export const Size = {
	"10x": Root * 10,
	"11x": Root * 11,
	"12x": Root * 12,
	"1x": Root * 1,
	"2x": Root * 2,
	"3x": Root * 3,
	"4x": Root * 4,
	"5x": Root * 5,
	"6x": Root * 6,
	"7x": Root * 7,
	"8x": Root * 8,
	"9x": Root * 9
};

/**
 * Typografie
 */
export const Typography = StyleSheet.create({
	Body1: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 16,
		letterSpacing: 0.5
	},
	Body2: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 14,
		letterSpacing: 0.25
	},
	Button: {
		color: Color.Text,
		fontFamily: "Ubuntu-Medium",
		fontSize: 14,
		letterSpacing: 1.25
	},
	Caption: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 12,
		letterSpacing: 0.4
	},
	Headline1: {
		color: Color.Text,
		fontFamily: "Ubuntu-Light",
		fontSize: 96,
		letterSpacing: -1.5
	},
	Headline2: {
		color: Color.Text,
		fontFamily: "Ubuntu-Light",
		fontSize: 60,
		letterSpacing: -0.5
	},
	Headline3: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 48,
		letterSpacing: 0
	},
	Headline4: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 34,
		letterSpacing: 0.25
	},
	Headline5: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 24,
		letterSpacing: 0
	},
	Headline6: {
		color: Color.Text,
		fontFamily: "Ubuntu-Medium",
		fontSize: 20,
		letterSpacing: 0.15
	},
	Overline: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 10,
		letterSpacing: 1.5
	},
	Subtitle1: {
		color: Color.Text,
		fontFamily: "Ubuntu-Regular",
		fontSize: 16,
		letterSpacing: 0.15
	},
	Subtitle2: {
		color: Color.Text,
		fontFamily: "Ubuntu-Medium",
		fontSize: 14,
		letterSpacing: 0.1
	}
});

/**
 * Zakladni rozmery
 */
export const Measurement = {
	Components: {
		Collection: {
			Height: 160
		},
		Header: {
			Height: Size["7x"]
		},
		Input: {
			Error: Size["3x"],
			Height: Size["6x"]
		},
		Navigation: {
			Height: Size["10x"]
		}
	},
	Padding: Size["1x"],
	Radius: Size["1x"]
};
