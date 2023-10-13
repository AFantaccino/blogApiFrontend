import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";

const UserInfo = () => {
	const users = useSelector(({ usersList }) => usersList);

	const match = useMatch("/users/:id");

	const user = match
		? users.filter(user => user.id === match.params.id)
		: null;

	const { username, blogs } = user[0];

	return (
		<div>
			<p>{username}</p>
			{blogs.length === 0 ? (
				<>
					<p>No blogs create by this user</p>
				</>
			) : (
				<div>
					<p>Added blogs</p>
					<ul>
						{blogs.map(blog => (
							<li key={blog.id}>
								<p>
									<Link to={`/blogs/${blog.id}`}>
										{blog.title}
									</Link>
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default UserInfo;
