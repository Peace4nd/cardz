import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

const styles = StyleSheet.create({
	contentBusy: {
		alignItems: "center",
		justifyContent: "center"
	},
	contentPadding: {
		padding: 2 * Measurement.Padding
	},
	contentWrapper: {
		flex: 1
	},
	searchActive: {
		top: Measurement.Components.Header.Height
	},
	searchWrapper: {
		alignItems: "center",
		backgroundColor: Color.Light,
		elevation: 7,
		height: Size["8x"],
		justifyContent: "center",
		left: 0,
		opacity: 0,
		padding: Measurement.Padding,
		position: "absolute",
		top: Measurement.Components.Header.Height,
		width: "100%"
	},
	wrapper: {
		backgroundColor: Color.Highlight,
		flex: 1,
		flexDirection: "column"
	}
});

export default styles;
