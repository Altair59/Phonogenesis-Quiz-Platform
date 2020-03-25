

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
