import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../customHooks";
import { Link, useNavigate } from "react-router-dom";

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
		<div className="flex flex-col m-5 items-center">
			<p className="m-5 font-bold text-xl">Log In</p>
			<form onSubmit={login} className="flex flex-col gap-2 items-center">
				<div>
					<label htmlFor="username">
						<p className="font-bold">username</p>
						<input
							{...username}
							required
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							className="border-2 border-solid border-black rounded-md"
						/>
					</label>
				</div>
				<div>
					<label htmlFor="password">
						<p className="font-bold">password</p>
						<input
							{...password}
							required
							name="password"
							label="Password"
							id="password"
							className="border-2 border-solid border-black rounded-md"
						/>
					</label>
				</div>
				<button
					type="submit"
					className="w-fit rounded-lg bg-cyan-300 p-2"
				>
					Log In
				</button>
				<div>
					<Link to="/signup">{"Don't have an account? Sign Up"}</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
