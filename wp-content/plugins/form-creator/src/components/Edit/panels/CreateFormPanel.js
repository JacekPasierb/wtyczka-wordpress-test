import {
	PanelRow,
	Button,
	CheckboxControl,
	TextControl,
	PanelBody,
	SelectControl,
} from "@wordpress/components";

import React, { useState } from "react";
import EditField from "../EditField";

const CreateFormPanel = ({ attributes, setAttributes }) => {
	const [fieldLabel, setFieldLabel] = useState("");
	const [fieldType, setFieldType] = useState("text");
	const [options, setOptions] = useState("");
	const [addInNewLine, setAddInNewLine] = useState(false);

	const handleChange = (value, rowIndex, index) => {
		const newFields = [...attributes.fields];
		newFields[rowIndex][index].label = value;
		setAttributes({ fields: newFields });
	};

	const handleFieldChangeType = (value, rowIndex, index) => {
		const newFields = [...attributes.fields];
		newFields[rowIndex][index].type = value;
		setAttributes({ fields: newFields });
	};

	const removeField = (rowIndex, index) => {
		const newFields = [...attributes.fields];
		newFields[rowIndex].splice(index, 1);
		if (newFields[rowIndex].length === 0) {
			newFields.splice(rowIndex, 1);
		}
		setAttributes({ fields: newFields });
	};

	const addField = () => {
		const newField = { label: fieldLabel, type: fieldType };
		if (fieldType === "select") {
			newField.options = options.split(",").map((opt) => opt.trim());
		}
		if (addInNewLine) {
			setAttributes({ fields: [...attributes.fields, [newField]] });
		} else {
			const updatedFields = [...attributes.fields];

			const numberOfRows = attributes.fields.length;
			const lastRow = attributes.fields[numberOfRows - 1];
			const numberOfFieldsInLastRow = lastRow.length;

			if (numberOfFieldsInLastRow >= 5) {
				alert("Too many fields in one row"); // dodac obsługe komunikatu
				return;
			}

			updatedFields[updatedFields.length - 1].push(newField);
			setAttributes({ fields: updatedFields });
		}

		setFieldLabel("");
		setFieldType("text");
		setOptions("");
	};

	const handleOptionsChange = (value, rowIndex, index) => {
		const newFields = [...attributes.fields];
		newFields[rowIndex][index].options = value
			.split(",")
			.map((opt) => opt.trim());
		setAttributes({ fields: newFields });
	};

	return (
		<PanelBody title="CREATE FORM" className="panelBody">
			<PanelRow className="titleRow">Create Title</PanelRow>
			<TextControl
				label="Set Title"
				value={attributes.formTitle}
				onChange={(value) => setAttributes({ formTitle: value })}
			/>
			<PanelRow className="titleRow">Edit / Delete Fields</PanelRow>
			{attributes.fields.map((row, rowIndex) => (
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
									isLast={index === attributes.fields.length - 1}
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
				value={attributes.btnTitle}
				onChange={(value) => setAttributes({ btnTitle: value })}
			/>
		</PanelBody>
	);
};

export default CreateFormPanel;
