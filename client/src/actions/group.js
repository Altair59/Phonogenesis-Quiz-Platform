import {getUsers} from "./user";

const axios = require('axios');
axios.defaults.withCredentials = true;

export const getGroups = (page) => {
	axios.get("http://127.0.0.1:9000/groups").then(res => {
		page.setState({groups: res.data.groups});
	})
};

export const removeGroup = (page, name) => {
	axios.delete(`http://127.0.0.1:9000/groups/${name}`).then(res => {
		getGroups(page);
	}).catch(err => {
		console.log(err);
	});
};

export const addGroup= (page) => {
	axios.post("http://127.0.0.1:9000/groups/", {
			name: page.state.name,
			owner: page.state.owner
		}
	).then(res => {
		getGroups(page);
	}).catch(error => {
		console.log(error)
	});
};

export const editGroup = (page, name, info) => {
	axios.patch(`http://127.0.0.1:9000/users/${name}`, info).then(res => {
		getUsers(page);
	}).catch(err => {
		console.log(err);
	});
};