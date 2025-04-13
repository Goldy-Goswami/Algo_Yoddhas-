const firebaseConfig = {
    apiKey: "AIzaSyAG5-vi0b6ZUj-Th8DAJRGLZXojSmaqrvI",
    authDomain: "hackathon-datab-144f2.firebaseapp.com",
    databaseURL: "https://hackathon-datab-144f2-default-rtdb.firebaseio.com",
    projectId: "hackathon-datab-144f2",
    storageBucket: "hackathon-datab-144f2.firebasestorage.app",
    messagingSenderId: "55088354521",
    appId: "1:55088354521:web:b6cfc13cd4e5d61e4f9ac8",
   };

  //intialize friebase
  firebase.initializeApp(firebaseConfig);

// refernce of your database
var userDB = firebase.database().ref("hackathon-datab-144f2");

document.getElementById("Login-Form-Hackathon").addEventListener("submit", SubmitForm);

function SubmitForm(e){
  e.preventDefault();

 var username =  getElementVal("username")
 var password =  getElementVal("password")
 
 savMessage(username, password);
 }

const savMessage = (username, password) => {
      var newContactForm = userDB.push()

      newContactForm.set({
       Username: username,
       Password: password,
      });

};
const getElementVal =(id) =>{
    return document.getElementById(id).value;
};


const loginBtn = document.querySelector('.button1');

  loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); 

    // Get inputs
    const username = document.querySelector('input[type="text"]');
    const password = document.querySelector('input[type="password"]');

    // Optional: validation
    if (username.value.trim() === "" || password.value.trim() === "") {
      alert("Please enter both username and password.");
      return;
    }

    // Clear inputs
    username.value = "";
    password.value = "";

    // Redirect to dashboard (replace with your actual page)
    window.location.href = "dashboard.html";
  });
