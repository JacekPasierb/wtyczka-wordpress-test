import React from "react";

const SubmitButton = ({ attributes }) => {
	return (
		<button
			style={{
				paddingInline: `${attributes.paddingInlineButton}px`,
				paddingBlock: `${attributes.paddingBlockButton}px`,
				fontSize: `${attributes.sizeTextButton}px`,
				color: `${attributes.colorTextButton}`,
				backgroundColor: `${attributes.colorBgButton}`,
				"--margin-top": `${attributes.marginTopBtn}px`,
				"--hover-bg-color": `${attributes.hoverColorBgButton}`,
				"--hover-text-button": `${attributes.hoverColorTextButton}`,
			}}
			type="submit"
			className="button"
		>
			{attributes.btnTitle}
		</button>
	);
};

export default SubmitButton;
