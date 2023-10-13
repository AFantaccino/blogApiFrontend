import { useSelector } from "react-redux";
import User from "./User";
import { useMatch } from "react-router-dom";

const UsersList = () => {
	const users = useSelector(({ usersList }) => usersList);

	return (
		<div className="flex flex-col place-items-center gap-3 m-5">
			<p className="m-5 font-bold text-xl">Users</p>
			<table className="w-1/2 border border-black">
				<thead>
					<tr>
						<td>&nbsp;</td>
						<td>blogs created</td>
					</tr>
				</thead>
				<tbody className="odd:bg-slate-500 text-white even:bg-green-300">
					{users.map(user => (
						<User key={user.id} user={user} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UsersList;
