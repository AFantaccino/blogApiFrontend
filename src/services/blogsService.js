import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const create = async blog => {
	const config = {
		headers: { Authorization: token }
	};
	const response = await axios.post(baseUrl, blog, config);
	return response.data;
};

const update = async blog => {
	const config = {
		headers: { Authorization: token }
	};
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
	return response.data;
};

const eliminate = async id => {
	const config = {
		headers: { Authorization: token }
	};
	await axios.delete(`${baseUrl}/${id}`, config);
};

const comment = async ({ id, comment }) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
	return response.data;
};

export default { setToken, getAll, create, update, eliminate, comment };
