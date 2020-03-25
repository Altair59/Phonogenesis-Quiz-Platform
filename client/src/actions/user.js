
export const readCookie = (app) => {
	const url = "http://127.0.0.1:9000/users/check-session";

	fetch(url)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
		})
		.then(json => {
			if (json && json.currentUser) {
				app.setState({currentUser: json.currentUser});
			}
		})
		.catch(error => {
			console.log(error);
		});
};

export const login = (loginPage, loginProps) => {
	const request = new Request("http://127.0.0.1:9000/users/login", {
		method: "post",
		body: JSON.stringify(loginPage.state),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	});

	fetch(request).then(res => {
		res.json().then(result => {
			if (result.currentUser !== undefined){
				loginProps.app.setState({currentUser: result.currentUser});
				loginProps.history.push({pathname: '/' + result.currentUser.type});
			}
		}).catch(err => {
			console.log(err);
		});
	});

};

export const logout = (app) => {
	const url = "http://127.0.0.1:9000/users/logout";

	fetch(url)
		.then(res => {
			app.setState({
				currentUser: null,
				message: {
					type: "",
					body: ""
				}
			});
		})
		.catch(error => {
			console.log(error);
		})
};
