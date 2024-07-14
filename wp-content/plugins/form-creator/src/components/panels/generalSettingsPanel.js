import { PanelBody, RangeControl, TextControl } from "@wordpress/components";
import React from "react";

const GeneralSettingsPanel = ({ attributes, setAttributes }) => {
	return (
		<>
			<PanelBody title="General Settings" className="panelBody">
				<TextControl
					label="Form Title"
					value={attributes.formTitle}
					onChange={(value) => setAttributes({ formTitle: value })}
				/>

				<TextControl
					label="Button Title"
					value={attributes.btnTitle}
					onChange={(value) => setAttributes({ btnTitle: value })}
				/>
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
			</PanelBody>
		</>
	);
};

export default GeneralSettingsPanel;
