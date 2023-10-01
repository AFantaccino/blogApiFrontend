import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../customHooks";
import { Link, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	TextField,
	Typography
} from "@mui/material";

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const username = useField("text");
	const password = useField("password");

	const login = async event => {
		event.preventDefault();
		try {
			dispatch(
				loginUser({
					username: username.value,
					password: password.value
				})
			);
			navigate("/");
		} catch (err) {
			console.log(err);
			const { error } = err.response.data;
			dispatch(newNotification("error", error));
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Typography variant="h5">Log In</Typography>
				<Box
					component="form"
					onSubmit={login}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						{...username}
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						{...password}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link to="/signup">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginForm;
