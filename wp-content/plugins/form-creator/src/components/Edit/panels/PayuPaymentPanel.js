import { PanelRow, TextControl, PanelBody } from "@wordpress/components";
import React from "react";

const PayuPaymentPanel = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title="PayU Payment Settings" initialOpen={false}>
			<PanelRow className="titleRow">Create Form PayU</PanelRow>
			<TextControl
				label="Set Label"
				value={attributes.labelService}
				placeholder="Choose service"
				onChange={(value) => setAttributes({ labelService: value })}
			/>
			<TextControl
				help="(comma separated, format: Name service: value service)"
				label="Set Label Options "
				value={attributes.labelOptions}
				onChange={(value) => {
					setAttributes({ labelOptions: value });
				}}
			/>
			<TextControl
				label="Set Title Cost"
				value={attributes.titleCost}
				onChange={(value) => setAttributes({ titleCost: value })}
			/>
			<TextControl
				label="Set Title Form PayU"
				placeholder="Dane do płatności"
				value={attributes.titleFormPayU}
				onChange={(value) => setAttributes({ titleFormPayU: value })}
			/>
		</PanelBody>
	);
};

export default PayuPaymentPanel;
