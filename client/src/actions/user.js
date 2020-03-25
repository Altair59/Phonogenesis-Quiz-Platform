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

export const login = (loginComp, app) => {
  console.log(loginComp.state)
  const request = new Request("http://localhost:9000/users/login", {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json.currentUser !== undefined) {
        app.setState({currentUser: json.currentUser });
      }
    })
    .catch(error => {
      console.log(error);
    })
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
}
