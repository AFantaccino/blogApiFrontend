import axios from "axios";

const url = "http://localhost:3003/api";

const user = {
	name: "Matti Luukkainen",
	username: "mluukkai",
	password: "salainen"
};

const reset = async () => {
	await axios.post(`${url}/testing/reset`);
};

const registerNewUser = async () => {
	await axios.post(`${url}/users`, user);
};

const login = async () => {
	const user = await axios.post(`${url}/login`, {
		name: user.name,
		password: user.password
	});
	return user.data;
};

export default { reset, registerNewUser, login };
