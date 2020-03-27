const axios = require('axios');
axios.defaults.withCredentials = true;

export const registerPastResult = (pastResult, username, quizName) => {
	axios.post("http://127.0.0.1:9000/quiz/register", {
		username: username,
		quizName: quizName,
		pastResult: pastResult
	}).then(res => {
	}).catch(err => {
		console.log(err);
	});
};

export const fetchPastResult = (timeStamp, quizName, username, page) => {
	if (!timeStamp || timeStamp === "0"){
		page.setState({pastResult: null});
		return;
	}

	axios.get(`http://127.0.0.1:9000/quiz/past/${username}/${quizName}/${timeStamp}`).then(res => {
		if (res.data){
			page.setState({pastResult: res.data});
		} else {
			console.log("Empty Response failed to find past result");
			page.setState({pastResult: null});
		}
	}).catch(err => {
		console.log(err);
	});
};