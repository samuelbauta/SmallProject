const urlBase = 'LAMPAPI/'
const extension = 'php'
let userID = 0
let firstName = ""
let lastName = ""

document.addEventListener('DOMContentLoaded', function () {
    readCookie()
}, false)

document.getElementById("addContact").addEventListener("click", addContact);

function addContact() {
    console.log("Add contact button clicked")
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let userID = document.getElementById("userID").value
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let errorMsg = document.getElementById("errorMessage");

    let tmp = { "firstName": firstName, "lastName": lastName, "email": email, "phone": phone, "userID": userID };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/AddContact.' + extension;

    if (firstName == "") {
        errorMsg.innerHTML = "First name is required";
        return;
    }
    if (lastName == "") {
        errorMsg.innerHTML = "Last name is required";
        return;
    }
    if (email == "" && phone == "") {
        errorMsg.innerHTML = "Must add phone, email, or both";
        return;
    }

    if (!(checkValidEmail() && checkValidPhone())) {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.error == "") {
                    document.getElementById("addContactResult").innerHTML = "Successfully added" + document.getElementById("firstName") + " " + document.getElementById("lastName") + " to contacts";
                    $('#addContactWindow').modal('hide')
                }
                else {
                    document.getElementById("addContactResult").innerHTML = jsonObject.error
                    $('#addContactWindow').modal('hide')
                    return
                }

                //saveCookie();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("addContactResult").innerHTML = err.message
    }
}

function checkValidEmail() {
    email = document.getElementById("email").value;
    if (!(/(\w+)@(\w+).[a-z]/.test(email))) {
        document.getElementById("errorMessage").innerHTML = "Invalid email format (sample email: 'xyz@domain.com')"
        return false;
    }
    document.getElementById("errorMessage").innerHTML = "";
    return true;

}
function checkValidPhone() {
    phone = document.getElementById("phone").value;
    if (!(/^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/).test(phone)) {
        document.getElementById("errorMessage").innerHTML = "Invalid phone number (sample phone: '123-456-7890')";
        return false;
    }
    document.getElementById("errorMessage").innerHTML = "";
    return true;
}

function readCookie() {
    userId = -1
    let data = document.cookie
    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim()
        let tokens = thisOne.split("=")
        if (tokens[0] == "firstName") {
            firstName = tokens[1]
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1]
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

function saveCookie(){
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}