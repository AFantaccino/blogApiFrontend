import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
	const { title, author, id } = blog;

	return (
		<tr>
			<td>
				<Link to={`/blogs/${id}`}>
					{title} by {author}
				</Link>
			</td>
		</tr>
	);
};

export default Blog;
