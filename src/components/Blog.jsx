import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	commentBlogPost,
	eliminateBlog,
	upvoteBlog
} from "../reducers/blogsReducer";
import { Link, useMatch, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Container,
	CssBaseline,
	TableCell,
	TableRow,
	TextField,
	Typography
} from "@mui/material";

const Blog = ({ blog }) => {
	const [canDelete, setCanDelete] = useState(false);
	const { title, author, url, likes, user, id, comments } = blog;
	const match = useMatch("/blogs/:id");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loggedUser = useSelector(({ user }) => user);

	useEffect(() => {
		if (loggedUser !== null) {
			if (user[0].username === loggedUser.username) {
				setCanDelete(true);
			}
		}
	}, []);

	const addLike = () => {
		dispatch(upvoteBlog(Object.assign({}, blog)));
	};

	const remove = () => {
		if (
			window.confirm(
				`Are you sure you want to delete '${title}' by ${author}?`
			)
		) {
			dispatch(eliminateBlog(blog));
			navigate("/");
		}
	};

	const createComment = e => {
		e.preventDefault();
		dispatch(commentBlogPost({ id: id, comment: e.target.comment.value }));
	};

	return match !== null ? (
		<Container component="main" maxWidth="xs">
			<CssBaseline>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 3
					}}
				>
					<Typography variant="h5">
						{title} by {author}
					</Typography>
					<Box sx={{ margin: 1 }}>
						<Box sx={{ margin: 2 }}>
							<Typography>
								<strong>Url: </strong> {url}
							</Typography>
						</Box>
						<Box sx={{ margin: 2 }}>
							<Typography className="likes">
								<strong>Likes: </strong> {likes}
								{loggedUser ? (
									<Button color="success" onClick={addLike}>
										Like
									</Button>
								) : (
									<></>
								)}
							</Typography>
						</Box>
						<Box sx={{ margin: 2 }}>
							<Typography>
								<strong>Added by: </strong>
								{user[0].username}
							</Typography>
						</Box>
						{canDelete ? (
							<Box sx={{ margin: 1 }}>
								<Button
									color="error"
									onClick={remove}
									id="remove"
								>
									Delete
								</Button>
							</Box>
						) : (
							<></>
						)}
					</Box>
					<Box>
						<Box component="form" onSubmit={createComment}>
							<TextField
								margin="normal"
								required
								fullWidth
								name="comment"
								label="Comment"
								id="comment"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Send
							</Button>
						</Box>
						<Box>
							<Typography variant="h4">Comments</Typography>
							{comments ? (
								<>
									{comments.map((comment, id) => (
										<Typography key={id} sx={{ margin: 1 }}>
											{comment}
										</Typography>
									))}
								</>
							) : (
								<></>
							)}
						</Box>
					</Box>
				</Box>
			</CssBaseline>
		</Container>
	) : (
		<TableRow>
			<TableCell>
				<Link to={`/blogs/${id}`}>
					{title} by {author}
				</Link>
			</TableCell>
		</TableRow>
	);
};

export default Blog;
