import { faListUl } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SplashScreen from "react-native-splash-screen";
import { batch, connect } from "react-redux";
import { Collection, Grid, Icon, Route, Typography } from "../../components";
import { loadRecords } from "../../redux/actions/collection";
import { signResolved } from "../../redux/actions/google";
import { loadOptions } from "../../redux/actions/options";
import { IDataCollection, IDataCollectionCompleteness } from "../../types/data";
import { IReduxDispatch, IReduxGoogle, IReduxStore } from "../../types/redux";
import { IStorageSections } from "../../types/storage";
import ga from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOverviewCollectionProps extends IReduxDispatch {
	changed: Date;
	completeness: IDataCollectionCompleteness;
	collection: IDataCollection[];
	google: IReduxGoogle;
	init: boolean;
}

/**
 * Prehled
 */
class OverviewCollection extends Route.Content<IOverviewCollectionProps> {
	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		// rozlozeni props
		const { google, init } = this.props;
		// splash screen
		SplashScreen.hide();
		// nacteni databaze
		if (!init) {
			storage.readAll().then((data: IStorageSections) => {
				batch(() => {
					this.props.dispatch(loadRecords(data.collection.records));
					this.props.dispatch(loadOptions(data.options.values));
				});
			});
		}
		// overeni pristupu ke google sluzbam
		if (!google.resolved) {
			ga.auth
				.signInSilently()
				.then((user) => {
					this.props.dispatch(signResolved(user));
				})
				.catch(() => {
					this.props.dispatch(signResolved());
				});
		}
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { init } = this.props;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={!init}
				title={strings("applicationTitle")}
				features={{
					menu: {
						enabled: true
					},
					search: {
						callback: (text) => {
							const res = this.props.collection.filter((record) => record.name.toLowerCase().includes(text.toLowerCase().trim()));

							console.log(res);
						},
						enabled: true
					}
				}}
				scrollable={true}
			>
				{/* kolekce */}
				<Grid.Wrapper>{this.renderRecords()}</Grid.Wrapper>
			</Route.Wrapper>
		);
	}

	/**
	 * Sestaveni kolekce
	 *
	 * @returns {JSX.Element | JSX.Element[]} Element
	 */
	private renderRecords(): JSX.Element | JSX.Element[] {
		// rozlozeni props
		const { changed, collection, completeness } = this.props;
		// pokud nexistuje zaznam
		if (collection.length === 0) {
			return (
				<Grid.Row>
					<Grid.Column horizontal="center" vertical="center">
						<Icon definition={faListUl} size="9x" color="Muted" />
						<Typography type="Headline4">{strings("overviewEmpty")}</Typography>
					</Grid.Column>
				</Grid.Row>
			);
		}
		// sestaveni kolekce
		return collection.map((record) => (
			<Grid.Row key={record.id}>
				<Grid.Column>
					<Collection record={record} busting={changed} complete={completeness[record.id]} onPress={this.handleDetail} />
				</Grid.Column>
			</Grid.Row>
		));
	}

	/**
	 * Zobrazeni detailu
	 *
	 * @param {IDataCollection} record Aktualni zaznam
	 */
	private handleDetail = (record: IDataCollection): void => {
		this.redirect("/overview/:id", { id: record.id });
	};
}

export default connect((store: IReduxStore) => ({
	changed: store.collection.changed,
	collection: store.collection.records,
	completeness: store.collection.completeness,
	google: store.google,
	init: store.collection.init && store.options.init
}))(OverviewCollection);
