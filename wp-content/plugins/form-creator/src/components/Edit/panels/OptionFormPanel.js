import { CheckboxControl, PanelBody } from "@wordpress/components";
import React from "react";

const OptionFormPanel = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title="OPTION FORM" initialOpen={false} className="panelBody">
			<CheckboxControl
				label="Enable PayU Payment"
				checked={attributes.enablePayU}
				onChange={(isChecked) => setAttributes({ enablePayU: isChecked })}
			/>
		</PanelBody>
	);
};

export default OptionFormPanel;
