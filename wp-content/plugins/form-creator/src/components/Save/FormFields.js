import React from "react";

const FormFields = ({ attributes }) => {
	const renderField = (field, rowIndex, index) => {
		return field.type === "select" ? (
			<div
				key={index}
				style={{ display: "flex", flexDirection: "column" }}
				className="form-control"
			>
				<label for={`sel` + rowIndex + index}>{field.label}</label>
				<select id={`sel` + rowIndex + index} name={`sel` + rowIndex + index}>
					{field.options.map((option, optionIndex) => (
						<option key={optionIndex} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		) : (
			<div
				key={index}
				style={{ display: "flex", flexDirection: "column" }}
				className="form-control"
			>
				<label for={`inp` + rowIndex + index}>{field.label}</label>
				<input
					type={field.type}
					id={`inp` + rowIndex + index}
					name={`inp` + rowIndex + index}
				/>
			</div>
		);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: `${attributes.gapColumn}px`,
			}}
			className="form-fields"
		>
			{attributes.fields.map((row, rowIndex) => (
				<div
					key={rowIndex}
					style={{
						marginBottom: "10px",
						display: "flex",
						flexDirection: "row",
						gap: `${attributes.gapRow}px`,
						alignItems: "center",
						"--colorLabel": `${attributes.colorLabel}`,
						"--sizeLabel": `${attributes.fontSizeLabel}px`,
					}}
					className="form-row"
				>
					{Array.isArray(row) ? (
						row.map((field, index) => renderField(field, rowIndex, index))
					) : (
						<p>Error: Row is not an array</p>
					)}
				</div>
			))}
		</div>
	);
};

export default FormFields;
