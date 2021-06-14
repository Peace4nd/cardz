import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	tab: {
		alignItems: "center",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center"
	},
	tabActive: {
		color: Color.Highlight
	},
	tabText: {
		color: Color.Dark,
		marginTop: Measurement.Padding
	},
	wrapper: {
		backgroundColor: Color.Base,
		elevation: 8,
		flexDirection: "row",
		height: Measurement.Components.Navigation.Height,
		justifyContent: "space-evenly"
	}
});

export default styles;
