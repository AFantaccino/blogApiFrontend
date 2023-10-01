import axios from "axios";
const url = "/api/login";

const login = async credentials => {
	const user = await axios.post(url, credentials);
	return user.data;
};

const loginToken = async token => {
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	const user = await axios.post(url, {}, config);
	return user.data;
};

export default { login, loginToken };
