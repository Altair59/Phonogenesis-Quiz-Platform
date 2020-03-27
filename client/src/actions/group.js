import {findUser} from "../actions/user";
const axios = require('axios');
axios.defaults.withCredentials = true;

export const getGroups = (page) => {
	axios.get(`http://127.0.0.1:9000/groups/prof/${page.props.app.state.currentUser.username}`).then(res => {
		const groups = res.data;
		console.log(groups);
		groups.map((group) => {
			const students = [];
			group.students.map((stuName) => {
				students.push(findUser(page, stuName));
			});
			group.students = students;
		});
		console.log(groups);
		page.setState({groupsWithStuObj: groups, groupsWithStuName: res.data.groups})
	})
};

export const removeGroup = (page, name) => {
	axios.delete(`http://127.0.0.1:9000/groups/${name}`).then(res => {
		getGroups(page);
	}).catch(err => {
		console.log(err);
	});
};

export const addGroup= (page, info) => {
	axios.post("http://127.0.0.1:9000/groups/", info
	).then(res => {
		getGroups(page);
	}).catch(error => {
		console.log(error)
	});
};

export const editGroup = (page, name, info) => {
	axios.patch(`http://127.0.0.1:9000/users/${name}`, info).then(res => {
		getGroups(page);
	}).catch(err => {
		console.log(err);
	});
};

export const findUGroup = (page, name) => {
	axios.get(`http://127.0.0.1:9000/users/${name}`).then(res => {
		return res.result;
	})
};