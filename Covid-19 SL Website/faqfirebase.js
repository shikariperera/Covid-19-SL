const firebaseConfig = {
    apiKey: "AIzaSyCy2xUy5T432pd3QrsDX4zr2enE9NG2lu0",
    authDomain: "faqform.firebaseapp.com",
    databaseURL: "https://faqform-default-rtdb.firebaseio.com",
    projectId: "faqform",
    storageBucket: "faqform.appspot.com",
    messagingSenderId: "401704131484",
    appId: "1:401704131484:web:66a53f9a001690dee08659"
  };

// initialize firebase
  firebase.initializeApp(firebaseConfig);

  // reference your database
var faqFormDB = firebase.database().ref("faqForm");



document.getElementById("faqForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var inquire = getElementVal("inquire");

saveMessages(name, email, inquire);

//   enable alert message
  document.querySelector(".alertmsg").style.display = "block";

  //   remove alert message
  setTimeout(() => {
    document.querySelector(".alertmsg").style.display = "none";
  }, 3000);

  //   reset form
  document.getElementById("faqForm").reset();

}



const saveMessages = (name, email, inquire) => {

var newfaqForm = faqFormDB.push();

newfaqForm.set({

    name: name,
    email: email,
    inquire: inquire,

});

};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};



 