const urlBase = 'http://cop4331.site/LAMPAPI'
const extension = 'php'
let userID = 0
let firstName = ""
let lastName = ""
const ids = [];

document.addEventListener('DOMContentLoaded', function () {
    readCookie()
    loadContact()
}, false)

document.getElementById("addNewContact").addEventListener("click", addContact);
document.getElementById("searchBtn").addEventListener("click", searchContacts);
document.getElementById("searchBar").addEventListener("keyup", searchContacts);


function loadContact()
{
    let temp = 
    {
        search: "",
        userID: userID
    }

    let jsonPayload = JSON.stringify(temp);

    let url = urlBase + '/SearchContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error)
                {
                    console.log(jsonObject.error)
                    return;
                }

                let text = "<table border = '1'>"
                for (let i = 0; i < jsonObject.results.length; i++)
                {
                    let first = jsonObject.results[i].firstName;
                    let last = jsonObject.results[i].lastName;
                    let email = jsonObject.results[i].email;
                    let phone = jsonObject.results[i].phone;
                    ids[i] = jsonObject.results[i].ID;

                    text += "<tr id='row" + i + "'>"
                    text += "<td id='first_Name" + i + "'><span>" + first + "</span></td>";
                    text += "<td id='last_Name" + i + "'><span>" + last + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + email + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + phone + "</span></td>";
		    text += "<td id='" + ids[i] + " '<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#updateContactWindow' onclick = 'getContactInfo(this.id)'>Update</button> </span></td>";
                    text += "<tr/>"
                }
                text += "</table>";
                document.getElementById("tbody").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err)
    {
        console.log(err.message);
    }
}
//get Contact information when user clicks on update contact button

function getContactInfo(id){
   let current = document.getElementById(id)

   let phone = current.previousElementSibling.innerText
   document.getElementById("phoneNumberEdit").value = phone

   let email = current.previousElementSibling.previousElementSibling.innerText
   document.getElementById("emailEdit").value = email

   let lastName = current.previousElementSibling.previousElementSibling.previousElementSibling.innerText
   document.getElementById("lastNameEdit").value = lastName

   let firstName = current.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
   document.getElementById("firstNameEdit").value = firstName

   document.getElementById("editContact").onclick = function(){updateContact(id)}
   document.getElementById("deleteContact").onclick = function(){deleteContact(id, firstName, lastName)}
}

function searchContacts(){
    let findContact = document.getElementById("searchBar").value
    let result = document.getElementById("searchResult")

    let temp = 
    {
        search: findContact,
        userID: userID
    }

    let jsonPayload = JSON.stringify(temp);

    let url = urlBase + '/SearchContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error)
                {
                    result.innerHTML = jsonObject.error;
                    return;
                }
                result.innerHTML = ""

                let text = "<table border = '1'>"
                for (let i = 0; i < jsonObject.results.length; i++)
                {
                    let first = jsonObject.results[i].firstName;
                    let last = jsonObject.results[i].lastName;
                    let email = jsonObject.results[i].email;
                    let phone = jsonObject.results[i].phone;
                    ids[i] = jsonObject.results[i].ID;

                    text += "<tr id='row" + i + "'>"
                    text += "<td id='first_Name" + i + "'><span>" + first + "</span></td>";
                    text += "<td id='last_Name" + i + "'><span>" + last + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + email + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + phone + "</span></td>";
		    text += "<td id='" + ids[i] + " '<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#updateContactWindow' onclick = 'getContactInfo(this.id)'>Update</button> </span></td>";
                    text += "<tr/>"
                }
                text += "</table>";
                document.getElementById("tbody").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err)
    {
        console.log(err.message);
    }
}

function showTable() {
    var x = document.getElementById("addContact");
    var contacts = document.getElementById("contactsTable")
    if (x.style.display === "none") 
    {
        x.style.display = "block";
        contacts.style.display = "none";
    } else 
    {
        x.style.display = "none";
        contacts.style.display = "block";
    }
}


function addContact() 
{
    console.log("Add contact button clicked")
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phoneNumber").value;
    let errorMsg = document.getElementById("errorMessage");

    if (firstName == "") 
    {
        errorMsg.innerHTML = "First name is required";
        return;
    }
    if (lastName == "") 
    {
        errorMsg.innerHTML = "Last name is required";
        return;
    }
    if (email == "" && phone == "") 
    {
        errorMsg.innerHTML = "Either Email or Phone is required";
        return;
    }

    if (!(checkValidEmail(email) && checkValidPhone(phone))) 
    {
        console.log("INVALID EMAIL OR PHONE SUBMISSION");
        return;
    }

    let tmp = { "firstName": firstName, "lastName": lastName, "email": email, "phone": phone, "userID": userID };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/AddContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try 
    {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
            {
                console.log("Contact has been added!");

                loadContact();
                //showTable();
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error == "") 
                {
                    //document.getElementById("addContactResult").innerHTML = `Successfully added ${document.getElementById("firstName")} ${document.getElementById("lastName")} to contacts`;
                    $('#addContactWindow').modal('hide')
	            document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phoneNumber").value = "";
                    document.getElementById("errorMessage").innerHTML = "";
                }
                else 
                {
                    document.getElementById("addContactResult").innerHTML = jsonObject.error
                    $('#addContactWindow').modal('hide')
                    return
                }


                saveCookie();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) 
    {
        console.log(err.message);
    }
}

function checkValidEmail(email) {
    // email = document.getElementById("email").value;
    var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(email) == false) {
        document.getElementById("errorMessage").innerHTML = "Invalid email format (sample email: 'xyz@domain.com')"
        return false;
    }
    document.getElementById("errorMessage").innerHTML = "";
    return true;

}
function checkValidPhone(phone) {
    // phone = document.getElementById("phone").value;
    var regex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

    if (regex.test(phone) == false) {
        document.getElementById("errorMessage").innerHTML = "Invalid phone number (sample phone: '123-456-7890')";
        return false;
    }
    document.getElementById("errorMessage").innerHTML = "";
    return true;
}

function deleteContact(contactID, contactFirstName, contactLastName){
    //TODO implement delete contact
    //api expects the following
    //{
    //"ID": -1
    //}
    //and returns an empty string on success
    //ID is the ID of the contact and not the users ID
    console.log(contactID, contactFirstName, contactLastName)

    let check = confirm('Confirm deletion of contact: ' + contactFirstName+ ' ' + contactLastName);
    if (check === true) {
        let tmp = {
            ID: contactID
        };

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/DeleteContact.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log("Contact has been deleted");
                    $('#updateContactWindow').modal('hide')
                    loadContact();
                }
            };
            xhr.send(jsonPayload);
        } catch (err) {
            console.log(err.message);
        }
    };
}



function updateContact(contactID){
    //TODO implement update contact info
    //api expects the following
    //{
    //"firstName": "fred",
    //"lastName": "secret",
    //"email": "name@domain.net",
    //"phone": "800-000-0012",
    //"ID": -1
    //}
    //and returns an empty string on success

    //let current = document.getElementById(contactID)

    let contactPhone = document.getElementById("phoneNumberEdit").value
    let contactEmail = document.getElementById("emailEdit").value
    let contactLastName = document.getElementById("lastNameEdit").value
    let contactFirstName = document.getElementById("firstNameEdit").value

    if (contactFirstName == "") 
    {
        document.getElementById("errorMessageEdit").innerHTML = "First name is required";
        return;
    }
    if (contactLastName == "") 
    {
        document.getElementById("errorMessageEdit").innerHTML = "Last name is required";
        return;
    }
    if (contactEmail == "" && contactPhone == "") 
    {
        document.getElementById("errorMessageEdit").innerHTML = "Either Email or Phone is required";
        return;
    }

    if (!(checkValidEmail(contactEmail) && checkValidPhone(contactPhone))) 
    {
        document.getElementById("errorMessageEdit").innerHTML ="Invalid phone or email submission"
        return;
    }
    
    let tmp = {
        "firstName": contactFirstName,
        "lastName": contactLastName,
        "email": contactEmail,
        "phone": contactPhone,
        "ID": contactID
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been updated");
                $('#updateContactWindow').modal('hide')
                loadContact();
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function readCookie() {
    userID = -1
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
            userID = parseInt(tokens[1].trim());
        }
    }

    if (userID < 0) {
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
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userID + ";expires=" + date.toGMTString();
}
function logout(){
    userID = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
