import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";
import { useField } from "../customHooks";
import {
	Box,
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
	const title = useField("text");
	const author = useField("author");
	const url = useField("text");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const create = async event => {
		event.preventDefault();
		try {
			const newBlog = {
				title: title.value,
				author: author.value,
				url: url.value
			};
			dispatch(createBlog(newBlog));
			dispatch(
				newNotification(
					"success",
					`a new blog ${title.value} by ${author.value} added`
				)
			);
			navigate("/");
		} catch (err) {
			console.log(err);
			const { error } = err.response.data;
			dispatch(newNotification("error", error));
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<CssBaseline />
				<Typography variant="h5">Create</Typography>
				<Box component="form" onSubmit={create}>
					<TextField
						{...title}
						margin="normal"
						required
						fullWidth
						id="title"
						label="Title"
						name="title"
					/>
					<TextField
						{...author}
						margin="normal"
						required
						fullWidth
						id="author"
						label="Author"
						name="author"
					/>
					<TextField
						{...url}
						margin="normal"
						required
						fullWidth
						id="url"
						label="Url"
						name="url"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

CreateBlogForm.displayName = "CreateBlogForm";

export default CreateBlogForm;
