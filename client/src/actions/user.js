export const readCookie = (app) => {
  const url="/users/check-session";

  fetch(url)
    .then(res => {
      if(res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json && json.currentUser) {
        app.setState({ currentUser: json.currentUser });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const logout = (app) => {
  const url = "/users/logout";

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

export const getUsers = (page) =>{
  fetch("http://localhost:9000/users", {
    method: 'GET',
  }).then(res => {
    res.json().then((result) => {
      page.setState({users: result});
    });
  });
};

export const removeUser = (page,username) =>{
  const newURL = "http://localhost:9000/users/" + JSON.stringify(username);
  fetch(newURL, {
    method: 'DELETE',
  }).catch(error => {
    console.log(error)
  });
  getUsers(page);
};

export const addUser = (page,username) =>{
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
  }).catch(error =>{
    console.log(error)
  });
  page.setState({currEdit: -1, apiResponse: null});
  getUsers(page)
};
