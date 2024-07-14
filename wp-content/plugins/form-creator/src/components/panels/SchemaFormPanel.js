import { ColorPicker } from "@wordpress/components";
import { PanelRow } from "@wordpress/components";
import { PanelBody } from "@wordpress/components";
import React from "react";

const SchemaFormPanel = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title="SCHEMA FORM" initialOpen={false} className="panelBody">
			<PanelRow className="titleRow">Set Background Color</PanelRow>
			<ColorPicker
				color={attributes.colorBgTable}
				onChange={(value) => {
					setAttributes({ colorBgTable: value });
				}}
				enableAlpha
				defaultValue="#000"
			/>
			<PanelRow className="titleRow">Set Title Color</PanelRow>

			<ColorPicker
				color={attributes.colorTitle}
				onChange={(value) => {
					setAttributes({ colorTitle: value });
				}}
				enableAlpha
				defaultValue="#000"
			/>
			<PanelRow className="titleRow">Set Text Color Button</PanelRow>
			<ColorPicker
				color={attributes.colorTextButton}
				onChange={(value) => {
					setAttributes({ colorTextButton: value });
				}}
				enableAlpha
				defaultValue="#000"
			/>
			<PanelRow className="titleRow">Set Background Color Button</PanelRow>
			<ColorPicker
				color={attributes.colorBgButton}
				onChange={(value) => {
					setAttributes({ colorBgButton: value });
				}}
				enableAlpha
				defaultValue="#000"
			/>
			<PanelRow className="titleRow">
				Set Hover Background Color Button
			</PanelRow>
			<ColorPicker
				color={attributes.hoverColorBgButton}
				onChange={(value) => {
					setAttributes({ hoverColorBgButton: value });
				}}
				enableAlpha
				defaultValue="#000"
			/>
			<PanelRow className="titleRow">Set Hover Text Color Button</PanelRow>
			<ColorPicker
				color={attributes.hoverColorTextButton}
				onChange={(value) => {
					setAttributes({ hoverColorTextButton: value });
				}}
				enableAlpha
				defaultValue="#000"
			/>
		</PanelBody>
	);
};

export default SchemaFormPanel;
