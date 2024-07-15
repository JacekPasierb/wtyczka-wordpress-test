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
import "./form-styles.css";

import FormFields from "./components/Save/FormFields";
import PayuSection from "./components/Save/PayuSection";
import SubmitButton from "./components/Save/SubmitButton";

const save = ({ attributes }) => {
	return (
		<form
			{...useBlockProps.save()}
			id={attributes.enablePayU ? "your-form-id" : "other-form"}
			method="post"
			style={{
				padding: `${attributes.paddingTable}px`,
				backgroundColor: `${attributes.colorBgTable}`,
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
			<FormFields attributes={attributes} />

			{attributes.enablePayU && <PayuSection attributes={attributes} />}
			<SubmitButton attributes={attributes} />
		</form>
	);
};
export default save;
