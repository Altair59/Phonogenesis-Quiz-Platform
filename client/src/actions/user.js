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

export const signUp = (signUpPage, signUpProps) => {
	axios.post("http://127.0.0.1:9000/users", JSON.stringify(signUpProps))
	.then(res => {
		if (res.status === 200) {
			console.log('Sign up successful');
			signUpPage.setState({isSignedUp: true})
		}
	})
	.catch(err => console.log(err));
}

export const handleTextFieldChange = (e, props) => {
	props.setState({
		[e.target.id]: e.target.value
	});
};

export const getUsers = (page) => {
	axios.get("http://127.0.0.1:9000/users").then(res => {
		page.setState({users: res.data.users});
	})
};

export const removeUser = (page, username) => {
	axios.delete(`http://127.0.0.1:9000/users/${username}`).then(res => {
		getUsers(page);
	}).catch(err => {
		console.log(err);
	});
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
	).then(res => {
		getUsers(app);
		app.setState({currEdit: -1});
	}).catch(error => {
		console.log(error)
	});
};

export const editUser = (page, username, info) => {
	axios.patch(`http://127.0.0.1:9000/users/${username}`, info).then(res => {
		getUsers(page);
	}).catch(err => {
		console.log(err);
	});
};
