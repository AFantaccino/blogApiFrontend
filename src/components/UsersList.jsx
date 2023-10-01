import { useSelector } from "react-redux";
import User from "./User";
import { useMatch } from "react-router-dom";
import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";

const UsersList = () => {
	const match = useMatch("/users/:id");

	const users = useSelector(({ usersList }) => usersList);

	const user = match
		? users.filter(user => user.id === match.params.id)
		: null;

	if (user !== null) {
		return (
			<Container>
				<Box>
					{user.map(user => (
						<User key={user.id} user={user} />
					))}
				</Box>
			</Container>
		);
	}

	return (
		<Container>
			<Typography variant="h5" sx={{ margin: 1, textAlign: "center" }}>
				Users
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>&nbsp;</TableCell>
							<TableCell>blogs created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<User key={user.id} user={user} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default UsersList;
