import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement, Size, Typography } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	// tlacitko
	buttonElement: {
		alignItems: "center",
		aspectRatio: 1,
		backgroundColor: Color.White,
		height: Measurement.Components.Input.Height,
		justifyContent: "center",
		width: Measurement.Components.Input.Height
	},
	buttonGroup: {
		bottom: 0,
		flexDirection: "row",
		position: "absolute",
		right: 0,
		top: 0
	},

	// chyba
	error: {
		backgroundColor: "red",
		borderTopLeftRadius: Measurement.Radius,
		borderTopRightRadius: Measurement.Radius,
		color: "white",
		height: Measurement.Components.Input.Error,
		left: -StyleSheet.hairlineWidth,
		paddingHorizontal: Measurement.Padding,
		position: "absolute",
		right: -StyleSheet.hairlineWidth,
		textAlignVertical: "center",
		top: -Measurement.Components.Input.Error
	},

	// pole
	fieldBasic: {
		...Typography.Body1,
		color: Color.Text,
		flex: 1,
		height: "100%",
		padding: 0,
		textAlignVertical: "center"
	},
	fieldCenter: {
		alignItems: "center",
		justifyContent: "center"
	},
	fieldMultiline: {
		paddingVertical: Measurement.Padding * 1.5,
		textAlignVertical: "top"
	},
	fieldPicker: {
		marginLeft: -Measurement.Padding,
		marginRight: -2 * Measurement.Padding
	},
	fieldPlaceholder: {
		color: Color.Muted
	},
	fieldTags: {
		flex: 1,
		paddingBottom: Measurement.Padding * 1.5,
		paddingTop: Measurement.Padding * 1.5
	},

	// ikona
	icon: {
		marginHorizontal: Measurement.Padding * 2,
		marginVertical: Measurement.Padding * 1.5
	},

	// obrazek
	image: {
		height: width / 2 - 2 * Measurement.Padding,
		width: width / 2 - 2 * Measurement.Padding
	},

	// menu
	menuItem: {
		padding: 2 * Measurement.Padding
	},
	menuScroll: {
		maxHeight: 2 * Size["12x"]
	},

	// placeholder
	placeholder: {
		color: Color.Muted,
		textAlign: "left",
		textAlignVertical: "center"
	},
	placeholderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.White,
		marginLeft: Size["2x"],
		marginRight: Size["6x"]
	},
	placeholderOverlayIcon: {
		marginLeft: Size["7x"]
	},

	// jednotka
	unit: {
		color: Color.Muted,
		flex: 0,
		height: Measurement.Components.Input.Height,
		lineHeight: Measurement.Components.Input.Height,
		textAlign: "right",
		textAlignVertical: "center",
		width: Measurement.Components.Input.Height
	},

	// wrapper
	wrapperBasic: {
		alignItems: "flex-start",
		backgroundColor: Color.White,
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		height: Measurement.Components.Input.Height,
		overflow: "hidden",
		paddingHorizontal: Measurement.Padding * 2,
		width: "100%"
	},
	wrapperButton: {
		paddingRight: Measurement.Components.Input.Height
	},
	wrapperCenter: {
		alignItems: "center"
	},
	wrapperError: {
		borderColor: "red",
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		marginTop: Measurement.Components.Input.Error
	},
	wrapperIcon: {
		paddingLeft: 0
	},
	wrapperImage: {
		alignItems: "center",
		height: width / 2,
		justifyContent: "center",
		paddingVertical: Measurement.Padding * 2
	},
	wrapperMultiline: {
		alignItems: "flex-start"
	},
	wrapperSpinner: {
		paddingRight: Measurement.Components.Input.Height * 2
	},
	wrapperSpring: {
		height: "auto",
		minHeight: Measurement.Components.Input.Height
	}
});

export default styles;
