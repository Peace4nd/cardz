import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link, RouteComponentProps, withRouter } from "react-router-native";
import { IRouterPath, matchRouterPath } from "../../utils/router";
import Icon from "../icon";
import Typography from "../typography";
import styles from "./styles";

/**
 * Akce
 */
export interface INavigationTab {
	icon: IconDefinition;
	path: IRouterPath;
	label: string;
}

/**
 * Dostupne vlastnosti
 */
export interface INavigation {
	tabs: INavigationTab[];
}

/**
 * Hlavicka
 */
class Navigation extends React.PureComponent<INavigation & RouteComponentProps> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: INavigation = {
		tabs: []
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { tabs, match } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				{tabs.map((tab) => {
					// overeni cesty
					const matched = matchRouterPath(tab.path, match.url);
					// sestaveni a vraceni
					return (
						<Link to={tab.path} key={tab.path} component={TouchableOpacity} style={styles.tab}>
							<Icon definition={tab.icon} color={matched ? "Highlight" : "Dark"} />
							<Typography type="Body1" style={[styles.tabText, matched ? styles.tabActive : null]}>
								{tab.label}
							</Typography>
						</Link>
					);
				})}
			</View>
		);
	}
}

export default withRouter(Navigation);
