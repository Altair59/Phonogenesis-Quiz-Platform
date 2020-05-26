====== Deployed APP URL ======
https://accelsnow.com


====== Roles of Users ======

0. Roles of Users and Features
    === Admin ===
    0.1 Admin:
        0.1.1 User management: add/remove/edit
        0.1.2 Messaging: communication with admins/students/professors

    === Student ===
    0.2 Student:
        0.2.1 Group management: quit from group
        0.2.2 Quiz taking: do assigned quizzes
        0.2.3 Quiz reviewing: review own past quizzes and answers
        0.2.4 Practice: self-practicing DIY questions
        0.2.5 Messaging: communication with admins/students/professors

    === Professor ===
    0.3 Professor:
        0.3.1 Group management: add/remove group, add/remove student to/from a group
        0.3.2 Quiz creating/distributing: create quizzes and distribute to groups
        0.3.3 Quiz tracking: check students' progress on quizzes
        0.3.4 Messaging: communication with admins/students/professors

    === Overall Features ===
    0.4 Features Summary:
        0.4.1 Group Management
        0.4.2 User Management
        0.4.3 Quiz creating/distributing/tracking/taking/reviewing
        0.4.4 Practice
        0.4.5 Messaging


====== How to Use the App and Features ======

1. The first page you will see is the login page, consists of a login block and a link to create an account.
    === Setup Instruction ===
    1.1 If you already have an account in our database, you can type in your username and password to log in.
        default users in the database:
        username: admin | user | user2
        password: admin | user | user2
        type: admin | student| professor

    1.2 If you don't have an account yet, click the link below, which will navigate you to the sign up page. Then you
    can fill in the required text fields and selector to set up proper account information (or there will be alerts).
    After you click the sign up button, your new account is all set and you can return to the login page to log in with
    your new account.

2. Once you logged in with a valid account, the app will navigate you to your home page according to your account type:
    === Admin Instruction ===
    2.1 If you are an admin, your home page consists of 5 components:
        2.1.1 The top bar with text "phonogenesis" gives you one option to click to "Log Out", then your session ends,
        and you will be sent back to the log in page.

        2.1.2 A row of text fields and selector to set up the information for a new account to be created. After filling
        in proper information (or there will be alerts) and click the "ADD USER" button, the new user will be created.

        2.1.3 A table showing all the users. Except for admin users, you can click the "REMOVE" button to the right of
        every user to delete them. For all users, you can click the "EDIT" button to the right of every user to edit all
        their account information except username and click the "APPLY" button to save the changes. For safety
        considerations, all the displayed passwords are hashed to unrecognizable strings to prevent information leaks.
        However, you can still edit password by typing what you want and that will be the new password, they are just
        simply not displayed in their original forms.
            2.1.3.1 A system message saying that the account information has been changed will sent to the user whose
            information was changed.

        2.1.4 A message sending terminal. You can type in your text messages, and select groups or users to send message.

        2.1.5 A message receiving terminal. You can view all the incoming messages, and can remove them by clicking the
        "REMOVE" button on each message.

    === Student Instruction ===
    2.2 If you are a student, your home page consists of 4 components:
        2.2.1 The top bar with text "phonogenesis" gives you 5 options, as long as you stayed logged in as this student:
            2.2.1.1 "Home": redirect you to your student main page.

            2.2.1.2 "Groups": redirect you to a page showing the information of all the groups which you enrolled in.
            you can click the "DROP" button to quit from this group, and a system message will be sent to this group's
            instructor saying that you quit.

            2.2.1.3 "Quiz": redirect you to a page showing all the quizzes that are assigned to you.
                2.2.1.3.1 If you have taken this quiz before, you can review the quiz result (questions, correct answers, your answers...)
                2.2.1.3.2 Else, you need to take this quiz under this quiz's settings (time limits, questions, hints...)
                where each page shows one of the questions in this quiz, and you need to select 1 of the 4 options as your
                answer to this question and then proceed to the next question.

            2.2.1.4 "Practice": redirect you to a page with a self-practicing tool; you can set the question settings,
            and click the "GENERATE QUESTION" button to see the question (also hints and answers along with).

            2.2.1.5 "Log Out": log out and end your session as this student; you will be sent back to the log in page.

        2.2.2 Your account information block, with a list of group names which you enrolled in.

        2.2.3 A message sending terminal. You can type in your text messages, and select groups or users to send message.

        2.2.4 A message receiving terminal. You can view all the incoming messages, and can remove them by clicking the
        "REMOVE" button on each message.

    === Professor Instruction ===
    2.3 If you are a professor, your home page consists of 4 components:
        2.3.1 The top bar with text "phonogenesis" gives you 5 options, as long as you stayed logged in as this professor:
            2.3.1.1 "Home": redirect you to your professor main page.

            2.3.1.2 "Make Quiz": redirect you to a page with a quiz generator tool.
                2.3.1.2.1 You must type in a unique quiz name (never taken before), set up time  >= 10, and select one
                of the groups you are instructing as the target to receive this quiz.
                2.3.1.2.2 You must add at least 1 question to this quiz, by clicking the "ADD QUESTION" button. Then a
                question block will be generated and you can specify this question's contents and settings.
                2.3.1.2.3 Once you are done with creating the quiz, you can click the "SEND QUIZ" button at bottom to
                send this quiz, and all the students in the group will receive this quiz and from now you can always
                check the progress on this quiz of these students in "Quiz Results".
                2.3.1.2.4 A system message saying that a new quiz has been created will be sent to all the students in
                the target group.

            2.3.1.3 "Quiz Results": redirect you to a page with a quiz check progress tool.
                2.3.1.3.1 You must select one of the quizzes you have created, and then click the "CHECK RESULTS" button.
                2.3.1.3.2 A table of students who need to do this quiz will be displayed, along with student information
                and their progress (Score & Time Completed) of this quiz.
                2.3.1.3.3 If the student has taken this quiz, you can click the "DETAIL" button in this student's
                progress row  to check the detailed quiz result (student answers, correct answers...).


            2.3.1.4 "Groups": redirect you to page showing all the groups which you are instructing.
                2.3.1.4.1 You can add a group by typing in a unique group name and click the "Create Group" button.
                2.3.1.4.2 You can remove a group by clicking the trash bin icon in each group's block. All the students
                currently in the group will be automatically removed.
                2.3.1.4.3 You can add a student to a group by typing the student username and click the add icon next to
                the input text field, if this student is valid and not yet enrolled in this group.
                2.3.1.4.4 You can remove a student from a group by clicking the trash bin icon in this student's row in
                this group's block.
                2.3.1.4.5 A system message regarding the group management will be sent to the target student when
                adding/removing this student to/from a group.

            2.3.1.5 "Log Out": log out and end your session as this student; you will be sent back to the log in page.

        2.3.2 Your account information block, with a list of group names which you are instructing.

        2.3.3 A message sending terminal. You can type in your text messages, and select groups or users to send message.

        2.3.4 A message receiving terminal. You can view all the incoming messages, and can remove them by clicking the
        "REMOVE" button on each message.


====== Express Server Routes Overview ======
3.1 group.js
    3.1.0 this router is at path  "/groups"

    3.1.1 router.get("/objectify/:username":
        usage: given current username in the session, fetch the up-to-date group-user mappings return this mappings
        params: username | String
        response: {group1.name: User[], group2.name: User[], ...}

    3.1.2 router.post("/":
        usage: given group name, prof name, and initial empty students list, add a new group to the server, return post result
        request:
        {
        name | String,
        owner | String,
        students | []
        }
        response: {result: User model (who in the session) OR false}

    3.1.3 router.delete("/:name":
        usage: given group name, delete this group from the server, return delete result and student username list from the original group
        params: name | String
        response: {result: Boolean, students: String[]}

    3.1.4 router.patch("/add":
        usage: given student name and group name, add this student to this group, return patch result
        request:
        {
        studentName | String,
        groupName | String
        }
        response: {result: Boolean}

    3.1.5 router.patch("/remove":
        usage: given student name and group name, delete this student from this group, return patch result
        request:
        {
        studentName | String,
        groupName | String
        }
        response: {result: Boolean}

    3.1.6 router.post("/message":
        usage: given group name and message, send this message to this group, return post result
        request:
        {
        groupName | String,
        message | String
        }
        response: {result: Boolean}

    3.1.7 router.get("/get/:name":
        usage: given group name, fetch all student User models in this group, return list of these students
        params: name | String
        response: Users[]

    3.1.8 router.get("/":
        usage: given nothing, fetch all group Group models, return list of these groups
        response: Group[]


3.2 quiz.js
    3.2.0 this router is at path  "/quiz"

    3.2.1 router.get('/rule':
        usage: fetch all Rule models, return list of these Rules
        response: Rule[]

    3.2.2 router.get('/user/:username':
        usage: given user name, fetch all this user's quizzes Quiz model, return list of these quizzes
        params: username | String
        response: Quiz[]

    3.2.3 router.get('/rule/getRule/:text':
        usage: given rule text, fetch this rule Rule model, return this rule
        params: text | String
        response: Rule

    3.2.4 router.post('/makeQuiz':
        usage: given quiz information, post this quiz to the server, return post result
        request:
        {
        	timeLim | Integer,
        	name | String
        	owner | String,
        	pastResult | null,
        	questions | [{
                       				rule | String,
                       				size | Integer,
                       				canUR | Boolean,
                       				canPhoneme | Boolean,
                       				maxCADT | Integer
                        }],
        	group | String
        }
        response: {result: Boolean}

    3.2.5 router.post('/register':
        usage: given user name, quiz name, and past result, register this past result, return this user
        request:
        {
            username | String,
            quizName | String,
            pastResult | {
                score | Integer,
                answers | String,
                timeStamp | String
            }
        }
        response: User

    3.2.6 router.get('/past/:user/:quiz/:stamp':
        usage: given user name, quiz name, and time stamp, fetch the result of this quiz, return this result
        params: user | String, quiz | String, stamp | String
        response:
        {
            score | Integer,
            answers | String,
            timeStamp | String
        }


3.3 users.js
    3.3.0 this router is at path  "/users"

    3.3.1 router.delete("/message/:username/:id":
        usage: given user name and message id, delete this message, return an object which contains user User model adter deletion
        params: username | String, id | String
        response:
        {
        user : {
               		username | String,
               		name | String,
               		email | String,
               		type | String,
               		groups | [String],
               		quizzes | [Quiz],
               		messages| [String]
               	}
        }

    3.3.2 router.post("/message":
        usage: given message and user name, send this message to this user, return post result
        request:
        {
            message | String,
            username | String
        }
        response: {result: Boolean}

    3.3.3 router.post("/login":
        usage: given user name and password, log in this user, return an object which contains user User model adter log in
        request:
        {
            username | String,
            password | String
        }
        response:
        {currentUser : {
                username | String,
                name | String,
                email | String,
                type | String,
                groups | [String],
                quizzes | [Quiz],
                messages| [String]
            },
        result | Boolean

        }

    3.3.4 router.get("/logout":
        usage: log out current user

    3.3.5 router.get("/check-session":
        usage: check whether there is a valid user logged in
        responseL
        {currentUser: null OR {
                username | String,
                name | String,
                email | String,
                type | String,
                groups | [String],
                quizzes | [Quiz],
                messages| [String]
            }
        }

    3.3.6 router.post("/":
        usage: given user information, add this new user, return post result
        request:
        {
            	name | String,
            	type | String,
            	email | String,
            	username | String,
            	password | String,
            	groups | [],
            	quizzes | []
        }
        response: {result: Boolean}

    3.3.7 router.get("/":
        usage: fetch all user User models, return list of these users
        response: {users : [User]}

    3.3.8 router.get("/:username":
        usage: given user name, fetch this user User model, return User OR null
        params: username | String
        responseL {result: null OR User}

    3.3.9 router.delete("/:username":
        usage: given user name, delete this user, return deleted user User model
        params: username | String
        response: User

    3.3.10 router.patch("/:username":
        usage: given user name and new user information, edit this user, return this user
        params: username | String
        request:
        {
            name | String,
            type | String,
            username | String,
            password | String,
            email | String,
            groups | [String],
            quizzes | [Quiz]
        }
        response: User
