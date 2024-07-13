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
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";

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
	SelectControl,
	Button,
	FontSizePicker,
	ColorPalette,
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
import { useEffect, useState } from "@wordpress/element";
import EditField from "./components/PanelEdit/EditField";

const Edit = (props) => {
	const blockProps = useBlockProps();
	const [fieldLabel, setFieldLabel] = useState("");
	const [fieldType, setFieldType] = useState("text");
	const [options, setOptions] = useState("");
	const [addInNewLine, setAddInNewLine] = useState(false);
	// const [labelOptions, setLabelOptions] = useState(
	// 	"Turniej A - 200pln:200, Turniej B - 500pln:500, Turniej C - 1000pln:1000",
	// );
	// const [titleCost, setTitleCost] = useState("Cost Service");

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
			fontSizeLabels,
			colorLabels,
		},
		setAttributes,
	} = props;

	const addField = () => {
		const newField = { label: fieldLabel, type: fieldType };
		if (fieldType === "select") {
			newField.options = options.split(",").map((opt) => opt.trim());
		}
		if (addInNewLine) {
			setAttributes({ fields: [...fields, [newField]] });
		} else {
			const updatedFields = [...fields];
			updatedFields[updatedFields.length - 1].push(newField);
			setAttributes({ fields: updatedFields });
		}

		setFieldLabel("");
		setFieldType("text");
		setOptions("");
	};

	const removeField = (rowIndex, index) => {
		const newFields = [...fields];
		newFields[rowIndex].splice(index, 1);
		if (newFields[rowIndex].length === 0) {
			newFields.splice(rowIndex, 1);
		}
		setAttributes({ fields: newFields });
	};

	const handleChange = (value, rowIndex, index) => {
		const newFields = [...fields];
		newFields[rowIndex][index].label = value;
		setAttributes({ fields: newFields });
	};

	const handleFieldChangeType = (value, rowIndex, index) => {
		const newFields = [...fields];
		newFields[rowIndex][index].type = value;
		setAttributes({ fields: newFields });
	};

	const handleOptionsChange = (value, rowIndex, index) => {
		const newFields = [...fields];
		newFields[rowIndex][index].options = value
			.split(",")
			.map((opt) => opt.trim());
		setAttributes({ fields: newFields });
	};

	const handleServiceOptionsChange = (value) => {
		setAttributes({ labelOptions: value });
	};
	return (
		<div {...blockProps}>
			<InspectorControls key={"Setting"}>
				<PanelBody title="CREATE FORM" className="panelBody">
					<PanelRow className="titleRow">Create Title</PanelRow>
					<TextControl
						label="Set Title"
						value={formTitle}
						onChange={(value) => setAttributes({ formTitle: value })}
					/>
					<PanelRow className="titleRow">Edit / Delete Fields</PanelRow>
					{fields.map((row, rowIndex) => (
						<div key={rowIndex} style={{ marginBottom: "10px" }}>
							{Array.isArray(row)
								? row.map((field, index) => (
										<EditField
											field={field}
											index={index}
											handleChange={handleChange}
											handleFieldChangeType={handleFieldChangeType}
											removeField={removeField}
											handleOptionsChange={handleOptionsChange}
											rowIndex={rowIndex}
											isLast={index === fields.length - 1}
										/>
								  ))
								: null}
						</div>
					))}
					<PanelRow className="titleRow">Create Fields</PanelRow>
					<TextControl
						label="New Field"
						value={fieldLabel}
						onChange={(value) => setFieldLabel(value)}
					/>
					{fieldLabel !== "" && (
						<SelectControl
							label="Field Type"
							value={fieldType}
							options={[
								{ label: "Text", value: "text" },
								{ label: "Email", value: "email" },
								{ label: "Number", value: "number" },
								{ label: "Select", value: "select" },
							]}
							onChange={(value) => setFieldType(value)}
						/>
					)}

					{fieldType === "select" && (
						<TextControl
							help="Instructions: (comma separated)"
							label="Options "
							value={options}
							onChange={(value) => setOptions(value)}
						/>
					)}
					<CheckboxControl
						label="Add in new line"
						checked={addInNewLine}
						onChange={(isChecked) => setAddInNewLine(isChecked)}
					/>
					<Button
						variant="primary"
						icon={"plus"}
						isBusy="true"
						onClick={addField}
						className="btn"
					>
						Add Field
					</Button>
					<PanelRow className="titleRow">Create Button Submit</PanelRow>
					<TextControl
						label="Set Title Button ex. Submit"
						value={btnTitle}
						onChange={(value) => setAttributes({ btnTitle: value })}
					/>
				</PanelBody>
				<PanelBody title="SCHEMA SETTINGS" initialOpen={false} className="panelBody">
					<PanelRow className="titleRow">Schema Title</PanelRow>
					<FontSizePicker
						fontSizes={[
							{ name: "Small", slug: "small", size: 12 },
							{ name: "Medium", slug: "medium", size: 26 },
							{ name: "Big", slug: "big", size: 44 },
						]}
						value={fontSizeTitle}
						fallbackFontSize={16}
						onChange={(newFontSize) => {
							setAttributes({ fontSizeTitle: newFontSize });
						}}
					/>
					<ColorPalette
						colors={[
							{ name: "red", color: "#f00" },
							{ name: "white", color: "#fff" },
							{ name: "blue", color: "#00f" },
						]}
						value={colorTitle}
						onChange={(color) => setAttributes({ colorTitle: color })}
					/>
					<PanelRow className="titleRow">Schema Label</PanelRow>
					<FontSizePicker
						fontSizes={[
							{ name: "Small", slug: "small", size: 12 },
							{ name: "Medium", slug: "medium", size: 26 },
							{ name: "Big", slug: "big", size: 44 },
						]}
						value={fontSizeLabels}
						fallbackFontSize={16}
						onChange={(newFontSize) => {
							setAttributes({ fontSizeLabels: newFontSize });
						}}
					/>
					<ColorPalette
						colors={[
							{ name: "red", color: "#f00" },
							{ name: "white", color: "#fff" },
							{ name: "blue", color: "#00f" },
						]}
						value={colorLabels}
						onChange={(color) => setAttributes({ colorLabels: color })}
					/>
				</PanelBody>
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
				fontSizeLabels={fontSizeLabels}
				colorLabels={colorLabels}
			/>
		</div>
	);
};

export default Edit;
