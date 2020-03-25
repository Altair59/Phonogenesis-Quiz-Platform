export const readCookie = (app) => {
  fetch("http://localhost:9000/users/check-session/")
    .then(res => {
      if(res.status === 200) {
				console.log(res)
        return res.json();
      }
    })
    .then(json => {
			console.log(json)
      if (json && json.currentUser) {
        app.setState({ currentUser: json.currentUser});
				console.log(app.state)
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const login = (loginComp, app) => {
	fetch("http://localhost:9000/users/login", {
		method: 'POST',
		body: JSON.stringify(loginComp.state),
		headers: {
			Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json"
		}
	})
	.then(res => {
		if (res.status === 200) {
			return res.json()
		}
	})
	.then(json => {
		const newCookie = "username="+json.username
		document.cookie = newCookie;
		if (json.currentUser !== undefined && json.userType !== "") {
			console.log(app)
			app.setState({ currentUser: json.currentUser, userType: json.userType});
		}
	})
	.catch(error => {
		console.log(error);
	});
}

export const logout = (app) => {
	const url = "http://127.0.0.1:9000/users/logout";

	fetch(url).then(res => {
		app.setState({
			currentUser: null
		});
	}).catch(error => {
		console.log(error);
	})
};

export const getUsers = (page) => {
	fetch("http://localhost:9000/users", {
		method: 'GET',
	}).then(res => {
		res.json().then((result) => {
			page.setState({users: result});
		});
	});
};

export const removeUser = (page, username) => {
	const newURL = "http://localhost:9000/users/" + JSON.stringify(username);
	fetch(newURL, {
		method: 'DELETE',
	}).catch(error => {
		console.log(error)
	});
	getUsers(page);
};

export const addUser = (page, username) => {
	const newURL = "http://localhost:9000/users/" + JSON.stringify(username);
	fetch(newURL, {
		method: 'GET',
	}).then(res => {
		res.json().then((result) => {
			page.setState({apiResponse: result});
		});
	});
	if (page.state.apiResponse) {
		alert("Username must be unique!");
		this.setState({usernameError: "unique username required"});
		return;
	} else {
		page.setState({usernameError: ""});
	}

	const info = {
		name: page.state.name,
		type: page.state.type,
		email: page.state.email,
		username: page.state.username,
		password: page.state.password,
		groups: [],
		quizzes: []
	};
	fetch(newURL, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: new Headers({'Content-Type': 'application/json'})
	}).catch(error => {
		console.log(error)
	});
	page.setState({currEdit: -1, apiResponse: null});
	getUsers(page)
};

export const editUser = (page, username, info) =>{
	const newURL = "http://localhost:9000/users/" + JSON.stringify(username);
	fetch(newURL, {
		method: 'PATCH',
		body: JSON.stringify(info),
		headers: new Headers({'Content-Type': 'application/json'})
	}).catch(error => {
		console.log(error)
	});
	getUsers(page)
};
