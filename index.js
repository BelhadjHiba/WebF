var firebaseConfig = {
    apiKey: "AIzaSyA-Dwe3c0Em9z8nc6AFfBTg66M7BN7627s",
    authDomain: "db-v1-d8b7a.firebaseapp.com",
    databaseURL: "https://db-v1-d8b7a-default-rtdb.firebaseio.com",
    projectId: "db-v1-d8b7a",
    storageBucket: "db-v1-d8b7a.appspot.com",
    messagingSenderId: "421995923669",
    appId: "1:421995923669:web:cb39781d4555bbc9757a5c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.    
      var user = firebase.auth().currentUser;
      console.log(user);
      if(user != null){
      console.log("signed in");
        
      }
  
    } else {
      // No user is signed in.
  
      // window.location.assign("index.html");
      console.log("no user in");
    }
  });
  
  function login(){
    new Promise((resolve, reject) => {
      var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
  console.log(userEmail + userPass);
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(){console.log('signed in');
    window.location.replace("home.html");
    localStorage.setItem("USEREMAIL", userEmail);
    console.log(localStorage.getItem("USEREMAIL"));
    localStorage.setItem("USERPASS", userPass);
    console.log(localStorage.getItem("USERPASS"));

    

   

  //   db.collection("Supervisor").where("email", "==", userEmail)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //         document.getElementById("userID").innerHTML = "Welcome User : " + doc.id;

  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  //   }).catch((error) => {
  //     console.log("Error getting document:", error);
  // });
    // // listPatients();
    // document.getElementById("user_para").innerHTML = "Welcome User : " + ;})
    // .catch(function(error) {
    //   console.log('error');
    //   // ...
    });
    });
    
  
  }

    
