/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 *
 *
 */
import "./editor.scss";
import { useState } from "react";
import apiFetch from "@wordpress/api-fetch";

const save = ({ attributes }) => {
	const {
		formTitle,
		enablePayU,
		fields,
		btnTitle,
		labelService,
		labelOptions,
		titleCost,
		titleFormPayU,
	} = attributes;

	const optionsArray = labelOptions
		.split(",")
		.map((option) => option.split(":"))
		.map(([label, value]) => ({ label, value }));

	return (
		<form
			{...useBlockProps.save()}
			id={enablePayU ? "your-form-id" : "other-form"}
			method="post"
		>
			<h1>{formTitle}</h1>
			{enablePayU && <h3>Steps 1</h3>}

			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
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
					>
						{Array.isArray(row) ? (
							row.map((field, index) =>
								field.type === "select" ? (
									<div
										key={index}
										style={{ display: "flex", flexDirection: "column" }}
									>
										<label for={`sel` + rowIndex + index}>{field.label}</label>
										<select
											id={`sel` + rowIndex + index}
											name={`sel` + rowIndex + index}
										>
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
									>
										<label for={`inp` + rowIndex + index}>{field.label}</label>
										<input
											type={field.type}
											placeholder={field.label}
											id={`inp` + rowIndex + index}
											name={`inp` + rowIndex + index}
										/>
									</div>
								),
							)
						) : (
							<p>Error: Row is not an array</p>
						)}
					</div>
				))}
			</div>
			{enablePayU && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "20px",
							alignItems: "flex-end",
						}}
					>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<label htmlFor="service_select">{labelService}</label>
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
						<p style={{ margin: "2px" }}>
							<strong>{titleCost}:</strong> <span id="dynamic-cost"></span>
						</p>
					</div>
					<h3>Steps 2</h3>
					<h2>{titleFormPayU}</h2>
					<div
						style={{
							marginBottom: "10px",
							display: "flex",
							flexDirection: "row",
							gap: "10px",
						}}
					>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<label for="buyer_first_name">First Name</label>
							<input
								type="text"
								placeholder="First Name"
								name="buyer_first_name"
								id="buyer_first_name"
							/>
						</div>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<label for="buyer_last_name">Last Name</label>
							<input
								type="text"
								placeholder="Last Name"
								name="buyer_last_name"
								id="buyer_last_name"
							/>
						</div>
					</div>
				</>
			)}
			<button type="submit">Submit</button>
		</form>
	);
};
export default save;
