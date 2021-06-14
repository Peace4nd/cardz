import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

const styles = StyleSheet.create({
	icon: {
		marginRight: Measurement.Padding
	},
	label: {
		color: Color.Highlight
	},
	wrapper: {
		alignItems: "center",
		backgroundColor: Color.Base,
		borderRadius: Measurement.Radius / 2,
		elevation: 2,
		flexDirection: "row",
		height: Size["4x"],
		justifyContent: "center",
		paddingHorizontal: 2 * Measurement.Padding
	},
	wrapperDisabled: {
		backgroundColor: Color.Muted
	}
});

export default styles;
