import { faCheck, faCity, faComments, faImage, faPencilAlt, faSmile, faTags } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Keyboard, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Form, Route } from "../../components";
import { pushRecord } from "../../redux/actions/collection";
import { IDataCollection, IDataOptions } from "../../types/data";
import { IReduxDispatch, IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import strings from "../../utils/strings";

interface ICreateState {
	record: IDataCollection;
	working: boolean;
}

interface ICreateProps extends IReduxDispatch {
	options: IDataOptions;
}

/**
 * Pridani
 */
class Create extends Route.Content<ICreateProps, ICreateState> {
	/**
	 * Vychozi stav
	 */
	public state: ICreateState = {
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
		const { options } = this.props;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				title={strings("createTitle")}
				features={{
					actions: [
						{
							disabled: this.state.working,
							icon: faCheck,
							onPress: this.handleSave,
							type: "press"
						}
					],
					back: true
				}}
				busy={this.state.working}
				scrollable={true}
			>
				<Form<IDataCollection>
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
							type: "hidden",
							value: uuidv4()
						}
					]}
					onChange={(values) => {
						this.setState({
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
		// schovani klavesnice
		Keyboard.dismiss();
		// rozlozeni props
		const { id, images, ...rest } = this.state.record;
		// ulozeni
		assets.create(images[0], id).then((path) => {
			// redux
			this.props.dispatch(
				pushRecord({
					...rest,
					id,
					images: [path]
				})
			);
			// presmerovani
			this.redirect("/overview");
			// notifikace
			ToastAndroid.show(strings("createSaveDone"), ToastAndroid.LONG);
		});
	};
}

export default connect((store: IReduxStore) => ({
	options: store.options.values
}))(Create);
