import { StyleSheet } from "react-native";
import { Size } from "../../styles";

const styles = StyleSheet.create({
	buttonBase: {
		flex: 1
	},
	buttonGap: {
		marginLeft: Size["2x"]
	},
	wrapper: {
		flex: 0,
		flexDirection: "row",
		width: "100%"
	}
});

export default styles;
