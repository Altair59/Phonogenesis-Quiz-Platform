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

export const getRuleList = (page) => {
	axios.get("http://127.0.0.1:9000/quiz/rule").then(res => {
		page.setState({rules: res.data});
	}).catch(error => {
		console.log(error);
	});
};

export const checkQuizExist = (page, quizName) => {
	axios.get(`http://127.0.0.1:9000/quiz/getQuiz/${quizName}`).then(res => {
		if (res.data){
			page.setState({duplicateName: true});
		} else {
			page.setState({duplicateName: false});
		}
	}).catch(error => {
		console.log(error)
	});
};

export const distributeQuiz = (page, groupName, quizObj) => {
	axios.post("http://127.0.0.1:9000/quiz/makeQuiz", {
		timeLim: quizObj.timeLim,
		name: quizObj.name,
		pastResult: quizObj.pastResult,
		questions: quizObj.questions,
		groupName: groupName
	}).then(res => {
		if (res.data.result !== true){
			alert("Failed to distribute quiz");
		} else {
			alert("Quiz created and sent to all group members!");
		}
	}).catch(error => {
		console.log(error);
	});
};

export const getRule = (page, ruleText) => {
	axios.get(`http://127.0.0.1:9000/quiz/rule/getRule/${ruleText}`).then(res => {
		page.setState({currentRule: res.data});
	}).catch(error => {
		console.log(error);
	})
};