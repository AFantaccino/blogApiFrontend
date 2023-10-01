import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";
import signupService from "../services/signupService";
import { newNotification } from "./notificationReducer";

const userSlicer = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		signup(state, action) {
			return null;
		},
		login(state, action) {
			return action.payload;
		},
		logout(state, action) {
			return null;
		}
	}
});

export const { signup, login, logout } = userSlicer.actions;

export const signUpUser = user => {
	return async dispatch => {
		try {
			const registeredUser = await signupService.signup(user);
			window.localStorage.setItem("token", registeredUser.token);
			dispatch(signup(registeredUser));
			dispatch(
				newNotification("success", "Account created please login")
			);
		} catch (error) {
			if (error.response.status === 400)
				dispatch(
					newNotification(
						"error",
						"username already taken, did you mean to login?"
					)
				);
		}
	};
};

export const loginUser = user => {
	return async dispatch => {
		const loggedUser = await loginService.login(user);
		window.localStorage.setItem("token", loggedUser.token);
		dispatch(login(loggedUser));
	};
};

export const loginUserToken = () => {
	return async dispatch => {
		const token = localStorage.getItem("token");
		if (token) {
			const loggedUser = await loginService
				.loginToken(token)
				.catch(err => {
					window.localStorage.removeItem("token");
				});
			dispatch(login(loggedUser));
		}
	};
};

export const logoutUser = () => {
	return dispatch => {
		window.localStorage.removeItem("token");
		dispatch(logout());
	};
};

export default userSlicer.reducer;
