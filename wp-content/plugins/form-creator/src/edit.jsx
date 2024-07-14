/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import {
	PanelBody,
	CheckboxControl,
	TextControl,
	PanelRow,
	FontSizePicker,
	ColorPalette,
	RangeControl,
	ColorPicker,
} from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import Form from "./components/Form/Form";
import CreateFormPanel from "./components/panels/CreateFormPanel";
import SettingsFormPanel from "./components/panels/SettingsFormPanel";
import SchemaFormPanel from "./components/panels/SchemaFormPanel";

const Edit = (props) => {
	const blockProps = useBlockProps();

	const {
		attributes: {
			formTitle,
			titleFormPayU,
			fields,
			btnTitle,
			enablePayU,
			labelService,
			labelOptions,
			titleCost,
			fontSizeTitle,
			colorTitle,

			paddingTable,
			gapRow,
			gapColumn,
			marginBottomTitle,
			paddingInlineButton,
			paddingBlockButton,
			sizeTextButton,
			colorTextButton,
			colorBgButton,
			hoverColorBgButton,
			hoverColorTextButton,
			marginTopBtn,
			alignment,
			alignmentBtn,
			colorBgTable,
		},
		setAttributes,
	} = props;

	const handleServiceOptionsChange = (value) => {
		setAttributes({ labelOptions: value });
	};
	return (
		<div {...blockProps}>
			<InspectorControls key={"Setting"}>
				<CreateFormPanel
					attributes={props.attributes}
					setAttributes={props.setAttributes}
				/>
				<SettingsFormPanel
					attributes={props.attributes}
					setAttributes={props.setAttributes}
				/>
				<SchemaFormPanel
					attributes={props.attributes}
					setAttributes={props.setAttributes}
				/>

				<PanelBody title="PayU Payment Settings" initialOpen={false}>
					<CheckboxControl
						label="Enable PayU Payment"
						checked={enablePayU}
						onChange={(isChecked) => setAttributes({ enablePayU: isChecked })}
					/>
					{enablePayU && (
						<>
							<PanelRow className="titleRow">Create Form PayU</PanelRow>
							<TextControl
								label="Set Label"
								value={labelService}
								placeholder="Choose service"
								onChange={(value) => setAttributes({ labelService: value })}
							/>
							<TextControl
								help="(comma separated, format: Name service: value service)"
								label="Set Label Options "
								value={labelOptions}
								onChange={handleServiceOptionsChange}
							/>
							<TextControl
								label="Set Title Cost"
								value={titleCost}
								onChange={(value) => setAttributes({ titleCost: value })}
							/>
							<TextControl
								label="Set Title Form PayU"
								placeholder="Dane do płatności"
								value={titleFormPayU}
								onChange={(value) => setAttributes({ titleFormPayU: value })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<Form
				title={formTitle}
				fields={fields}
				btnTitle={btnTitle}
				enablePayU={enablePayU}
				titleFormPayU={titleFormPayU}
				labelService={labelService}
				labelOptions={labelOptions}
				titleCost={titleCost}
				fontSizeTitle={fontSizeTitle}
				colorTitle={colorTitle}
				paddingTable={paddingTable}
				gapRow={gapRow}
				gapColumn={gapColumn}
				marginBottomTitle={marginBottomTitle}
				paddingInlineButton={paddingInlineButton}
				paddingBlockButton={paddingBlockButton}
				sizeTextButton={sizeTextButton}
				colorTextButton={colorTextButton}
				colorBgButton={colorBgButton}
				hoverColorBgButton={hoverColorBgButton}
				hoverColorTextButton={hoverColorTextButton}
				marginTopBtn={marginTopBtn}
				alignment={alignment}
				alignmentBtn={alignmentBtn}
				colorBgTable={colorBgTable}
			/>
		</div>
	);
};

export default Edit;
