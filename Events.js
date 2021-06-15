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

window.addEventListener('load', () => {var user ;
    var userID;
    var userEmail = localStorage.getItem("USEREMAIL");
    var userPass = localStorage.getItem("USERPASS");
    console.log(userEmail + userPass);
    pId = localStorage.getItem("PID");

    console.log(localStorage.getItem("PID"));

    // var query = db.collection("Patient").document(localStorage.getItem("PID")).collection("Events");
    // query.onSnapshot((querySnapshot) => {
    //     var Events = [];
    //     var i = 0;
    //     querySnapshot.forEach((doc) => {
    //         Events.push(doc.data().title);
    //         console.log(doc.data().title);
    //         console.log(doc.id);
    //     });
    // });

    db.collection("Patient").doc(pId).collection("Events")
    .onSnapshot((querySnapshot) => {
        var Events = [];
        var i = 0;
        querySnapshot.forEach((doc) => {
            Events.push(doc.data().title);
            console.log(doc.data().title);
            console.log(doc.id);
            // var d1 = document.createElement('div');
            // d1.classList = "row row-cols-1 row-cols-md-4 g-4";
            // d1.id = "d1" + i;
            // document.getElementById("patientHandler").appendChild(d1);

            var d2 = document.createElement('div');
            d2.className = "col";
            d2.id = "d2" + i;
            document.getElementById("patientHandler").appendChild(d2);

            var d3 = document.createElement('div');
            d3.classList = "card h-100";
            d3.id = "d3" + i;
            document.getElementById(d2.id).appendChild(d3);
           
            var d4 = document.createElement('div');
            d4.classList = "card-body text-center";
            d4.id = "d4i" + i;
            document.getElementById(d3.id).appendChild(d4);
           
            var g = document.createElement('h5');
            g.id = i;
            g.className = "card-title";
            document.getElementById(d4.id).appendChild(g);
            document.getElementById(g.id).innerHTML =  doc.data().title;

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var deleteE = document.createElement("a");
            deleteE.id = "deleteE";
            deleteE.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(deleteE);
            deleteE.textContent= "Delete Event";
            deleteE.href = "#";
            deleteE.onclick = ()=> {
                var result = confirm("Want to delete?");
                if (result) {
                    //Logic to delete the item
                    db.collection("Patient").doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                        window.location.reload();
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            };
            i++;
        });
        console.log("Patient List ", Events.join(", "));
    });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  
    var strUser;


  function addEvent() {
      // Get the modal
      var modal = document.getElementById("myAddEventModal");

      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      var addBtn = document.getElementById("submitE");


      modal.style.display = "block";
      var endTime = document.getElementById("endDate");
      endTime.style.display = "none";

      var endT = null ;
      var endBox = document.getElementById("endBox").addEventListener("change", (e)=>{
        if( e.target.checked) {
            endTime.style.display = "flex";
            endT = document.getElementById("endD").addEventListener("change", (e) => {
                endT = firebase.firestore.Timestamp.fromDate(new Date(e.target.value));
                console.log(endT);
            })
        }
        else {endTime.style.display = "none";
        endTime.style.display = "none";
            endT = null; 
            console.log(endT);
        }
    });

      var Reminders = [];
      console.log(localStorage.getItem("SUPID"));

      db.collection("Events").where("supervisorId", "==", localStorage.getItem("SUPID")).get()
      .then((querySnapshot) => {
          var reminderList = document.getElementById("reminderList");
          querySnapshot.forEach((doc) => {
              Reminders.push(doc.id);
              var option = document.createElement("option");
              option.value = doc.id;
              option.innerHTML = doc.data().title;
              reminderList.appendChild(option);
              console.log(doc);
          });
          console.log("list of Reminders", Reminders.join(", "));
      }).catch((error) => {
          console.log(("Error getting Documents:" + error));
      });
      var rTitle;
      var rIstr = [];
      var supervisorId;

      document.getElementById("reminderList").addEventListener("change", (e) => {
        strUser = e.target.value;
        console.log("struser" + strUser);

        db.collection("Events").doc(strUser).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                rTitle = doc.data().title;
                rIstr = doc.data().instructions;
                supervisorId = doc.data().supervisorId;
                console.log("title: " + rTitle + " inst" + rIstr.join(", ") + "sup Id: " + supervisorId);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      })

      var startDate;
    document.getElementById("startD").addEventListener("change", (e) => {
        startDate = firebase.firestore.Timestamp.fromDate(new Date(e.target.value));
        console.log(startDate);
    })

    var fr ;

    var rwd = document.getElementById("rWeekdays");
    rwd.style.display = "none";
    var interv = document.getElementById("itv");
    interv.style.display = "none";

    var interval = null;
    var weekDays = [];
    document.getElementById("fr").addEventListener("change", (e) => {
        fr = e.target.value;
        console.log(fr);

        switch (fr) {
            case "EveryWeek":{
                rwd.style.display = "flex";
                interv.style.display = "none";
                for (let i = 0; i < 6; i++) {
                    weekDays[i] = false;
                }
            }
                break;
            case "ConstantDays": {
                weekDays.delete;
                weekDays = null;
                rwd.style.display = "none";
                interv.style.display = "flex";
            }
                break;
            case "EveryDay":{
                weekDays.delete;
                weekDays = null;
                rwd.style.display = "none";
                interv.style.display = "none";
            }
                break;
        
            default:{
                weekDays.delete;
                weekDays = null;
                rwd.style.display = "none";
                interv.style.display = "none";
            }
                break;
        }
    })


    document.getElementById("sunday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[0] = true;
        }
        else {weekDays[0] = false;
        }
    });

    document.getElementById("monday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[1] = true;
        }
        else {weekDays[1] = false;
        }
    });

    document.getElementById("tuesday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[2] = true;
        }
        else {weekDays[2] = false;
        }
    });

    document.getElementById("wednesday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[3] = true;
        }
        else {weekDays[3] = false;
        }
    });

    document.getElementById("thursday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[4] = true;
        }
        else {weekDays[4] = false;
        }
    });

    document.getElementById("friday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[5] = true;
        }
        else {weekDays[5] = false;
        }
    });

    document.getElementById("saturday").addEventListener("change", (e)=>{
        if( e.target.checked) {
            weekDays[6] = true;
        }
        else {weekDays[6] = false;
        }
    });

      // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        window.location.reload();
    }
                    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        window.location.reload();
        }
    }
   
    addBtn.addEventListener("click", () => {
        
    //   console.log(istrs);
    //   console.log(strUser);
    //   var rTitle;
    //     if (strUser == "medicine") {
    //         rTitle =  strUser1;
    //     } else {
    //         rTitle =  strUser;
    //     }
    console.log("clicked");
    interval = document.getElementById("interval").value;
    console.log(interval);
    // console.log(weekDays.join(", "));
      db.collection("Patient").doc(pId).collection("Events").add({
          title: rTitle,
          instructions: rIstr,
          supervisorId: supervisorId,
          endTime: endT, 
          interval: interval,
          startTime: startDate,
          weekDays: weekDays,
          repeat: fr,
      })
      .then(() => {
          console.log("Document successfully written!");
          window.location.reload();
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    });
    }
       