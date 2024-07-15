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

import Form from "./components/Edit/Form";
import CreateFormPanel from "./components/Edit/panels/CreateFormPanel";
import SettingsFormPanel from "./components/Edit/panels/SettingsFormPanel";
import SchemaFormPanel from "./components/Edit/panels/SchemaFormPanel";
import OptionFormPanel from "./components/Edit/panels/OptionFormPanel";
import PayuPaymentPanel from "./components/Edit/panels/PayuPaymentPanel";

const Edit = (props) => {
	const blockProps = useBlockProps();

	const {
		attributes: { enablePayU },
		setAttributes,
	} = props;

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
				<OptionFormPanel
					attributes={props.attributes}
					setAttributes={props.setAttributes}
				/>

				{enablePayU && (
					<PayuPaymentPanel
						attributes={props.attributes}
						setAttributes={props.setAttributes}
					/>
				)}
			</InspectorControls>
			<Form attributes={props.attributes} />
		</div>
	);
};

export default Edit;
