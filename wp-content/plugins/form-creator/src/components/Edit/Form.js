import { SelectControl, TextControl } from "@wordpress/components";

import React, { useEffect, useState } from "react";
import "../../form-styles.css";

const Form = ({ attributes }) => {
	const [service, setService] = useState();

	const handleServiceChange = (value) => {
		setService(value);
	};

	useEffect(() => {
		const serviceOptions = attributes.labelOptions
			.split(",")
			.map((option) => option.split(":"))
			.map(([label, value]) => ({ label, value }));

		if (serviceOptions.length > 0) {
			setService(serviceOptions[0].value);
		}
	}, [attributes.labelOptions]);

	const handleClick = (e) => {
		e.preventDefault();
		alert("Form sent with payment method: ");
	};

	const getServiceCost = () => {
		if (!service) return "";

		const selectedOption = attributes.labelOptions
			.split(",")
			.map((option) => option.split(":"))
			.find(([label, value]) => value === service);

		return selectedOption ? selectedOption[1] : "";
	};

	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: `${attributes.colorBgTable}`,
				padding: `${attributes.paddingTable}px`,
			}}
			className="custom-form"
		>
			<h1
				style={{
					fontSize: `${attributes.fontSizeTitle}px`,
					color: `${attributes.colorTitle}`,
					marginBottom: `${attributes.marginBottomTitle}px`,
					alignSelf: `${attributes.alignment}`,
				}}
			>
				{attributes.formTitle}
			</h1>
			{attributes.enablePayU && <h3>Steps 1</h3>}

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
							row.map((field, index) =>
								field.type === "select" ? (
									<SelectControl
										key={index}
										label={field.label}
										value={field.options[0].value}
										options={field.options.map((option, optionIndex) => ({
											label: option,
											value: option,
											key: optionIndex,
										}))}
									/>
								) : (
									<TextControl
										key={index}
										label={field.label}
										type={field.type}
									/>
								),
							)
						) : (
							<p>Error: Row is not an array</p>
						)}
					</div>
				))}
			</div>
			{attributes.enablePayU && (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "20px",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						"--colorLabel": `${attributes.colorLabel}`,
						"--sizeLabel": `${attributes.fontSizeLabel}px`,
					}}
					className="payu-section"
				>
					<SelectControl
						label={attributes.labelService}
						value={service}
						options={attributes.labelOptions
							.split(",")
							.map((option) => option.split(":"))
							.map(([label, value]) => ({ label, value }))}
						onChange={handleServiceChange}
					/>
					{service && (
						<p className="service-cost">
							<strong>{attributes.titleCost}:</strong>{" "}
							{getServiceCost() + "" + "pln"}
						</p>
					)}
				</div>
			)}

			{attributes.enablePayU && (
				<>
					<h3>Steps 2</h3>
					<h2>{attributes.titleFormPayU}</h2>
					<div
						style={{
							marginBottom: "10px",
							display: "flex",
							flexDirection: "row",
							gap: "10px",
							"--colorLabel": `${attributes.colorLabel}`,
							"--sizeLabel": `${attributes.fontSizeLabel}px`,
						}}
						className="payu-fields"
					>
						<TextControl label="First Name" name="buyer_first_name" />
						<TextControl label="Last Name" name="buyer_last_name" />
					</div>
				</>
			)}

			<button
				style={{
					paddingInline: `${attributes.paddingInlineButton}px`,
					paddingBlock: `${attributes.paddingBlockButton}px`,
					alignSelf: `${attributes.alignmentBtn}`,
					"--margin-top": `${attributes.marginTopBtn}px`,
					"--font-size": `${attributes.sizeTextButton}px`,
					"--color": `${attributes.colorTextButton}`,
					"--bg-color": `${attributes.colorBgButton}`,
					"--hover-bg-color": `${attributes.hoverColorBgButton}`,
					"--hover-text-color": `${attributes.hoverColorTextButton}`,
				}}
				className="button"
			>
				{attributes.btnTitle}
			</button>
		</form>
	);
};

export default Form;
