import React from "react";

const PayuSection = ({ attributes }) => {
	const optionsArray = attributes.labelOptions
		.split(",")
		.map((option) => option.split(":"))
		.map(([label, value]) => ({ label, value }));
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "20px",
					alignItems: "flex-end",
					"--colorLabel": `${attributes.colorLabel}`,
					"--sizeLabel": `${attributes.fontSizeLabel}px`,
				}}
				className="payu-section"
			>
				<div
					style={{ display: "flex", flexDirection: "column" }}
					className="form-control"
				>
					<label htmlFor="service_select">{attributes.labelService}</label>
					<select
						id="service_select"
						name="service_select"
						onChange="document.getElementById('dynamic-cost').textContent = this.value + ' ' +  'pln';"
					>
						{optionsArray.map((option, index) => (
							<option key={index} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<p className="service-cost">
					<strong>{attributes.titleCost}:</strong>{" "}
					<span id="dynamic-cost"></span>
				</p>
			</div>
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
				<div
					style={{ display: "flex", flexDirection: "column" }}
					className="form-control"
				>
					<label for="buyer_first_name">First Name</label>
					<input type="text" name="buyer_first_name" id="buyer_first_name" />
				</div>
				<div
					style={{ display: "flex", flexDirection: "column" }}
					className="form-control"
				>
					<label for="buyer_last_name">Last Name</label>
					<input type="text" name="buyer_last_name" id="buyer_last_name" />
				</div>
			</div>
		</>
	);
};

export default PayuSection;
