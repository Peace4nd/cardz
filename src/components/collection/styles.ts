import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

const styles = StyleSheet.create({
	image: {
		aspectRatio: 3 / 4,
		flex: 0,
		height: "100%"
	},
	info: {
		flex: 1,
		flexDirection: "column",
		padding: Measurement.Padding
	},
	infoAdditional: {
		alignItems: "center",
		flex: 0,
		flexDirection: "row",
		height: Size["4x"],
		justifyContent: "space-between",
		marginTop: Measurement.Padding
	},
	infoManufacturer: {
		flex: 1,
		marginTop: Measurement.Padding
	},
	infoName: {
		flex: 0
	},
	infoRipening: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center"
	},
	infoSubname: {
		color: Color.Muted,
		flex: 0,
		marginTop: Measurement.Padding / 2
	},
	status: {
		flex: 0,
		flexDirection: "column",
		flexWrap: "wrap",
		height: "100%",
		padding: Measurement.Padding
	},
	statusItem: {
		alignItems: "center",
		flex: 0,
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: Measurement.Padding,
		width: Size["6x"]
	},
	statusItemIcon: {
		flex: 0,
		marginRight: Measurement.Padding
	},
	statusItemValue: {
		flex: 1
	},
	wrapper: {
		backgroundColor: Color.White,
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 4,
		flex: 1,
		flexDirection: "row",
		height: Measurement.Components.Collection.Height,
		overflow: "hidden",
		padding: Measurement.Padding
	},
	wrapperPressed: {
		opacity: 0.2
	}
});

export default styles;
