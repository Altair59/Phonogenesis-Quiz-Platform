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

export const getUserQuizzes = (page, username) => {
	axios.get(`http://127.0.0.1:9000/quiz/user/${username}`).then(res => {
		page.setState({quizzes: res.data});
	}).catch(err => {
		console.log(err);
	});
};

export const getRuleList = (page) => {
	axios.get("http://127.0.0.1:9000/quiz/rule").then(res => {
		page.setState({rules: res.data});
	}).catch(error => {
		console.log(error);
	});
};

export const distributeQuiz = (page, quizObj) => {
	axios.post("http://127.0.0.1:9000/quiz/makeQuiz", {
		timeLim: quizObj.timeLim,
		name: quizObj.name,
		owner: quizObj.owner,
		pastResult: quizObj.pastResult,
		questions: quizObj.questions,
		group: quizObj.group
	}).then(res => {
		if (res.data.result !== true){
			alert("Failed to distribute quiz. Quiz must have unique name.");
		} else {
			alert("Quiz created and sent to all group members!");
		}
	}).catch(error => {
		console.log(error);
	});
};