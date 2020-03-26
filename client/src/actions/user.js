const axios = require('axios');
axios.defaults.withCredentials = true;

export const readCookie = (app) => {
	axios.get("http://127.0.0.1:9000/users/check-session/").then(function (res) {
		if (res.data.currentUser) {
			console.log("SESSION CHECK PASSED");
			console.log(res.data.currentUser);
			app.setState({currentUser: res.data.currentUser});
			return res.data.currentUser;
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
			loginProps.history.push({pathname: '/' + user.type});
		}
	}).catch(err => {
		console.log(err);
	});

};

export const logout = (app) => {
	const url = "http://127.0.0.1:9000/users/logout";

	// fetch(url, {credentials: 'same-origin'}).then(res => {
	// 	app.setState({
	// 		currentUser: null
	// 	});
	// }).catch(error => {
	// 	console.log(error);
	// })
};

export const getUsers = (page) => {
	// fetch("http://127.0.0.1:9000/users", {
	// 	method: 'GET',
	// 	credentials: 'same-origin'
	// }).then(res => {
	// 	res.json().then((result) => {
	// 		page.setState({users: result.users});
	// 	});
	// });
	axios.get("http://127.0.0.1:9000/users").then(res => {
		res.json().then((result) => {
			page.setState({users: result.users});
		})
	})
};

export const removeUser = (page, username) => {
	//const newURL = "http://127.0.0.1:9000/users/" + username;
	// fetch(newURL, {
	// 	method: 'DELETE',
	// 	credentials: 'same-origin'
	// }).catch(error => {
	// 	console.log(error)
	// });
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
	// const info = {
	// 	name: app.state.name,
	// 	type: app.state.type,
	// 	email: app.state.email,
	// 	username: app.state.username,
	// 	password: app.state.password,
	// 	groups: [],
	// 	quizzes: []
	// };
	// fetch("http://127.0.0.1:9000/users/", {
	// 	method: 'post',
	// 	credentials: 'same-origin',
	// 	body: JSON.stringify(info),
	// 	headers: {
	// 		Accept: "application/json, text/plain, */*",
	// 		"Content-Type": "application/json"
	// 	}
	// }).then(result => {
	// 	app.setState({currEdit: -1});
	// }).catch(err => {
	// 	console.log(err);
	// });
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
	// const newURL = "http://127.0.0.1:9000/users/" + JSON.stringify(username);
	// fetch(newURL, {
	// 	method: 'PATCH',
	// 	credentials: 'same-origin',
	// 	body: JSON.stringify(info),
	// 	headers: new Headers({'Content-Type': 'application/json'})
	// }).catch(error => {
	// 	console.log(error)
	// });
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
