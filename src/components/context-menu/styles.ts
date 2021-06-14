import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: Color.Base,
		borderRadius: Size["3x"],
		bottom: Size["4x"] + Measurement.Components.Navigation.Height,
		elevation: 4,
		height: Size["6x"],
		justifyContent: "center",
		position: "absolute",
		right: Size["4x"],
		width: Size["6x"]
	},
	menuItem: {
		alignItems: "center",
		backgroundColor: Color.Highlight,
		borderColor: Color.Muted,
		borderRadius: 100,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 2,
		flexDirection: "row",
		marginVertical: Measurement.Padding,
		paddingHorizontal: 2 * Measurement.Padding,
		paddingVertical: Measurement.Padding
	},
	menuItemLabel: {
		marginLeft: 2 * Measurement.Padding
	},
	menuWrapper: {
		alignItems: "flex-end",
		bottom: Size["4x"] + Measurement.Components.Navigation.Height + Size["6x"] + Measurement.Padding,
		position: "absolute",
		right: Size["4x"]
	}
});

export default styles;
