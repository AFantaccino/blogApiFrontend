import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";
import { addBlogRef, delBlogRef } from "./usersListReducer";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		createNew(state, action) {
			state.push(action.payload);
		},
		upvote(state, action) {
			state.find(el => el.id === action.payload.id).likes += 1;
		},
		remove(state, action) {
			return state.filter(el => el.id !== action.payload);
		},
		postInitialList(state, action) {
			return action.payload;
		},
		commentBlog(state, action) {
			state
				.find(blog => blog.id === action.payload.id)
				.comments.push(action.payload.comment);
		}
	}
});

export const { createNew, upvote, postInitialList, remove, commentBlog } =
	blogSlice.actions;

export const initialBlogs = () => {
	return async dispatch => {
		const blogs = await blogsService.getAll();
		dispatch(postInitialList(blogs.blogs));
	};
};

export const createBlog = blog => {
	return async dispatch => {
		blogsService.setToken(window.localStorage.getItem("token"));
		const newBlog = await blogsService.create(blog);
		dispatch(createNew(newBlog.blog));
		dispatch(addBlogRef(newBlog.blog));
	};
};

export const upvoteBlog = blog => {
	return async dispatch => {
		blogsService.setToken(window.localStorage.getItem("token"));
		const updatedBlog = { ...blog, likes: (blog.likes += 1) };
		await blogsService.update(updatedBlog);
		dispatch(upvote(blog));
	};
};

export const commentBlogPost = (id, comment) => {
	return async dispatch => {
		await blogsService.comment(id, comment);
		dispatch(commentBlog(id, comment));
	};
};

export const eliminateBlog = blog => {
	return async dispatch => {
		blogsService.setToken(window.localStorage.getItem("token"));
		await blogsService.eliminate(blog.id);
		dispatch(remove(blog.id));
		dispatch(delBlogRef(blog));
	};
};

export default blogSlice.reducer;
