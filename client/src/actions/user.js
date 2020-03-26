const axios = require('axios');
axios.defaults.withCredentials = true;

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
		res.json().then((result) => {
			page.setState({users: result.users});
		})
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
		body: {
			name: app.state.name,
			type: app.state.type,
			email: app.state.email,
			username: app.state.username,
			password: app.state.password,
			groups: [],
			quizzes: []
		}
	}).then(result => {
		app.setState({currEdit: -1})
	}).catch(error => {
		console.log(error)
	});
	getUsers(app)
};

export const editUser = (page, username, info) => {
	axios({
		method: 'patch',
		url: "http://127.0.0.1:9000/users/",
		params: username,
		body: info
	}).catch(error => {
		console.log(error)
	});
	getUsers(page)
};
