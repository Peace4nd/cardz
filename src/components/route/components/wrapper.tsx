import { faArrowLeft, faCartPlus, faEllipsisV, faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Animated, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { Input } from "../..";
import { Color, Size } from "../../../styles";
import strings from "../../../utils/strings";
import Header, { IHeaderAction, IHeaderActionMenuItem } from "../../header";
import Loading from "../../loading";
import Navigation from "../../navigation";
import styles from "../styles";

interface IRouteState {
	searchActive: boolean;
	searchText: string;
}

/**
 * Dostupne vlastnosti
 */
export interface IRoute {
	/**
	 * Nadpis
	 */
	title: string;

	/**
	 * Podnadpis
	 */
	subtitle?: string;

	/**
	 * Funkce
	 */
	features?: {
		/**
		 * Zpet
		 */
		back?: boolean;

		/**
		 * Vyhledavani
		 */
		search?: {
			/**
			 * Povoleno
			 */
			enabled: boolean;

			/**
			 * Callback
			 */
			callback: (text: string) => void;
		};

		/**
		 * Menu
		 */
		menu?: {
			/**
			 * Povoleni
			 */
			enabled: boolean;

			/**
			 * Doplnkove polozky
			 */
			items?: IHeaderActionMenuItem[];
		};

		/**
		 * Doplnkove akce
		 */
		actions?: IHeaderAction[];
	};

	/**
	 * Zaneprazdneno
	 */
	busy?: boolean;

	/**
	 * Skrolovani
	 */
	scrollable?: boolean;
}

/**
 * Obecna routa
 */
export default class Route extends React.PureComponent<IRoute, IRouteState> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IRoute = {
		busy: false,
		features: {
			actions: [],
			back: false,
			menu: {
				enabled: false,
				items: []
			},
			search: {
				callback: null,
				enabled: false
			}
		},
		scrollable: false,
		subtitle: null,
		title: null
	};

	/**
	 * Vychozi stav
	 */
	public state: IRouteState = {
		searchActive: false,
		searchText: ""
	};

	/**
	 * Animacni hodnota
	 */
	private toggle = new Animated.Value(0);

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { features, subtitle, title } = this.props;
		const { searchText } = this.state;
		// definice
		const preparedActions: IHeaderAction[] = [];
		// doplnkove akce
		if (Array.isArray(features.actions)) {
			preparedActions.push(...features.actions);
		}
		// vyhledavani
		if (features.search?.enabled) {
			preparedActions.push({
				icon: faSearch,
				onPress: this.handleSearchToggle,
				type: "press"
			});
		}
		// menu
		if (features.menu?.enabled) {
			preparedActions.push({
				icon: faEllipsisV,
				items: [
					{
						label: strings("optionsTitle"),
						path: "/options",
						type: "path"
					},
					{
						label: strings("statsTitle"),
						path: "/stats",
						type: "path"
					},
					...(features.menu?.items || [])
				],
				type: "menu"
			});
		}
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<StatusBar barStyle="default" backgroundColor={Color.Dark} />
				<SafeAreaView style={styles.wrapper}>
					<Header
						title={title}
						subtitle={subtitle}
						back={
							features.back
								? {
										icon: faArrowLeft,
										path: "/overview",
										type: "path"
								  }
								: null
						}
						actions={preparedActions}
					/>
					{this.renderContent()}
					<Navigation
						tabs={[
							{
								icon: faListUl,
								label: strings("navigationOverview"),
								path: "/overview"
							},
							{
								icon: faCartPlus,
								label: strings("navigationCreate"),
								path: "/create"
							}
						]}
					/>
					<Animated.View
						style={[
							styles.searchWrapper,
							{
								opacity: this.toggle,
								transform: [
									{
										translateY: this.toggle.interpolate({
											inputRange: [0, 1],
											outputRange: [-2 * Size["8x"], 0]
										})
									}
								]
							}
						]}
					>
						<Input.Text
							value={searchText}
							returnKey="search"
							onChange={(value) => this.setState({ searchText: value })}
							onSubmit={{
								handler: this.handleSearchCallback,
								reset: true
							}}
						/>
					</Animated.View>
				</SafeAreaView>
			</React.Fragment>
		);
	}

	/**
	 * Sestaveni obsahu
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderContent(): JSX.Element {
		// rozlozeni props
		const { busy, children, scrollable } = this.props;
		// loading
		if (busy) {
			return (
				<View style={[styles.contentWrapper, styles.contentBusy]}>
					<Loading />
				</View>
			);
		}
		// skrolovani
		if (scrollable) {
			return (
				<ScrollView keyboardDismissMode="on-drag" style={styles.contentWrapper} contentContainerStyle={styles.contentPadding}>
					{children}
				</ScrollView>
			);
		}
		// standardni view
		return <View style={[styles.contentWrapper, styles.contentPadding]}>{children}</View>;
	}

	/**
	 * Prepinani zobrazeni vyhledavaciho pole
	 */
	private handleSearchToggle = (): void => {
		this.setState(
			{
				searchActive: !this.state.searchActive,
				searchText: ""
			},
			() => {
				if (this.state.searchActive) {
					Animated.timing(this.toggle, {
						duration: 500,
						toValue: 1,
						useNativeDriver: true
					}).start();
				} else {
					Animated.timing(this.toggle, {
						duration: 500,
						toValue: 0,
						useNativeDriver: true
					}).start();
				}
			}
		);
	};

	private handleSearchCallback = (): void => {
		this.setState(
			{
				searchActive: !this.state.searchActive
			},
			() => {
				Animated.timing(this.toggle, {
					duration: 500,
					toValue: 0,
					useNativeDriver: true
				}).start(() => {
					this.props.features.search.callback(this.state.searchText);
				});
			}
		);
	};
}
