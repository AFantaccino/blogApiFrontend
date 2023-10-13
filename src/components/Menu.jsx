import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Menu = () => {
	const user = useSelector(({ user }) => user);

	const dispatch = useDispatch();

	const logout = () => {
		if (window.confirm("Do you want to logout?")) {
			dispatch(logoutUser());
		}
	};

	return (
		<nav className="flex justify-between bg-gray-900 h-10">
			<div className="flex gap-2 items-center m-2">
				<div className="text-white">
					<Link to="/">Home</Link>
				</div>
				<div className="text-white">
					<Link to="/blogs">Blogs</Link>
				</div>
				{user ? (
					<>
						<div className="text-white">
							<Link to="/create">Create</Link>
						</div>
						<div className="text-white">
							<Link to="/users">Users</Link>
						</div>
					</>
				) : (
					<>
						<div className="text-white">
							<Link to="/login">Log in</Link>
						</div>
						<div className="text-white">
							<Link to="/signup">Sign Up</Link>
						</div>
					</>
				)}
			</div>
			<div className="text-white flex gap-2 items-center m-2">
				{user ? (
					<>
						<p>Welcome {user.name}</p>
						<div onClick={logout} className="cursor-pointer">
							Logout
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</nav>
	);
};

export default Menu;
