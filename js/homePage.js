const urlBase = 'http://cop4331.site/LAMPAPI'
const extension = 'php'
let userID = 0
let firstName = ""
let lastName = ""

document.getElementById("createAccountBtn").addEventListener("click", createAccount)
document.getElementById("loginBtn").addEventListener("click", userLogin)

document.getElementById("newPassword").addEventListener("blur", checkLength)
document.getElementById("rePassword").addEventListener("blur", checkMatchingPasswords)

//validate forms for user creation page
var forms = document.querySelectorAll('.needs-validation')
Array.prototype.slice.call(forms)
.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    if (!(form.checkValidity() && checkLength() && checkMatchingPasswords())) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
})

function submit(e){
  e.preventDefault()
}
function userLogin(){
   let login = document.getElementById("userName").value
   let password = document.getElementById("loginPassword").value
   
   let tmp = {login:login,password:password}
   let jsonPayload = JSON.stringify(tmp)
   let url = urlBase + '/Login.' + extension

   let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText )
				userId = jsonObject.id
        console.log("success")
		
				if(userId < 1)
				{		
					alert("User/Password combination incorrect")
					return;
				}
				firstName = jsonObject.firstName
				lastName = jsonObject.lastName
        let id = jsonObject.id
        document.getElementById("loginResult").innerHTML = "Welcome " + firstName + " " + id

				//saveCookie()
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert(err.message)
	}
}
function createAccount(){
    console.log("Create Account button clicked")
    firstName = document.getElementById("firstName").value
    lastName = document.getElementById("lastName").value
    login = document.getElementById("newUserName").value
    password = document.getElementById("newPassword").value

    let tmp = {firstName:firstName, lastName:lastName, login:login, password:password}
    let jsonPayload = JSON.stringify(tmp)
    let url =  urlBase + '/CreateAccount.' + extension;
    
    let xhr = new XMLHttpRequest()
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.login;
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
                alert(firstName)
				//saveCookie();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		 alert(err.message)
	}
}
function checkMatchingPasswords(){
    password = document.getElementById("newPassword").value
    rePassword = document.getElementById("rePassword").value
    let btn = document.getElementById("createAccountBtn")

    if(password !== rePassword){
        btn,disabeled = true
        document.getElementById("errorMessge").innerHTML = "Passwords do not match"
        return false
    }
    document.getElementById("errorMessge").innerHTML = ""
    return true
}
function checkLength(){
    password = document.getElementById("newPassword").value
   
    if(password.length < 5){
        document.getElementById("errorMessge").innerHTML = "Password length must be at least 5 characters long"
        return
    }
    document.getElementById("errorMessge").innerHTML = ""
    return true
}