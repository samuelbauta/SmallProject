const urlBase = 'http://cop4331.site/LAMPAPI'
const extension = 'php'
let userID = 0
let firstName = ""
let lastName = ""

//add event listeners for various elements
document.getElementById("createAccountBtn").addEventListener("click", createAccount)
document.getElementById("loginBtn").addEventListener("click", userLogin)

document.getElementById("newPassword").addEventListener("blur", checkLength)
document.getElementById("rePassword").addEventListener("blur", checkMatchingPasswords)

//user login function
function userLogin() {
	let login = document.getElementById("userName").value
	let password = document.getElementById("loginPassword").value
	let errorMsg = document.getElementById("loginErrorMessge")

	let tmp = { login: login, password: password }
	let jsonPayload = JSON.stringify(tmp)
	let url = urlBase + '/Login.' + extension

	//form validation for user login window
	if (login == "") {
		errorMsg.innerHTML = "User name is required"
		return
	}
	if (password == "") {
		errorMsg.innerHTML = "Password is required"
		return
	}

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText)
				userID = jsonObject.userID

				if (userID < 1) {
					errorMsg.innerHTML = "User/Password combination incorrect"
					return;
				}
				firstName = jsonObject.firstName
				lastName = jsonObject.lastName
				document.getElementById("loginResult").innerHTML = "Welcome " + firstName
				$('#logScreen').modal('hide')
				saveCookie()
				window.location.href = "contacts.html"
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		errorMsg.innerHTML = err.message
	}
}
//function to create a new user
function createAccount() {
	console.log("Create Account button clicked")
	firstName = document.getElementById("firstName").value
	lastName = document.getElementById("lastName").value
	let login = document.getElementById("newUserName").value
	let password = document.getElementById("newPassword").value
	let errorMsg = document.getElementById("errorMessage")

	let tmp = { "firstName": firstName, "lastName": lastName, "login": login, "password": password }
	let jsonPayload = JSON.stringify(tmp)
	let url = urlBase + '/CreateAccount.' + extension;

	//form validation for create new user window
	if (firstName == "") {
		errorMsg.innerHTML = "First name is required"
		return
	}
	if (lastName == "") {
		errorMsg.innerHTML = "Last name is required"
		return
	}
	if (login == "") {
		errorMsg.innerHTML = "User name is required"
		return
	}

	if (!(checkLength() && checkMatchingPasswords() && checkLength())) {
		return
	}

	let xhr = new XMLHttpRequest()
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.error == "") {
					document.getElementById("loginResult").innerHTML = "Account successfully created. Please login to continue"
					$('#createAccountWindow').modal('hide')
				}
				else {
					errorMsg.innerHTML = "Username Already Taken";
					return
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message
	}
}
//helper functions for verifying passwords
function checkMatchingPasswords() {
	password = document.getElementById("newPassword").value
	rePassword = document.getElementById("rePassword").value
	let btn = document.getElementById("createAccountBtn")

	if (password !== rePassword) {
		document.getElementById("errorMessage").innerHTML = "Passwords do not match"
		return false
	}
	document.getElementById("errorMessage").innerHTML = ""
	return true
}
function checkLength() {
	password = document.getElementById("newPassword").value

	if (password.length < 5) {
		document.getElementById("errorMessage").innerHTML = "Password length must be at least 5 characters long"
		return
	}
	document.getElementById("errorMessage").innerHTML = ""
	return true
}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userID + ";expires=" + date.toGMTString();
}

function readCookie() {
	userID = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.location.href = "index.html";
	}
	else {
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}
