import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { signUpUser } from "../reducers/userReducer";
import { useField } from "../customHooks";
import { Link, useNavigate } from "react-router-dom";

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
		<div className="flex flex-col m-5 items-center">
			<p className="m-5 font-bold text-xl">Sign Up</p>
			<form
				onSubmit={signup}
				className="flex flex-col gap-2 items-center"
			>
				<div>
					<label htmlFor="name">
						<p className="font-bold">name</p>
						<input
							{...name}
							required
							id="name"
							name="name"
							className="border-2 border-solid border-black rounded-md"
						/>
					</label>
				</div>
				<div>
					<label htmlFor="username">
						<p className="font-bold">username</p>
						<input
							{...username}
							required
							id="username"
							label="Username"
							name="username"
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
					Sign Up
				</button>
				<div>
					<Link to="/login">{"Already an account? Log in"}</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
