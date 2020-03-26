const axios = require('axios');
axios.defaults.withCredentials = true;
const qs = require('qs');

export const readCookie = (app) => {
	axios.get("http://127.0.0.1:9000/users/check-session/").then(function (res) {
		if (res.data.currentUser) {
			app.setState({currentUser: res.data.currentUser});
		} else {
			app.setState({currentUser: null});
		}
	}).catch(err => {
		console.log(err);
	});
};

export const login = (loginPage, loginProps) => {
	axios.post("http://127.0.0.1:9000/users/login", {
		username: loginPage.state.username,
		password: loginPage.state.password
	}).then(function (res) {
		const user = res.data.currentUser;
		if (user) {
			console.log(`Logged in as ${user.username}`);
			loginProps.app.setState({currentUser: user});
		}
	}).catch(err => {
		console.log(err);
	});

};

export const logout = (app) => {
	const url = "http://127.0.0.1:9000/users/logout";
	axios.get(url,).then(res => {
		app.setState({currentUser: null})
	}).catch(error => {
		console.log(error)
	})
};

export const getUsers = (page) => {
	axios.get("http://127.0.0.1:9000/users").then(res => {
		page.setState({users: res.data.users});
	})
};

export const removeUser = (page, username) => {
	axios.delete("http://127.0.0.1:9000/users/", {
		params: {
			username: username
		}
	}).catch(error => {
		console.log(error)
	});
	getUsers(page);
};

export const addUser = (app) => {
	axios.post("http://127.0.0.1:9000/users/", {
			name: app.state.name,
			type: app.state.type,
			email: app.state.email,
			username: app.state.username,
			password: app.state.password,
			groups: [],
			quizzes: []
		}
	).then(result => {
		app.setState({currEdit: -1})
	}).catch(error => {
		console.log(error)
	});
	getUsers(app)
};

export const editUser = (page, username, info) => {
	axios.patch("http://127.0.0.1:9000/users/", info, {
		params: username,
	}).catch(error => {
		console.log(error)
	});
	getUsers(page)
};
