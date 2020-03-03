export const users = [
	{
		type: "admin",
		name: "admin",
		email: "admin@admin.com",
		username: "admin",
		password: "admin",
		groups: []
	},
	{
		type: "professor",
		name: "David",
		email: "david@gmail.com",
		username: "david123",
		password: "password",
		groups: []
	},
	{
		type: "student",
		name: "Josh",
		email: "joshhan619@gmail.com",
		username: "joshhan619",
		password: "password",
		groups: []
	},
	{type: "student", name: "Adrian", email: "adrian@gmail.com", username: "adrianz", password: "password", groups: []},
	{type: "student", name: "Youhai", email: "youhai@gmail.com", username: "liyouhai", password: "password", groups: []}
];

export function getUserByName(name){
	for (let i = 0; i < users.length; i++){
		const user = users[i];

		if (user.name === name){
			return user;
		}
	}

	return null;
}

export function getUserByUsername(username){
	for (let i = 0; i < users.length; i++){
		const user = users[i];

		if (user.username === username){
			return user;
		}
	}

	return null;
}

export const groups = {};