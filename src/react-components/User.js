export const users = [
	{
		type: "admin",
		name: "admin",
		email: "admin@admin.com",
		username: "admin",
		password: "admin",
		groups: null,
		quizzes: null
	},
	{
		type: "student",
		name: "Adrian",
		email: "adrian@gmail.com",
		username: "user",
		password: "user",
		groups: ["csc309"],
		quizzes: []
	},
	{
		type: "student",
		name: "Josh",
		email: "joshhan619@gmail.com",
		username: "user1",
		password: "user1",
		groups: ["csc309"],
		quizzes: []
	},
	{
		type: "student",
		name: "Youhai",
		email: "youhai@gmail.com",
		username: "user2",
		password: "user2",
		groups: ["csc309"],
		quizzes: []
	},
	{
		type: "professor",
		name: "Mark",
		email: "mark@gmail.com",
		username: "user3",
		password: "user3",
		groups: ["csc309"],
		quizzes: []
	}
];

export const groups = {
	"csc309": [getUserByUsername("user3"), getUserByUsername("user"), getUserByUsername("user1"), getUserByUsername("user2")]
};

export const quizzes = {

};

export function getUserByUsername(username) {
	for (let i = 0; i < users.length; i++) {
		const user = users[i];

		if (user.username === username) {
			return user;
		}
	}

	return null;
}