import {
	Box,
	Table,
	TableCell,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { Link, useMatch } from "react-router-dom";

const User = ({ user }) => {
	const match = useMatch("/users/:id");
	const { username, blogs, id } = user;

	return match !== null ? (
		<Box>
			<Typography variant="h4">{username}</Typography>
			{blogs.length === 0 ? (
				<>
					<Typography>No blogs create by this user</Typography>
				</>
			) : (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Added blogs</TableCell>
						</TableRow>
					</TableHead>
					{blogs.map(blog => (
						<TableRow key={blog.id}>
							<TableCell>
								<Link to={`/blogs/${blog.id}`}>
									{blog.title}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</Table>
			)}
		</Box>
	) : (
		<TableRow>
			<TableCell>
				<Link to={`/users/${id}`}>{username}</Link>
			</TableCell>
			<TableCell>{blogs.length}</TableCell>
		</TableRow>
	);
};

export default User;
