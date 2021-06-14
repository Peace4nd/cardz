import { StyleSheet } from "react-native";
import { Color, Size } from "../../styles";

const styles = StyleSheet.create({
	columnBase: {
		flexDirection: "column"
	},
	columnGap: {
		marginLeft: Size["2x"]
	},
	rowBase: {
		flex: 0,
		flexDirection: "row",
		width: "100%"
	},
	rowGap: {
		marginTop: Size["2x"]
	},
	titleBase: {
		alignItems: "center",
		borderBottomColor: Color.Base,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Size["2x"],
		paddingBottom: Size["1x"],
		width: "100%"
	},
	wrapper: {
		flex: 0,
		flexDirection: "column"
	},
	wrapperMargin: {
		marginBottom: Size["2x"]
	}
});

export default styles;
