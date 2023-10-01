import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme
} from "@mui/material";

import Menu from "./components/Menu";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import BlogsList from "./components/BlogsList";
import UsersList from "./components/UsersList";

import { initialBlogs } from "./reducers/blogsReducer";
import { loginUserToken } from "./reducers/userReducer";
import { initialUsers } from "./reducers/usersListReducer";
import SignUpForm from "./components/SignUpForm";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	const darkTheme = createTheme({
		palette: {
			mode: "dark"
		}
	});

	useEffect(() => {
		dispatch(loginUserToken());
	}, []);

	useEffect(() => {
		dispatch(initialBlogs());
		dispatch(initialUsers());
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Container>
				<Router>
					<Menu />
					<Notification />
					<Routes>
						<Route path="/" element={<BlogsList />} />
						<Route path="/blogs/:id" element={<BlogsList />} />
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
						<Route path="/users/:id" element={<UsersList />} />
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
			</Container>
		</ThemeProvider>
	);
};

export default App;
