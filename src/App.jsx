import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import Menu from "./components/Menu";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import BlogsList from "./components/BlogsList";
import UsersList from "./components/UsersList";
import SignUpForm from "./components/SignUpForm";

import { initialBlogs } from "./reducers/blogsReducer";
import { loginUserToken } from "./reducers/userReducer";
import { initialUsers } from "./reducers/usersListReducer";
import BlogInfo from "./components/BlogInfo";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	useEffect(() => {
		dispatch(loginUserToken());
	}, []);

	useEffect(() => {
		dispatch(initialBlogs());
		dispatch(initialUsers());
	});

	return (
		<div>
			<Router>
				<Menu />
				<Notification />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="blogs" element={<BlogsList />} />
					<Route path="/blogs/:id" element={<BlogInfo />} />
					<Route
						path="/create"
						element={
							user ? (
								<CreateBlogForm />
							) : (
								<Navigate to="/login" replace={true} />
							)
						}
					/>
					<Route
						path="/login"
						element={
							user ? (
								<Navigate to="/users" replace={true} />
							) : (
								<LoginForm />
							)
						}
					/>
					<Route path="/users/:id" element={<UserInfo />} />
					<Route
						path="/users"
						element={
							user ? (
								<UsersList />
							) : (
								<Navigate to="/login" replace={true} />
							)
						}
					/>
					<Route path="/signup" element={<SignUpForm />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
