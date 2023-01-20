//get login elements
document.getElementById("createAccount").addEventListener("click", createAccount)
document.getElementById("submitBtn").addEventListener("click", userLogin)
function userLogin(){
   let username = document.getElementById("userName").value
   let password = document.getElementById("loginPassword").value
   alert(username)
}
function createAccount(){
    console.log("Create Account button clicked")
}