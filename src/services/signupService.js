import axios from "axios";
const url = "/api/users";

const signup = async credentials => {
	const user = await axios.post(url, credentials);
	console.log(user);
	return user.data;
};

export default { signup };
