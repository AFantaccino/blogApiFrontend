import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";
import { useField } from "../customHooks";
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
		<div className="flex flex-col m-5 items-center">
			<p className="m-5 font-bold text-xl">Create</p>
			<form
				onSubmit={create}
				className="flex flex-col gap-2 items-center"
			>
				<label htmlFor="title">
					<p className="font-bold">title</p>
					<input
						{...title}
						required
						id="title"
						name="title"
						className="border-2 border-solid border-black rounded-md"
					/>
				</label>
				<label htmlFor="author">
					<p className="font-bold">author</p>
					<input
						{...author}
						required
						id="author"
						name="author"
						className="border-2 border-solid border-black rounded-md"
					/>
				</label>
				<label htmlFor="url">
					<p className="font-bold">url</p>
					<input
						{...url}
						required
						id="url"
						name="url"
						className="border-2 border-solid border-black rounded-md"
					/>
				</label>
				<button
					type="submit"
					className="w-fit rounded-lg bg-cyan-300 p-2"
				>
					Create
				</button>
			</form>
		</div>
	);
};

CreateBlogForm.displayName = "CreateBlogForm";

export default CreateBlogForm;
