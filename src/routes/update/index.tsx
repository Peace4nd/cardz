import { faCheck, faCity, faComments, faImage, faPencilAlt, faSmile, faTags } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Keyboard, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Form, Route } from "../../components";
import { updateRecord } from "../../redux/actions/collection";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxDispatch, IReduxStore } from "../../types/redux";
import strings from "../../utils/strings";

interface IUpdateState {
	record: IDataCollection;
	changed: Partial<Record<keyof IDataCollection, boolean>>;
	working: boolean;
}

interface IUpdateProps extends IReduxDispatch {
	options: IDataOptions;
	record: IDataCollection;
}

interface IUpdateParams {
	id: string;
}

/**
 * Editace
 */
class Update extends Route.Content<IUpdateProps, IUpdateState, IUpdateParams> {
	/**
	 * Vychozi stav
	 */
	public state: IUpdateState = {
		changed: {},
		record: null,
		working: false
	};

	/**
	 * Vlastnosti hlavicky
	 *
	 * @returns {IHeader} Vlastnosti
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { options, record } = this.props;
		const { changed, working } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				title={record.name}
				features={{
					actions: [
						{
							disabled: working || Object.values(changed).length === 0,
							icon: faCheck,
							onPress: this.handleSave,
							type: "press"
						}
					],
					back: true
				}}
				busy={working}
				scrollable={true}
			>
				<Form<IDataCollection>
					values={record}
					fields={[
						{
							icon: faImage,
							name: "images",
							placeholder: strings("createImages"),
							type: "image"
						},
						{
							icon: faTags,
							items: options.category,
							name: "category",
							placeholder: strings("createCategory"),
							type: "tags"
						},

						// "createCoordinates": "GPS souřadnice",

						{
							icon: faPencilAlt,
							name: "name",
							placeholder: strings("createName"),
							type: "text"
						},
						{
							icon: faCity,
							name: "city",
							placeholder: strings("createCity"),
							type: "text"
						},
						{
							name: "visited",
							placeholder: strings("createVisited"),
							type: "date"
						},
						{
							icon: faSmile,
							name: "rating",
							placeholder: strings("createRating"),
							type: "rating"
						},
						{
							icon: faComments,
							lines: 5,
							name: "notes",
							placeholder: strings("createNotes"),
							type: "multiline"
						},
						{
							name: "id",
							type: "hidden"
						}
					]}
					onChange={(values, field) => {
						this.setState({
							changed: {
								...changed,
								[field]: true
							},
							record: values
						});
					}}
				/>
			</Route.Wrapper>
		);
	}

	/**
	 * Ulozeni
	 */
	private handleSave = (): void => {
		// rozlozni props
		const { changed, record } = this.state;
		// schovani klavesnice
		Keyboard.dismiss();
		// definice
		const update: Partial<IDataCollection> = {};
		const changes = Object.keys(changed) as Array<keyof IDataCollection>;
		// sestaveni aktualizovanyh dat
		for (const change of changes) {
			update[change as string] = record[change];
		}
		// pomocnik pro ulozeni
		const saveHelper = (): void => {
			// redux
			this.props.dispatch(updateRecord(record.id, update));
			// presmerovani
			this.redirect("/overview/:id", { id: record.id });
			// notifikace
			ToastAndroid.show(strings("updateSaveDone"), ToastAndroid.LONG);
		};
		// aktualizace
		if (changes.includes("images")) {
			// TODO - dodelat editaci obrazku
			/* assets.create(update.images, record.id).then((path) => {
				update.images = path;
				saveHelper();
			});*/
		} else {
			saveHelper();
		}
	};
}

export default connect((store: IReduxStore, props: IUpdateProps & RouteComponentProps<IUpdateParams>) => ({
	options: store.options.values,
	record: store.collection.records.find((col) => col.id === props.match.params.id)
}))(Update);
