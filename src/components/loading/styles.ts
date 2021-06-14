import { StyleSheet } from "react-native";
import { Color, opacify, Size } from "../../styles";

const styles = StyleSheet.create({
	indicator: {
		borderBottomColor: Color.Base,
		borderLeftColor: Color.Highlight,
		borderRadius: Size["3x"],
		borderRightColor: Color.Base,
		borderTopColor: Color.Base,
		borderWidth: 4,
		height: Size["6x"],
		width: Size["6x"]
	},
	wrapper: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		backgroundColor: opacify(Color.Highlight, 0.75),
		justifyContent: "center"
	}
});

export default styles;
