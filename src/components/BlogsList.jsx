import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogsList = () => {
	const blogs = useSelector(({ blogs }) => blogs);

	return (
		<div className="flex flex-col place-items-center gap-3 m-5">
			<p className="m-5 font-bold text-xl">Blogs</p>
			<table className="w-1/2 border border-black">
				<tbody>
					{blogs.map((blog, id) => (
						<Blog key={id} blog={blog} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BlogsList;
