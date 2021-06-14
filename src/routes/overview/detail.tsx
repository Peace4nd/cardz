import { faGlassWhiskey, faPencilAlt, faShareAlt, faTrash, faWineBottle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Share, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ContextMenu, CountryFlag, Dialog, Grid, Image, Input, Rating, Route, Typography, Value } from "../../components";
import { addBottle, removeRecord, updateRecord } from "../../redux/actions/collection";
import { Color, Size } from "../../styles";
import { IDataCollection, IDataCollectionCompleteness, IDataOptions } from "../../types/data";
import { IReduxDispatch, IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import { stringify } from "../../utils/collection";
import confirm from "../../utils/confirm";
import country from "../../utils/country";
import format from "../../utils/format";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

const styles = StyleSheet.create({
	originFlag: {
		marginRight: Size["1x"]
	},
	originWrapper: {
		alignItems: "center",
		flexDirection: "row",
		height: Size["3x"]
	},
	valueMissing: {
		color: Color.Muted
	},
	valueMissingMandatory: {
		color: Color.Base
	}
});

interface IOverviewDetailState {
	opened: boolean;
	dram: number;
}

interface IOverviewDetailProps extends IReduxDispatch {
	completeness: IDataCollectionCompleteness;
	record: IDataCollection;
	options: IDataOptions;
}

interface IOverviewDetailParams {
	id: string;
}

/**
 * Detail
 */
class OverviewDetail extends Route.Content<IOverviewDetailProps, IOverviewDetailState, IOverviewDetailParams> {
	/**
	 * Vychozi stav
	 */
	public state: IOverviewDetailState = {
		dram: 0,
		opened: false
	};

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { completeness, record, options } = this.props;
		const { opened } = this.state;
		// sestaveni a vraceni
		return (
			<React.Fragment>
				<Route.Wrapper
					title={record.name}
					subtitle={record.subname}
					features={{
						back: true,
						menu: {
							enabled: true
						}
					}}
					scrollable={true}
				>
					<Grid.Wrapper>
						{/* obrazek */}
						<Grid.Row>
							<Grid.Column>
								<Image source={record.image} badge={completeness[record.id] ? "Base" : "Muted"} />
							</Grid.Column>
						</Grid.Row>
						{/* nazev */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createName")} mandatory={options.mandatory.includes("name")} formated={format.string(record.name)} />
							</Grid.Column>
						</Grid.Row>
						{/* doplnujici nazev */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createSubname")}
									mandatory={options.mandatory.includes("subname")}
									formated={format.string(record.subname)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* vyrobce */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createManufacturer")}
									mandatory={options.mandatory.includes("manufacturer")}
									formated={format.string(record.manufacturer)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* objem */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createVolume")}
									mandatory={options.mandatory.includes("volume")}
									formated={format.number(record.volume, "ml")}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* alkohol */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createAlcohol")}
									mandatory={options.mandatory.includes("alcohol")}
									formated={format.number(record.alcohol, "%")}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* barva */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createColor")} mandatory={options.mandatory.includes("color")} formated={format.array(record.color)} />
							</Grid.Column>
						</Grid.Row>
						{/* aroma */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createAroma")} mandatory={options.mandatory.includes("aroma")} formated={format.array(record.aroma)} />
							</Grid.Column>
						</Grid.Row>
						{/* chut */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createTaste")} mandatory={options.mandatory.includes("taste")} formated={format.array(record.taste)} />
							</Grid.Column>
						</Grid.Row>
						{/* sud */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createCask")} mandatory={options.mandatory.includes("cask")} formated={format.array(record.cask)} />
							</Grid.Column>
						</Grid.Row>
						{/* cena */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createPrice")}
									mandatory={options.mandatory.includes("price")}
									formated={format.number(record.price, "Kč")}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* zrani */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createRipening")}
									mandatory={options.mandatory.includes("ripening")}
									formated={format.range(record.ripening, strings("overviewRipeningYears"))}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* stat */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createOrigin")}
									mandatory={options.mandatory.includes("origin")}
									formated={format.string(record.origin)}
									render={() => (
										<View style={styles.originWrapper}>
											<CountryFlag code={record.origin} style={styles.originFlag} />
											<Typography type="Body1">{record.origin ? country[record.origin].name : null}</Typography>
										</View>
									)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* zakoupeno */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createPurchased")}
									mandatory={options.mandatory.includes("purchased")}
									formated={format.date(record.purchased)}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* hodnoceni */}
						<Grid.Row>
							<Grid.Column>
								<Value
									label={strings("createRating")}
									mandatory={options.mandatory.includes("rating")}
									formated={format.rating(record.rating)}
									render={() => <Rating value={record.rating} />}
								/>
							</Grid.Column>
						</Grid.Row>
						{/* poznamka */}
						<Grid.Row>
							<Grid.Column>
								<Value label={strings("createNotes")} mandatory={options.mandatory.includes("notes")} formated={format.string(record.notes)} />
							</Grid.Column>
						</Grid.Row>
					</Grid.Wrapper>
				</Route.Wrapper>
				{/* modal pro pridani panaku */}
				<Dialog
					opened={opened}
					title={strings("overviewDramTitle")}
					onToggle={(state) => {
						this.setState({ opened: state });
					}}
					button={{
						icon: faGlassWhiskey,
						label: strings("overviewDramDrink"),
						onPress: this.handleDramUpdate
					}}
				>
					<Input.Spinner placeholder={strings("overviewDramCount")} min={1} max={99} onChange={this.handleDramChange} />
				</Dialog>
				{/* kontextova nabidka */}
				<ContextMenu
					items={[
						{
							icon: faShareAlt,
							label: strings("overviewShare"),
							onPress: () => {
								Share.share({
									message: stringify(record),
									title: record.name
								});
							}
						},
						{
							icon: faPencilAlt,
							label: "Editovat",
							onPress: () => {
								this.redirect("/update/:id", { id: record.id });
							}
						},
						{
							icon: faGlassWhiskey,
							label: strings("overviewDramDrink"),
							onPress: () => {
								this.setState({
									opened: true
								});
							}
						},
						{
							icon: faWineBottle,
							label: strings("overviewAddBottle"),
							onPress: () => {
								this.redirect("/overview");
								this.props.dispatch(addBottle(record.id));
							}
						},
						{
							icon: faTrash,
							label: strings("overviewEditRemove"),
							onPress: confirm.delete({
								cancelable: true,
								onConfirm: () => {
									Promise.all([storage.collection.remove(record.id), assets.remove(record.image)]).then(() => {
										this.redirect("/overview");
										this.props.dispatch(removeRecord(record.id));
									});
								}
							})
						}
					]}
				/>
			</React.Fragment>
		);
	}

	/**
	 * Zmena poctu panaku
	 *
	 * @param {number} value Pocet
	 */
	private handleDramChange = (value: number): void => {
		this.setState({
			dram: value
		});
	};

	/**
	 * Aktualizace panaku
	 */
	private handleDramUpdate = (): void => {
		// rozlozeni props
		const { options, record } = this.props;
		const { dram } = this.state;
		// aktualizace zaznamu
		this.setState(
			{
				opened: false
			},
			() => {
				this.props.dispatch(
					updateRecord(record.id, {
						drunk: record.drunk + options.dram * dram
					})
				);
			}
		);
	};
}

export default connect((store: IReduxStore, props: IOverviewDetailProps & RouteComponentProps<IOverviewDetailParams>) => ({
	completeness: store.collection.completeness,
	options: store.options.values,
	record: store.collection.records.find((col) => col.id === props.match.params.id)
}))(OverviewDetail);
