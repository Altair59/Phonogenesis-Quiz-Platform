const axios = require('axios');
axios.defaults.withCredentials = true;

export const getQuizByUser = (username, page) => {
	axios.get(`http://127.0.0.1:9000/quiz/user/${username}`).then(res => {
		const quizzes = res.data;
		page.setState({userQuizzes: quizzes});
	}).catch(err => {
		console.log(err);
	});
};