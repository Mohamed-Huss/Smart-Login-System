var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var userData;

//Start JavaScript code For Login page
if (localStorage.getItem("userData")) {
  userData = JSON.parse(localStorage.getItem("userData"));
} else {
  // console.log("Empty")
  userData = [];
}


// Start URL fetching, Parsing and concatinating
var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 1; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
  console.log(baseURL)
}
// End URL fetching, Parsing and concatinating

console.log(window.location.href)
console.log("https://" + location.host + baseURL + "/home.html")

//Is the user authenticated?
if (sessionStorage.getItem('AuthenticationState') === null && window.location.href == ("https://" + location.host + baseURL + "/home.html")) {
window.open("index.html","_self")}
else if (sessionStorage.getItem('AuthenticationState') ==="Authenticated" && localStorage.getItem("userMessage")) {
  // Home Page Welcome Message Display
  document.getElementById("userMessage").innerHTML =
"welcome " + localStorage.getItem("userMessage");}

//Start Login Case Handling

// Empty Sign In Inputs
function loginInputsEmpty() {
  if (signInEmail.value == "" || signInPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

// Check Sign In Inputs if they match the any object in the UserData Array
function loginInfoCheck() {
  for (var i = 0; i < userData.length; i++) {
    if (
      userData[i].email.toLowerCase() == signInEmail.value.toLowerCase() &&
      userData[i].password == signInPassword.value
    ) {
      printUserName(i);
      return true;
    }
  }
  return false;
}
// End Login Case Handling

//Start Login Function
function login() {
  if (loginInputsEmpty() == false) {
    document.getElementById(
      "incorrectInput"
    ).innerHTML = `<span class="text-danger">All Inputs are required</span>`;
    return false;
  }
  if (formateValidation(2) == true) {  // Extra layer of Validation using Regex for signIn Inputs
    if (loginInfoCheck() == true) {

//The user has successfully authenticated. We need to store this information
//for the next page.
sessionStorage.setItem("AuthenticationState", "Authenticated");               
//This authentication key will expire in 1 hour.
// sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));

      location.replace("http://" + location.host + baseURL + "/home.html");
      console.log("http://" + location.host + baseURL + "/home.html");
      document.getElementById("userMessage").innerHTML =
      "welcome " + localStorage.getItem("userMessage");
    } else {
      document.getElementById(
        "incorrectInput"
      ).innerHTML = `<span class="text-danger">Incorrect Email or Password</span>`;
    }
  }
}
//End Login Function
//End JavaScript code For Login page

//Start JavaScript code For Sign-Up page

//Start Sign-up Case Handling
// Empty sign up Inputs
function signUpInputsEmpty() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}
// Check if the sign Up Email Exist or Not (Returns False if Exist and True if Unique)
function signUpInfoCheck() {
  for (var i = 0; i < userData.length; i++) {
    if (userData[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
      return false;
    }
  }
  return true;
}
//End Sign-up Case Handling

// Start Sign up function
function signUp() {
  if (signUpInputsEmpty() == false) {
    document.getElementById(
      "signUpState"
    ).innerHTML = `<span class="text-danger">All Inputs are required</span>`;
    return false
  } if (signUpInfoCheck() == false) {
    document.getElementById(
      "signUpState"
    ).innerHTML = `<span class="text-danger">User E-mail already exist</span>`;
    return false
  } else {
    if (formateValidation(1) == true) { // Regex Validation for signUp Inputs
      var registrationInfo = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
      };
      userData.push(registrationInfo);
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById(
        "signUpState"
      ).innerHTML = `<span class="text-success">Success</span>`;
    }
  }
}
// End Sign up function

//End JavaScript code For Sign-Up page

// Start Validation function
function formateValidation(loginOrSignUp) { // Regex Validation function for both Sign In
  if (loginOrSignUp == 1) {                 // and Sign Up based on the return value to the
    var x = signUpName.value;               // function (1 for signUp and 2 for Sign In)
    var y = signUpEmail.value;
    var z = signUpPassword.value;
    var s = "signUpState";
  } else if (loginOrSignUp == 2) {
    var x = true;
    var y = signInEmail.value;
    var z = signInPassword.value;
    var s = "incorrectInput";
  }

  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  var nameValidity = nameRegex.test(x);
  console.log(nameRegex.test(x));
  var emailRegex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  var emailValidity = emailRegex.test(y);
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  var passwordValidity = passwordRegex.test(z);
  if (emailValidity && passwordValidity && nameValidity == true) {
    return true;
  } else {
    if (
      emailValidity == false &&
      passwordValidity == true &&
      nameValidity == true
    ) {
      document.getElementById(
        `${s}`
      ).innerHTML = `<span class="text-danger">Invalid Email format</span>`;
    } else if (
      emailValidity == true &&
      passwordValidity == false &&
      nameValidity == true
    ) {
      document.getElementById(
        `${s}`
      ).innerHTML = `<span class="text-danger">Invalid password format</span>`;
    } else if (
      emailValidity == true &&
      passwordValidity == true &&
      nameValidity == false
    ) {
      document.getElementById(
        `${s}`
      ).innerHTML = `<span class="text-danger">Invalid Name format</span>`;
    } else {
      document.getElementById(
        `${s}`
      ).innerHTML = `<span class="text-danger">Invalid format of more than one input </span>`;
    }
  }
}
// End Validation function

//User Message Local Storage setter
function printUserName(index) {
  console.log(index);
  localStorage.setItem("userMessage", userData[index].name);
  console.log("welcome " + localStorage.getItem("userMessage"));
}

// clearing local Storage user Message (Logout)
function logout(){
  localStorage.removeItem("userMessage");
  sessionStorage.removeItem('AuthenticationState')
}
