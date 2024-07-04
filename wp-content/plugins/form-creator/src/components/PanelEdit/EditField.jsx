import {
	SelectControl,
	Button,
	TextControl,
	PanelRow,
} from "@wordpress/components";

import React from "react";

const EditField = ({
	field,
	index,
	handleChange,
	handleFieldChangeType,
	removeField,
	handleOptionsChange,
	rowIndex,
	isLast,
}) => {
	return (
		<>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<TextControl
					value={field.label}
					placeholder={field.label}
					type={field.type}
					onChange={(value) => handleChange(value, rowIndex, index)}
				/>
				<SelectControl
					value={field.type}
					options={[
						{ label: "Text", value: "text" },
						{ label: "Email", value: "email" },
						{ label: "Number", value: "number" },
						{ label: "Select", value: "select" },
					]}
					onChange={(value) => handleFieldChangeType(value, rowIndex, index)}
				/>
				<Button icon="trash" onClick={() => removeField(rowIndex, index)} />
			</div>
			{field.type === "select" && (
				<TextControl
					help=" Instructions: (comma separated)"
					label={" Set Options field of: " + field.label}
					value={field.options === undefined ? "" : field.options.join(", ")}
					onChange={(value) => handleOptionsChange(value, rowIndex, index)}
				/>
			)}
			{!isLast && (
				<div
					style={{
						marginBottom: "10px",
						opacity:"0.3",
						height: "1px",
						backgroundColor: "white",
					}}
				></div>
			)}
		</>
	);
};

export default EditField;
