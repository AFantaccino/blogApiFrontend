import axios from "axios";
const url = "/api/users";

const getAll = async () => {
	const resp = await axios.get(url);
	return resp.data;
};

const getOne = async id => {
	const resp = await axios.get(`${url}/${id}`);
	return resp.data;
};

export default { getAll, getOne };
