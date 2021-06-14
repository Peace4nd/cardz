import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

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

	// menu
	menuItem: {
		padding: 2 * Measurement.Padding
	},
	menuScroll: {
		backgroundColor: "transparent",
		maxHeight: 2 * Size["12x"]
	}
});

export default styles;
