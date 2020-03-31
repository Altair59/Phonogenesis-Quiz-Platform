import {findUser, editUser, readCookie} from "./user";

const axios = require('axios');
axios.defaults.withCredentials = true;

export const getGroupUserList = (page, user) => {
	axios.post(`http://127.0.0.1:9000/groups/objectify`, {
		user: user
	}).then(res => {
		const groupToUser = res.data;

		if (groupToUser){
			page.setState({g2u: groupToUser});
		} else {
			console.log("NO G2U RESPONDED");
		}
	}).catch(err => {
		console.log(err);
	});

};

// export const getGroups = (page) => {
// 	axios.get(`http://127.0.0.1:9000/groups/prof/${page.props.app.state.currentUser.username}`).then(res => {
// 		const groups = res.data;
// 		groups.map((group) => {
// 			const students = [];
// 			group.students.map((stuName) => {
// 				students.push(findUser(page, stuName));
// 			});
// 			group.students = students;
// 		});
// 		page.setState({groupsWithStuObj: groups, groupsWithStuName: res.data.groups})
// 	})
// };

export const removeGroup = (page, name) => {
	axios.delete(`http://127.0.0.1:9000/groups/${name}`).then(res => {
		getGroupUserList(page.page.props.app.state.currentUser);
	}).catch(err => {
		console.log(err);
	});
};

export const addGroup = (page, name) => {
	const prof = page.props.app.state.currentUser;
	let reg = /^[0-9a-zA-Z]+[-]?[0-9a-zA-Z]+$/;

	if (!reg.test(name)) {
		alert("Group must be alphanumeric strings with an optional - in the middle!");
		page.setState({err: true});
	} else {
		axios.post("http://127.0.0.1:9000/groups/", {
				name: name,
				owner: prof.username,
				students: []
			}
		).then(res => {
			if (!res.data.result) {
				alert("Group already exists!");
				page.setState({err: true});
			} else {
				alert("Group added!");
				getGroupUserList(page, res.data.result);
				page.setState({err: false});
			}
		}).catch(error => {
			console.log(error)
		});
	}
};

export const addToGroup = (page, username, groupName) => {
	axios.patch("http://127.0.0.1:9000/groups/add", {
		studentName: username,
		groupName: groupName
	}).then(res => {
		if (!res.data.result) {
			alert("Student must be present and not enrolled in this group yet")
		} else {
			alert("Student Added!");
			page.setState({trig: this.state.trig + 1});
		}
		getGroupUserList(page.page.props.app.state.currentUser);
	}).catch(err => {
		console.log(err);
	});
};
