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

export function getUserByUsername(username){
	for (let i = 0; i < users.length; i++){
		const user = users[i];

		if (user.username === username){
			return user;
		}
	}

	return null;
}

export function getStudentsByGroup(group){
	let userLst = [];
	for (let i = 0; i < users.length; i++){
		if (users[i].type === "student" && users[i].groups.includes(group)){
			userLst.push(users[i]);
		}
	}

	return userLst;
}


export const groups = {};
