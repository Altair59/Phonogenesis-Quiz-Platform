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
}
