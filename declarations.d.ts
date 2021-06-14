/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention */

import React from "react";
import { ImageURISource, TouchableHighlightProps } from "react-native";
import { SvgProps } from "react-native-svg";

declare module "react-router-native" {
	interface LinkProps extends TouchableHighlightProps {}
}

declare module "*.png" {
	const content: ImageURISource;
	export default content;
}

declare module "*.svg" {
	const content: React.FC<SvgProps>;
	export default content;
}
