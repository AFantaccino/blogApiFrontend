import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import {
	commentBlogPost,
	eliminateBlog,
	upvoteBlog
} from "../reducers/blogsReducer";
import { useEffect, useState } from "react";

const BlogInfo = () => {
	const [canDelete, setCanDelete] = useState(false);

	const match = useMatch("/blogs/:id");
	const loggedUser = useSelector(({ user }) => user);
	const blogs = useSelector(({ blogs }) => blogs);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const blog = match
		? blogs.filter(blog => blog.id === match.params.id)
		: null;

	const { title, author, url, likes, user, id, comments } = blog[0];

	const addLike = () => {
		dispatch(upvoteBlog(Object.assign({}, blog[0])));
	};

	const remove = () => {
		if (
			window.confirm(
				`Are you sure you want to delete '${title}' by ${author}?`
			)
		) {
			dispatch(eliminateBlog(blog[0]));
			navigate("/blogs");
		}
	};

	const createComment = e => {
		e.preventDefault();
		dispatch(commentBlogPost({ id: id, comment: e.target.comment.value }));
	};

	useEffect(() => {
		if (loggedUser !== null) {
			if (user[0].username === loggedUser.username) {
				setCanDelete(true);
			}
		}
	}, []);

	return (
		<div className="flex flex-col place-items-center gap-3 m-5">
			<p className="m-5 font-bold text-xl">
				{title} by {author}
			</p>
			<div>
				<div>
					<p>
						<strong>Url: </strong> {url}
					</p>
				</div>
				<div>
					<p className="likes">
						<strong>Likes: </strong> {likes}
						{loggedUser ? (
							<button
								className="w-fit rounded-lg bg-blue-400 text-white m-2 p-2"
								onClick={addLike}
							>
								Like
							</button>
						) : (
							<></>
						)}
					</p>
				</div>
				<div>
					<p>
						<strong>Added by: </strong>
						{user[0].username}
					</p>
				</div>
				{canDelete && loggedUser ? (
					<div>
						<button
							onClick={remove}
							id="remove"
							className="w-fit rounded-lg bg-red-400 text-white m-2 p-2"
						>
							Delete
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
			<div>
				{loggedUser ? (
					<form onSubmit={createComment}>
						<div>
							<label htmlFor="comment">
								<p className="font-bold">leave a comment</p>
								<input
									required
									name="comment"
									id="comment"
									className="border-2 border-solid border-black rounded-md"
								/>
							</label>
							<button
								type="submit"
								className="w-fit rounded-lg bg-green-200 p-2"
							>
								Send
							</button>
						</div>
					</form>
				) : (
					<></>
				)}
				<div>
					<p className="m-5 font-bold text-xl">Comments</p>
					{comments ? (
						<ul>
							{comments.map((comment, id) => (
								<li key={id}>
									<p>{comment}</p>
								</li>
							))}
						</ul>
					) : (
						<p>There are no comments yet.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogInfo;
