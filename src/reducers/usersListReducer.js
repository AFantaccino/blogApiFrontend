import { createSlice } from "@reduxjs/toolkit";
import userListService from "../services/userListService";

const usersListSlice = createSlice({
	name: "userList",
	initialState: [],
	reducers: {
		usersInitialList(state, action) {
			return action.payload;
		},
		addBlogRef(state, action) {
			const { title, id } = action.payload;
			state
				.find(el => el.username === action.payload.user[0].username)
				.blogs.push({ title, id });
		},
		delBlogRef(state, action) {
			const user = state.find(
				el => el.username === action.payload.user[0].username
			);
			const blogId = user.blogs.findIndex(
				el => el.id === action.payload.id
			);
			user.blogs.splice(blogId, 1);
			return state;
		}
	}
});

export const { usersInitialList, addBlogRef, delBlogRef } =
	usersListSlice.actions;

export const initialUsers = () => {
	return async dispatch => {
		const users = await userListService.getAll();
		dispatch(usersInitialList(users.users));
	};
};

export default usersListSlice.reducer;
