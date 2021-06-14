import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	actionOption: {
		padding: 2 * Measurement.Padding
	},
	actionWrapper: {
		alignItems: "center",
		flex: 0,
		justifyContent: "center",
		width: Measurement.Components.Header.Height * 0.75
	},
	sectionAction: {
		alignItems: "center",
		flexDirection: "row",
		height: Measurement.Components.Header.Height,
		justifyContent: "center",
		position: "absolute",
		top: 0
	},
	sectionActionLeft: {
		left: 0
	},
	sectionActionRight: {
		right: 0
	},
	sectionTitle: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	subtitle: {
		color: Color.Dark,
		marginTop: Measurement.Padding / 2
	},
	title: {
		color: Color.Highlight
	},
	wrapper: {
		backgroundColor: Color.Base,
		elevation: 8,
		flexDirection: "row",
		height: Measurement.Components.Header.Height
	}
});

export default styles;
