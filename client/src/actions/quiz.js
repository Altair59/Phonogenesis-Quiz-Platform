const axios = require('axios');
axios.defaults.withCredentials = true;

export const registerPastResult = (pastResult, username, quizName, app) => {
	axios.post("http://127.0.0.1:9000/quiz/register", {
		username: username,
		quizName: quizName,
		pastResult: pastResult
	}).then(res => {
		app.setState({currentUser: res.data});
	}).catch(err => {
		console.log(err);
	});
};