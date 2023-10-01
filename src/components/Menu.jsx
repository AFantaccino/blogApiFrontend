import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { Box, Button, Container, Toolbar } from "@mui/material";

const Menu = () => {
	const user = useSelector(({ user }) => user);

	const dispatch = useDispatch();

	const logout = () => {
		if (window.confirm("Do you want to logout?")) {
			dispatch(logoutUser());
		}
	};

	return (
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					<Button>
						<Link to="/">Home</Link>
					</Button>
					{user ? (
						<>
							<Button>
								<Link to="/create">Create</Link>
							</Button>
							<Button>
								<Link to="/users">Users</Link>
							</Button>
						</>
					) : (
						<>
							<Button>
								<Link to="/login">Log in</Link>
							</Button>
							<Button>
								<Link to="/signup">Sign Up</Link>
							</Button>
						</>
					)}
				</Box>
				<Box sx={{ flexGrow: 0 }}>
					{user ? (
						<Box sx={{ display: "flex" }}>
							<p>Welcome {user.name}</p>
							<Button onClick={logout}>Logout</Button>
						</Box>
					) : (
						<></>
					)}
				</Box>
			</Toolbar>
		</Container>
	);
};

export default Menu;
