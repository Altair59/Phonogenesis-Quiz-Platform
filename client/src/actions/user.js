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

export const logout = () => {
	const url = "http://127.0.0.1:9000/users/logout";
	axios.get(url,).then(res => {

	}).catch(error => {
		console.log(error)
	})
};

export const signUp = (signUpPage, signUpProps) => {
	axios.post("http://127.0.0.1:9000/users", signUpProps)
		.then(res => {
			if (res.status === 200) {
				console.log('Sign up successful');
				signUpPage.props.history.push('/login');
			}
		})
		.catch(err => {
			console.log(err)
		});
};

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

export const deleteMessage = (page, username, msgid) => {
	axios.delete(`http://127.0.0.1:9000/users/message/${username}/${msgid}`).then(res => {
		if (!res.data.user){
			console.log("FAILED TO DELETE MESSAGE");
		} else {
			page.setState({currentUser: res.data.user});
		}
	}).catch(err => {
		console.log(err);
	})
};

export const sendMessage = (username, message) => {
	axios.post("http://127.0.0.1:9000/users/message", {message: message, username: username}).then(res => {
		if (!res.data.result){
			console.log("FAILED TO SEND MESSAGE TO USER");
		}
	}).catch(err => {
		console.log(err);
	});
};


export const editUser = (page, username, info) => {
	axios.patch(`http://127.0.0.1:9000/users/${username}`, info).then(res => {
		getUsers(page);
		sendMessage(username, "Your account information has been edited by an admin.");
	}).catch(err => {
		console.log(err);
	});
};

export const findUser = (page, username) => {
	axios.get(`http://127.0.0.1:9000/users/${username}`).then(res => {
		page.setState({currentUser: res.data.result})
	}).catch(err => console.log(err))
};
