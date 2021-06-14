import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

const styles = StyleSheet.create({
	badge: {
		alignItems: "center",
		height: Size["8x"],
		justifyContent: "center",
		position: "absolute",
		right: -1 * Size["4x"],
		top: -1 * Size["4x"],
		transform: [
			{
				rotate: "45deg"
			}
		],
		width: Size["8x"]
	},
	image: {
		aspectRatio: 1,
		flex: 1
	},
	wrapper: {
		alignItems: "center",
		aspectRatio: 1,
		backgroundColor: Color.White,
		borderColor: Color.Muted,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
		justifyContent: "center",
		overflow: "hidden",
		padding: 2 * Measurement.Padding,
		width: "100%"
	}
});

export default styles;
