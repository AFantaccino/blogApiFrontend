import { useState, forwardRef, useImperativeHandle, Children } from "react";
import PropTypes from "prop-types";

const Toggable = forwardRef((props, ref) => {
	const [visibility, setVisibility] = useState(false);

	const hideWhenVisible = { display: visibility ? "none" : "" };
	const showWhenVisible = { display: visibility ? "" : "none" };

	const toggleVisibility = () => {
		setVisibility(!visibility);
	};

	useImperativeHandle(ref, () => {
		return { toggleVisibility };
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility} id={props.buttonLabel}>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	);
});

Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
};

Toggable.displayName = "Toggable";

export default Toggable;
