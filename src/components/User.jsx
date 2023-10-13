import { Link, useMatch } from "react-router-dom";

const User = ({ user }) => {
	const match = useMatch("/users/:id");
	const { username, blogs, id } = user;

	return (
		<tr>
			<td>
				<Link to={`/users/${id}`}>{username}</Link>
			</td>
			<td>{blogs.length}</td>
		</tr>
	);
};

export default User;
