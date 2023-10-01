import { useSelector } from "react-redux";
import Blog from "./Blog";
import { useMatch } from "react-router-dom";
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
	Typography,
	Container
} from "@mui/material";

const BlogsList = () => {
	const match = useMatch("/blogs/:id");
	const blogs = useSelector(({ blogs }) => blogs);

	const blog = match
		? blogs.filter(blog => blog.id === match.params.id)
		: null;

	if (blog !== null) {
		return (
			<div>
				{blog.map(blog => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		);
	}

	return (
		<Container>
			<Typography variant="h5" sx={{ margin: 1, textAlign: "center" }}>
				Blogs
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small">
					<TableBody>
						{blogs.map(blog => (
							<Blog key={blog.id} blog={blog} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default BlogsList;
