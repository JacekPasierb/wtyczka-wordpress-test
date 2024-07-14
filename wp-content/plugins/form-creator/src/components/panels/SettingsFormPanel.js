import {
	PanelRow,
	CheckboxControl,
	RangeControl,
	PanelBody,
} from "@wordpress/components";

import React from "react";

const SettingsFormPanel = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title="SETTINGS FORM" initialOpen={false} className="panelBody">
			<PanelRow className="titleRow">Setting Form</PanelRow>

			<RangeControl
				label="Padding Table"
				value={attributes.paddingTable}
				onChange={(value) => setAttributes({ paddingTable: value })}
				min={2}
				max={150}
			/>
			<RangeControl
				label="Gap Row Fields"
				value={attributes.gapRow}
				onChange={(value) => setAttributes({ gapRow: value })}
				min={2}
				max={150}
			/>
			<RangeControl
				label="Gap Column Fields"
				value={attributes.gapColumn}
				onChange={(value) => setAttributes({ gapColumn: value })}
				min={2}
				max={150}
			/>
			<PanelRow className="titleRow">Setting Title</PanelRow>
			<RangeControl
				label="Font Size title"
				value={attributes.fontSizeTitle}
				onChange={(newFontSize) => {
					setAttributes({ fontSizeTitle: newFontSize });
				}}
				min={2}
				max={150}
			/>
			<PanelRow>
				<CheckboxControl
					label="Left"
					checked={attributes.alignment === "start"}
					onChange={(isChecked) =>
						isChecked && setAttributes({ alignment: "start" })
					}
				/>
				<CheckboxControl
					label="Center"
					checked={attributes.alignment === "center"}
					onChange={(isChecked) =>
						isChecked && setAttributes({ alignment: "center" })
					}
				/>
				<CheckboxControl
					label="Right"
					checked={attributes.alignment === "end"}
					onChange={(isChecked) =>
						isChecked && setAttributes({ alignment: "end" })
					}
				/>
			</PanelRow>
			<RangeControl
				label="Set Margin Bottom"
				value={attributes.marginBottomTitle}
				onChange={(value) => {
					setAttributes({ marginBottomTitle: value });
				}}
				min={2}
				max={150}
			/>
			<PanelRow className="titleRow">Setting Button</PanelRow>
			<RangeControl
				label="Padding Inline Button"
				value={attributes.paddingInlineButton}
				onChange={(value) => {
					setAttributes({ paddingInlineButton: value });
				}}
				min={2}
				max={150}
			/>
			<RangeControl
				label="Padding Block Button"
				value={attributes.paddingBlockButton}
				onChange={(value) => {
					setAttributes({ paddingBlockButton: value });
				}}
				min={2}
				max={150}
			/>
			<RangeControl
				label="Size Text Button"
				value={attributes.sizeTextButton}
				onChange={(value) => {
					setAttributes({ sizeTextButton: value });
				}}
				min={2}
				max={150}
			/>
			<PanelRow>
				<CheckboxControl
					label="Left"
					checked={attributes.alignmentBtn === "start"}
					onChange={(isChecked) =>
						isChecked && setAttributes({ alignmentBtn: "start" })
					}
				/>
				<CheckboxControl
					label="Center"
					checked={attributes.alignmentBtn === "center"}
					onChange={(isChecked) =>
						isChecked && setAttributes({ alignmentBtn: "center" })
					}
				/>
				<CheckboxControl
					label="Right"
					checked={attributes.alignmentBtn === "end"}
					onChange={(isChecked) =>
						isChecked && setAttributes({ alignmentBtn: "end" })
					}
				/>
			</PanelRow>
			<RangeControl
				label="Set Margin Top"
				value={attributes.marginTopBtn}
				onChange={(value) => {
					setAttributes({ marginTopBtn: value });
				}}
				min={2}
				max={150}
			/>
		</PanelBody>
	);
};

export default SettingsFormPanel;
