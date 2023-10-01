import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notifications",
	initialState: null,
	reducers: {
		errorMessage(state, action) {
			return { type: "error", message: action.payload };
		},
		positiveMessage(state, action) {
			return { type: "success", message: action.payload };
		},
		hide(state, action) {
			return null;
		}
	}
});

export const { errorMessage, positiveMessage, hide } =
	notificationSlice.actions;

export const newNotification = (type, message) => {
	return dispatch => {
		type === "success"
			? dispatch(positiveMessage(message))
			: dispatch(errorMessage(message));

		setTimeout(() => {
			dispatch(hide());
		}, 5000);
	};
};

export default notificationSlice.reducer;
