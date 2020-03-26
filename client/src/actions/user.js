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

export const login = (loginPage, loginProps) => {
	const request = new Request("http://localhost:9000/users/login", {
		method: "post",
		body: JSON.stringify(loginPage.state),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	});

	fetch(request, {credentials: "same-origin"}).then(res => {
		res.json().then(result => {
			if (result.currentUser !== undefined) {
				loginProps.app.setState({currentUser: result.currentUser});
				loginProps.history.push({pathname: '/' + result.currentUser.type});
			}
		}).catch(err => {
			console.log(err);
		});
	});

};

export const logout = (app) => {
	const url = "http://localhost:9000/users/logout";

	fetch(url, {credentials: 'same-origin'}).then(res => {
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
		credentials: 'same-origin'
	}).then(res => {
		res.json().then((result) => {
			page.setState({users: result.users});
		});
	});
};

export const removeUser = (page, username) => {
	const newURL = "http://localhost:9000/users/" + username;
	fetch(newURL, {
		method: 'DELETE',
		credentials: 'same-origin'
	}).catch(error => {
		console.log(error)
	});
	getUsers(page);
};

export const addUser = (app) => {
	const info = {
		name: app.state.name,
		type: app.state.type,
		email: app.state.email,
		username: app.state.username,
		password: app.state.password,
		groups: [],
		quizzes: []
	};

	fetch("http://localhost:9000/users/", {
		method: 'post',
		credentials: 'same-origin',
		body: JSON.stringify(info),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	}).then(result => {
		app.setState({currEdit: -1});
	}).catch(err => {
		console.log(err);
	});
	getUsers(app)
};

export const editUser = (page, username, info) => {
	const newURL = "http://localhost:9000/users/" + JSON.stringify(username);
	fetch(newURL, {
		method: 'PATCH',
		credentials: 'same-origin',
		body: JSON.stringify(info),
		headers: new Headers({'Content-Type': 'application/json'})
	}).catch(error => {
		console.log(error)
	});
	getUsers(page)
};
