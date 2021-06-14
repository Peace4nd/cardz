import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBox, faFlask, faGlassCheers, faGlassWhiskey, faListUl, faPalette } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button, ButtonGroup, Grid, Input, Route, Spacer, Tags, Typography } from "../../components";
import { loadBackup } from "../../redux/actions/backup";
import { loadRecords } from "../../redux/actions/collection";
import { signResolved } from "../../redux/actions/google";
import { loadOptions, updateOptions } from "../../redux/actions/options";
import { IDataCollection, IDataOptions, IDataOptionsProperties } from "../../types/data";
import { IReduxBackup, IReduxDispatch, IReduxGoogle, IReduxStore } from "../../types/redux";
import assets from "../../utils/assets";
import ga, { IGoogleDriveFile } from "../../utils/google";
import storage, { DATABASE } from "../../utils/storage";
import strings from "../../utils/strings";

interface IOptionsState {
	properties: Record<IDataOptionsProperties, string>;
	cask: string;
	backupWorking: boolean;
	backupDownload: boolean;
	backupUpload: boolean;
}

interface IOptionsProps extends IReduxDispatch {
	backup: IReduxBackup;
	collection: IDataCollection[];
	google: IReduxGoogle;
	options: IDataOptions;
}

/**
 * Doplnkove styly
 */
const styles = StyleSheet.create({
	googleAvatar: {
		height: 64,
		width: 64
	}
});

/**
 * Nastaveni
 */
class Options extends Route.Content<IOptionsProps, IOptionsState> {
	/**
	 * Vychozi stav
	 */
	public state: IOptionsState = {
		backupDownload: false,
		backupUpload: false,
		backupWorking: false,
		cask: null,
		properties: {
			aroma: null,
			color: null,
			taste: null
		}
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		if (!this.props.backup.loaded) {
			this.loadBackupFiles();
		}
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { backupWorking } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				title={strings("optionsTitle")}
				features={{
					back: true
				}}
				busy={backupWorking}
				scrollable={true}
			>
				{/* google ucet */}
				{this.renderGoogleSignin()}
				{/* google drive */}
				{this.renderGoogleDrive()}
				{/* velikost panaku */}
				{this.renderDram()}
				{/* senzoricke tvlastnosti */}
				{this.renderProperties()}
				{/* typ sudu */}
				{this.renderCask()}
				{/* povinne polozky kolekce */}
				{this.renderRequiredCollection()}
			</Route.Wrapper>
		);
	}

	/**
	 * Povinne polozky
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderRequiredCollection(): JSX.Element {
		// rozlozeni props
		const { options } = this.props;
		// definice
		const available: Required<Record<Exclude<keyof IDataCollection, "id" | "drunk">, string>> = {
			alcohol: strings("createAlcohol"),
			aroma: strings("createAroma"),
			cask: strings("createCask"),
			color: strings("createColor"),
			image: strings("createImage"),
			manufacturer: strings("createManufacturer"),
			name: strings("createName"),
			notes: strings("createNotes"),
			origin: strings("createOrigin"),
			price: strings("createPrice"),
			purchased: strings("createPurchased"),
			rating: strings("createRating"),
			ripening: strings("createRipening"),
			subname: strings("createSubname"),
			taste: strings("createTaste"),
			volume: strings("createVolume")
		};
		// sestaveni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsMandatoryTitle")}</Grid.Title>
				<Grid.Row>
					<Grid.Column>
						<Input.Tags
							icon={faListUl}
							items={Object.keys(available)}
							labels={available}
							value={options.mandatory}
							onChange={(mandatory) => {
								this.props.dispatch(
									updateOptions(
										{
											mandatory
										},
										"replace"
									)
								);
							}}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Prihlaseni Google
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderGoogleSignin(): JSX.Element {
		// rozlozeni props
		const { dispatch, google } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsGoogleTitle")}</Grid.Title>
				{google.signed && (
					<Grid.Row>
						<Grid.Column flex={0}>
							<Image source={{ uri: google.user.photo }} style={styles.googleAvatar} />
						</Grid.Column>
						<Grid.Column vertical="center">
							<Typography type="Headline6">{google.user.name}</Typography>
							<Typography type="Body1">{google.user.email}</Typography>
						</Grid.Column>
					</Grid.Row>
				)}
				<Grid.Row>
					<Grid.Column horizontal="center">
						<Button
							icon={faGoogle}
							label={strings("optionsGoogleSignin")}
							disabled={google.signed}
							onPress={() => {
								ga.auth.signIn().then((user) => {
									dispatch(signResolved(user));
									this.loadBackupFiles();
								});
							}}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Nacteni souboru zalohy
	 */
	private loadBackupFiles(): void {
		this.setState(
			{
				backupWorking: true
			},
			() => {
				ga.drive.list().then((files) => {
					this.setState(
						{
							backupWorking: false
						},
						() => {
							this.props.dispatch(loadBackup(files));
						}
					);
				});
			}
		);
	}

	/**
	 * Google Drive
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderGoogleDrive(): JSX.Element {
		// rozlozeni props
		const { backup, google } = this.props;
		const { backupDownload, backupUpload, backupWorking } = this.state;
		// pokud je prihlaseny google ucet
		if (google.signed) {
			return (
				<Grid.Wrapper>
					<Grid.Title>{strings("optionsDriveTitle")}</Grid.Title>
					<Grid.Row>
						<Grid.Column>
							<ButtonGroup>
								<Button label={strings("optionsDriveBackup")} disabled={backupWorking} busy={backupUpload} onPress={this.backupUpload} />
								<Button
									label={strings("optionsDriveRestore")}
									disabled={backupWorking || !backup.exist}
									busy={backupDownload}
									onPress={this.backupDownload}
								/>
							</ButtonGroup>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column horizontal="center">{this.renderBackupStats()}</Grid.Column>
					</Grid.Row>
				</Grid.Wrapper>
			);
		}
		// jinak se nic nezobrazuje
		return null;
	}

	/**
	 * Zakladni prehled o zaloze
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderBackupStats(): JSX.Element {
		// rozlozeni props
		const { backup } = this.props;
		// pokud existuje nejaka zaloha
		if (backup.exist) {
			// sestaveni
			return (
				<React.Fragment>
					<Typography type="Body2">{strings("optionsBackupCount", backup.stats.records)}</Typography>
					<Typography type="Body2">{strings("optionsBackupLast", backup.modified)}</Typography>
					<Typography type="Body2">{strings("optionsBackupSize", backup.stats.size)}</Typography>
				</React.Fragment>
			);
		}
		// zaloha neexistuje
		return <Typography type="Body2">{strings("optionsDriveEmpty")}</Typography>;
	}

	/**
	 * Panak
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderDram(): JSX.Element {
		// rozlozeni props
		const { options } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsDramTitle")}</Grid.Title>
				<Grid.Row>
					<Grid.Column>
						<Input.Number icon={faGlassWhiskey} placeholder="dram" value={options.dram} unit="ml" onChange={this.handleDram} />
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Senzoricke vlastnosti
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderProperties(): JSX.Element {
		// rozlozeni props
		const { options } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsPropertiesTitle")}</Grid.Title>
				{/* barva */}
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faPalette}
							placeholder={strings("createColor")}
							onChange={this.handlePropertiesChange.bind(this, "color")}
							onSubmit={{
								blur: false,
								handler: this.handlePropertiesAdd.bind(this, "color"),
								reset: true
							}}
						/>
						{options.properties.color.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.properties.color} onDelete={this.handlePropertiesRemove.bind(this, "color")} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
				{/* cich */}
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faFlask}
							placeholder={strings("createAroma")}
							onChange={this.handlePropertiesChange.bind(this, "aroma")}
							onSubmit={{
								blur: false,
								handler: this.handlePropertiesAdd.bind(this, "aroma"),
								reset: true
							}}
						/>
						{options.properties.aroma.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.properties.aroma} onDelete={this.handlePropertiesRemove.bind(this, "aroma")} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
				{/* chut */}
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faGlassCheers}
							placeholder={strings("createTaste")}
							onChange={this.handlePropertiesChange.bind(this, "taste")}
							onSubmit={{
								blur: false,
								handler: this.handlePropertiesAdd.bind(this, "taste"),
								reset: true
							}}
						/>
						{options.properties.taste.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.properties.taste} onDelete={this.handlePropertiesRemove.bind(this, "taste")} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Typ sudu
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderCask(): JSX.Element {
		// rozlozeni props
		const { options } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsCaskTitle")}</Grid.Title>
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faBox}
							onChange={this.handleCaskChange}
							onSubmit={{
								blur: false,
								handler: this.handleCaskAdd,
								reset: true
							}}
							placeholder={strings("optionsCaskTitle")}
						/>
						{options.cask.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.cask} onDelete={this.handleCaskRemove} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Stazeni databaze
	 *
	 * @param {IGoogleDriveFile[]} files Soubory zalohy
	 * @returns {Promise<IReduxStore>} Databaze
	 */
	private async processDownloadDatabase(files: IGoogleDriveFile[]): Promise<IReduxStore> {
		// stazeni
		const meta = files.find((file) => file.name === DATABASE);
		const data = await ga.drive.download(meta.id);
		const store = JSON.parse(data) as IReduxStore;
		// vraceni
		return store;
	}

	/**
	 * Stazeni assetu
	 *
	 * @param {string} asset Soubor
	 * @param {IGoogleDriveFile[]} files Soubory zalohy
	 */
	private async processDownloadAsset(asset: string, files: IGoogleDriveFile[]): Promise<void> {
		// stazeni
		const name = asset.split("/").pop();
		const meta = files.find((file) => file.name === name);
		const data = await ga.drive.download(meta.id);
		// ulozeni
		await assets.save(asset, data);
	}

	/**
	 * Stazeni kompletni zalohy
	 *
	 * @returns {Promise<IReduxStore>} Databaze
	 */
	private async processDownload(): Promise<IReduxStore> {
		// rozlozeni props
		const { backup } = this.props;
		// nacteni databaze
		const database = await this.processDownloadDatabase(backup.files);
		// stazeni assetu
		for (const record of database.collection.records) {
			await this.processDownloadAsset(record.image, backup.files);
		}
		// vraceni databaze
		return database;
	}

	/**
	 * Nahrani assetu
	 *
	 * @param {string} asset Soubor
	 * @param {IGoogleDriveFile[]} files Soubory zalohy
	 */
	private async processUploadAsset(asset: string, files: IGoogleDriveFile[]): Promise<void> {
		// definice
		const content = await assets.read(asset);
		const name = asset.split("/").pop();
		const index = files.findIndex((backup) => backup.name === name);
		const meta = files[index];
		// zpracovani
		if (index > -1) {
			await ga.drive.update(meta, content);
		} else {
			await ga.drive.create({ name }, content);
		}
	}

	/**
	 * Nahrani databaze
	 *
	 * @param {IGoogleDriveFile[]} files Soubory zalohy
	 */
	private async processUploadDatabase(files: IGoogleDriveFile[]): Promise<void> {
		// definice
		const content = await storage.stringify();
		const index = files.findIndex((backup) => backup.name === DATABASE);
		const meta = files[index];
		// zpracovani
		if (index > -1) {
			await ga.drive.update(meta, content, {
				properties: {
					records: this.props.collection.length
				}
			});
		} else {
			await ga.drive.create(
				{
					name: DATABASE,
					properties: {
						records: this.props.collection.length
					}
				},
				content
			);
		}
	}

	/**
	 * Nahrani kompletni zalohy
	 *
	 * @returns {Promise<IGoogleDriveFile[]>} Seznam souboru zalohy
	 */
	private async processUpload(): Promise<IGoogleDriveFile[]> {
		// rozlozeni props
		const { backup, collection } = this.props;
		// zpracovani assetu
		if (collection.length > 0) {
			for (const record of collection) {
				await this.processUploadAsset(record.image, backup.files);
			}
		}
		// zpracovani databaze
		await this.processUploadDatabase(backup.files);
		// vraceni seznamu
		return await ga.drive.list();
	}

	/**
	 * Obnoveni ze zalohy
	 */
	private backupDownload = (): void => {
		this.setState(
			{
				backupDownload: true
			},
			() => {
				this.processDownload().then((store) => {
					this.setState(
						{
							backupDownload: false
						},
						() => {
							this.props.dispatch(loadRecords(store.collection.records));
							this.props.dispatch(loadOptions(store.options.values));
						}
					);
				});
			}
		);
	};

	/**
	 * Provedeni zalohy
	 */
	private backupUpload = (): void => {
		this.setState(
			{
				backupUpload: true
			},
			() => {
				this.processUpload().then((files) => {
					this.setState(
						{
							backupUpload: false
						},
						() => {
							this.props.dispatch(loadBackup(files));
						}
					);
				});
			}
		);
	};

	/**
	 * Zmena objemu frtanu
	 *
	 * @param {number} value Objem
	 */
	private handleDram = (value: number): void => {
		this.props.dispatch(
			updateOptions({
				dram: value
			})
		);
	};

	/**
	 * Zadani lastnosti
	 *
	 * @param {IDataOptionsProperties} section Sekce
	 * @param {string} value Text
	 */
	private handlePropertiesChange(section: IDataOptionsProperties, value: string): void {
		this.setState({
			properties: {
				...this.state.properties,
				[section]: value
			}
		});
	}

	/**
	 * Pridani vlastnosti do databaze
	 *
	 * @param {IDataOptionsProperties} section Sekce
	 */
	private handlePropertiesAdd(section: IDataOptionsProperties): void {
		this.props.dispatch(
			updateOptions({
				properties: {
					[section]: [this.state.properties[section]]
				}
			})
		);
	}

	/**
	 * Odebrani vlastnosti z databaze
	 *
	 * @param {IDataOptionsProperties} section Sekce
	 * @param {string} value Text
	 */
	private handlePropertiesRemove(section: IDataOptionsProperties, value: string): void {
		// odstraneni tagu
		const current = this.props.options.properties[section].slice(0);
		const index = current.findIndex((item) => value === item);
		current.splice(index, 1);
		// dispatch
		this.props.dispatch(
			updateOptions(
				{
					properties: {
						[section]: current
					}
				},
				"replace"
			)
		);
	}

	/**
	 * Zadani typu sudu
	 *
	 * @param {string} value Text
	 */
	private handleCaskChange = (value: string): void => {
		this.setState({
			cask: value
		});
	};

	/**
	 * Pridani sudu do databaze
	 */
	private handleCaskAdd = (): void => {
		this.props.dispatch(
			updateOptions({
				cask: [this.state.cask]
			})
		);
	};

	/**
	 * Odebrani sudu z databaze
	 *
	 * @param {string} value Text
	 */
	private handleCaskRemove = (value: string): void => {
		// odstraneni tagu
		const current = this.props.options.cask.slice(0);
		const index = current.findIndex((item) => value === item);
		current.splice(index, 1);
		// dispatch
		this.props.dispatch(
			updateOptions(
				{
					cask: current
				},
				"replace"
			)
		);
	};
}

export default connect((store: IReduxStore) => ({
	backup: store.backup,
	collection: store.collection.records,
	google: store.google,
	options: store.options.values
}))(Options);
