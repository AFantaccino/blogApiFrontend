import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { signUpUser } from "../reducers/userReducer";
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

const SignUpForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const name = useField("text");
	const username = useField("text");
	const password = useField("password");

	const signup = async event => {
		event.preventDefault();
		try {
			dispatch(
				signUpUser({
					name: name.value,
					username: username.value,
					password: password.value
				})
			);
			navigate("/login");
		} catch (err) {
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
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<Box
					component="form"
					onSubmit={signup}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						{...name}
						margin="normal"
						required
						fullWidth
						id="name"
						label="name"
						name="Name"
						autoComplete="name"
						autoFocus
					/>
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
							<Link to="/login">
								{"Already have an account? Log In"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUpForm;
