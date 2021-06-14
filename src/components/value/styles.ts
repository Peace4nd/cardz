import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	label: {
		marginBottom: Measurement.Padding / 2
	},
	valueMissing: {
		color: Color.Muted
	},
	valueMissingMandatory: {
		color: Color.Base
	},
	wrapper: {
		flex: 1,
		width: "100%"
	}
});

export default styles;
