import { Button, SelectControl, TextControl } from "@wordpress/components";

import React, { useEffect, useState } from "react";
import "../../form-styles.css";

const Form = ({
	title,
	fields,
	btnTitle,
	enablePayU,
	titleFormPayU,
	labelService,
	labelOptions,
	titleCost,
	fontSizeTitle,
	colorTitle,
	fontSizeLabels,
	colorLabels,
}) => {
	const [service, setService] = useState();

	const handleServiceChange = (value) => {
		setService(value);
	};

	useEffect(() => {
		const serviceOptions = labelOptions
			.split(",")
			.map((option) => option.split(":"))
			.map(([label, value]) => ({ label, value }));

		if (serviceOptions.length > 0) {
			setService(serviceOptions[0].value);
		}
	}, [labelOptions]);

	const handleClick = (e) => {
		e.preventDefault();
		alert("Form sent with payment method: ");
	};

	const getServiceCost = () => {
		if (!service) return "";

		const selectedOption = labelOptions
			.split(",")
			.map((option) => option.split(":"))
			.find(([label, value]) => value === service);

		return selectedOption ? selectedOption[1] : "";
	};

	

	return (
		<form
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			className="custom-form"
		>
			<h1 style={{fontSize:`${fontSizeTitle}px`, color:`${colorTitle}`}}>{title}</h1>
			{enablePayU && <h3>Steps 1</h3>}

			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
				className="form-fields"
			>
				{fields.map((row, rowIndex) => (
					<div
						key={rowIndex}
						style={{
							marginBottom: "10px",
							display: "flex",
							flexDirection: "row",
							gap: "10px",
							alignItems: "center",
						}}
						className="form-row"
					>
						{Array.isArray(row) ? (
							row.map((field, index) =>
								field.type === "select" ? (
									<SelectControl
										key={index}
										label={field.label}
										value={""}
										options={
											field.options === undefined
												? [{ label: "", value: "" }]
												: field.options.map((option, optionIndex) => ({
														label: option,
														value: option,
														key: optionIndex,
												  }))
										}
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
			{enablePayU && (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "20px",
						alignItems: "flex-end",
						justifyContent: "flex-end",
					}}
					className="payu-section"
				>
					<SelectControl
						label={labelService}
						value={service}
						options={labelOptions
							.split(",")
							.map((option) => option.split(":"))
							.map(([label, value]) => ({ label, value }))}
						onChange={handleServiceChange}
					/>
					{service && (
						<p  className="service-cost">
							<strong>{titleCost}:</strong> {getServiceCost() + "" + "pln"}
						</p>
					)}
				</div>
			)}

			{enablePayU && (
				<>
					<h3>Steps 2</h3>
					<h2>{titleFormPayU}</h2>
					<div
						style={{
							marginBottom: "10px",
							display: "flex",
							flexDirection: "row",
							gap: "10px",
						}}
						className="payu-fields"
					>
						<TextControl
							label="First Name"
							
							name="buyer_first_name"
						/>
						<TextControl
							label="Last Name"
							
							name="buyer_last_name"
						/>
					</div>
				</>
			)}

			<button className="button">{btnTitle}</button>
		</form>
	);
};

export default Form;
