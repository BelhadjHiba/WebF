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
  var sId;


// window.addEventListener('load', () => {
//     var userID = localStorage.getItem('UDERID');
//     console.log(userID);
// })

function logout(){
    firebase.auth().signOut();
    window.location.replace("index.html");
  }

window.addEventListener('load', () => {var user ;
    var userID;
    var userEmail = localStorage.getItem("USEREMAIL");
    var userPass = localStorage.getItem("USERPASS");
    console.log(userEmail + userPass);

    var query = db.collection("Supervisor").where("email", "==", userEmail);
    query.get()
    .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            user = doc;
            userID= doc.id;
            // sessionStorage.setItem("USER", user);
            // console.log(sessionStorage.getItem("USER"));
            localStorage.setItem("USERID", userID);
            console.log(localStorage.getItem("USERID"));
            sId = doc.id;
        });
        localStorage.setItem("USER", user);
            console.log(localStorage.getItem("USER"));
        localStorage.setItem("SUPID", sId);
        console.log("sup id local storage: " + localStorage.getItem("SUPID"));

        // var docRef = db.collection("Patient").where("supervisor", "==", userID);

        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         console.log("Document data:", doc.data());
        //         localStorage.setItem("LOC", doc.data().location);
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch((error) => {
        //     console.log("Error getting document:", error);
        // });
            
    var queryP = db.collection("Patient").where("supervisor", "==", userID);
    queryP.onSnapshot((querySnapshot) => {
        var patients = [];
        var i = 0;

        querySnapshot.forEach((doc) => {
            patients.push(doc.data().name);
            console.log(doc.data().name);
            console.log(doc.id);
            // var d1 = document.createElement('div');
            // d1.classList = "row row-cols-1 row-cols-md-4 g-4";
            // d1.id = "d1" + i;
            // document.getElementById("patientHandler").appendChild(d1);


                //     console.log("Current data: ", doc.data().location);
                //     if (localStorage.getItem("LOC") != doc.data().location){
                //     alert(doc.data().name + "'s position has changed !! Click the locate button to follow Position");
                //     localStorage.setItem("LOC", doc.data().location);

                // }
              


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
            document.getElementById(g.id).innerHTML =  doc.data().name;

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var qrCode = document.createElement("a");
            qrCode.id = "qrCode";
            qrCode.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(qrCode);
            qrCode.textContent= "Get qrCode";
            qrCode.href = "#";
            qrCode.onclick = () => {
                // Get the modal
                 var modal = document.getElementById("myModal");

                // Get the button that opens the modal
                var btn = document.getElementById("myBtn");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                modal.style.display = "block";
                var code = document.createElement("p");
                code.id = "codeText"
                // document.getElementById(code.id).innerHTML = doc.id;
                code.textContent = doc.id;
                console.log(doc.id); 
                console.log(code);
                document.getElementById("modal").appendChild(code);

                var imC = document.createElement("img");
                imC.src = " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + doc.id;
                imC.id = "qr";
                imC.width = 200;
                imC.height = 200;
                document.getElementById("modal").appendChild(imC);
                document.getElementById(imC.id).innerHTML = doc.id; 

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
            }

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var events = document.createElement("a");
            events.id = "events";
            events.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(events);
            events.textContent= " Events";
            events.href = "Events.html";
            events.onclick = () => {
                localStorage.setItem("PID", doc.id);
            };

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var events = document.createElement("a");
            events.id = "History";
            events.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(events);
            events.textContent= " History";
            events.href = "#";
            events.onclick = () => {
                // Get the modal
                var modal = document.getElementById("myHistoryModal");

                // Get the button that opens the modal
                var btn = document.getElementById("myBtn");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                modal.style.display = "block";
                var table = document.getElementById("history");
                var statements = [];
                i = 0;
                db.collection("Patient").doc(doc.id).collection("Statement")
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        statements.push(doc.data());
                        console.log(doc.data());
                        var row = document.createElement("tr");
                        row.id = "row" + i;
                        table.appendChild(row);

                        var col1 = document.createElement("td");
                        col1.id = "col1" + i;
                        col1.innerHTML = doc.data().object;
                        document.getElementById(row.id).appendChild(col1);

                        var col2 = document.createElement("td");
                        col2.id = "col2" + i;
                        document.getElementById(row.id).appendChild(col2);
                        col2.innerHTML = doc.data().verb;

                        var col3 = document.createElement("td");
                        col3.id = "col3" + i;
                        document.getElementById(row.id).appendChild(col3);
                        col3.innerHTML = doc.data().time.toDate();

                        // var lineBreak = document.createElement("br");
                        // lineBreak.id = "br";
                        // table.appendChild(lineBreak);

                        i++;
                    });
                    console.log("statemennts: ", statements.join(", "));
                });
                // var code = document.createElement("p");
                // code.id = "codeText"
                // // document.getElementById(code.id).innerHTML = doc.id;
                // code.textContent = doc.id;
                // console.log(doc.id); 
                // console.log(code);
                // document.getElementById("modal").appendChild(code);

                // var imC = document.createElement("img");
                // imC.src = " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + doc.id;
                // imC.id = "qr";
                // imC.width = 200;
                // imC.height = 200;
                // document.getElementById("modal").appendChild(imC);
                // document.getElementById(imC.id).innerHTML = doc.id; 

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
            };

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var locate = document.createElement("a");
            locate.id = "locate";
            locate.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(locate);
            locate.textContent= " Locate";
            console.log(doc.data().location.latitude);
            console.log(doc.data().location.longitude);
            locate.onclick = ()=>{
                db.collection("Patient").doc(doc.id)
                .onSnapshot((doc) => {
                    console.log("Current data: ", doc.data().location);
                    window.location.assign("https://www.google.co.in/maps/dir//" + doc.data().location.latitude + "," + doc.data().location.longitude)
                });
            };


            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var updateP = document.createElement("a");
            updateP.id = "updateP";
            updateP.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(updateP);
            updateP.textContent= "Update Patient";
            updateP.onclick =()=>{
                            // Get the modal
                var modal = document.getElementById("myAddPatientModal");

                // Get the button that opens the modal
                var btn = document.getElementById("myBtn");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // addBtn.title.innerHTML = "Update Patient";

                modal.style.display = "block";

                
                var stage = document.getElementById("stage-select");
                stage.style.display = "block";

                var impairement = document.getElementById("stageImpairement");
                impairement.style.display = "none";

                var deficit = document.getElementById("stageDeficit");
                deficit.style.display = "none";

                var aphasia = document.getElementById("stageAphasia");
                aphasia.style.display = "none";

                var agnosia = document.getElementById("stageAgnosia");
                agnosia.style.display = "none";

                var selectedStage;
                stage.addEventListener("change", (e) => {
                    var strUser = e.target.value;
                    console.log(strUser);
                    switch (strUser) {
                        case "memoryImpairements": {
                            deficit.style.display = "none";
                            impairement.style.display = "block";
                            aphasia.style.display = "none";
                            agnosia.style.display = "none";
                            impairement.addEventListener("change", (e) => {
                                var strStage = e.target.value;
                                console.log(strStage);
                                if (strStage == "semantic") {
                                    selectedStage = 1;
                                } else if(strStage == "episodic"){
                                    selectedStage = 2;
                                }
                                console.log(selectedStage);
                            });
                            console.log(selectedStage);
                        }
                            break;

                        case "deficitsInExecutiveFunctions": {
                            deficit.style.display = "block";
                            impairement.style.display = "none";
                            aphasia.style.display = "none";
                            agnosia.style.display = "none";
                            deficit.addEventListener("change", (e) => {
                                var strStage = e.target.value;
                                console.log(strStage);
                                if (strStage == "control") {
                                    selectedStage = 3;
                                } else if(strStage == "planning"){
                                    selectedStage = 4;
                                }
                                console.log(selectedStage);
                            });
                            console.log(selectedStage);
                        }
                            break;

                            case "aphasia": {
                                deficit.style.display = "none";
                                impairement.style.display = "none";
                                aphasia.style.display = "block";
                                agnosia.style.display = "none";
                                deficit.addEventListener("change", (e) => {
                                    var strStage = e.target.value;
                                    console.log(strStage);
                                    if (strStage == "spoken") {
                                        selectedStage = 5;
                                    } else if(strStage == "writing"){
                                        selectedStage = 6;
                                    }
                                    console.log(selectedStage);
                                });
                                console.log(selectedStage);
                            }
                                break;

                                case "agnosia": {
                                    deficit.style.display = "none";
                                    impairement.style.display = "none";
                                    aphasia.style.display = "none";
                                    agnosia.style.display = "block";
                                    deficit.addEventListener("change", (e) => {
                                        var strStage = e.target.value;
                                        console.log(strStage);
                                        if (strStage == "visual") {
                                            selectedStage = 7;
                                        } else if(strStage == "auditory"){
                                            selectedStage = 8;
                                        }
                                        console.log(selectedStage);
                                    });
                                    console.log(selectedStage);
                                }
                                    break;
                                
                        default:
                            deficit.style.display = "none";
                                impairement.style.display = "none";
                                aphasia.style.display = "none";
                                agnosia.style.display = "none";
                            break;
                    }
                });

                var sliderS = document.getElementById("myRangeS");
                    var outputS = document.getElementById("demoS");
                    outputS.innerHTML = sliderS.value;

                    sliderS.oninput = function() {
                    outputS.innerHTML = this.value;
                    }

                    var sliderH = document.getElementById("myRangeH");
                    var outputH = document.getElementById("demoH");
                    outputH.innerHTML = sliderH.value;

                    sliderH.oninput = function() {
                    outputH.innerHTML = this.value;
                    }
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

                document.getElementById("titleMod").innerHTML = "Update Patient";
                var pName = document.getElementById("name");
                pName.value = doc.data().name;
                var addBtn = document.getElementById("submitP");
                addBtn.value = "Update Patient"

                addBtn.addEventListener("click", () => {
                    console.log("clicked");
                    var hR = 0;
                    var sR = 0;
                    hR =  parseInt(sliderH.value);
                    console.log(hR);
                    sR =  parseInt(sliderS.value);
                    console.log(sR);
                    console.log(doc.id);
                    

                    db.collection("Patient").doc(doc.id).update({
                        name: pName.value,
                        stade: selectedStage,
                        hearingRate: hR,
                        sightRate: sR,
                        supervisor: localStorage.getItem("USERID"),
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                        console.log(doc.id);
                        window.location.reload();
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                   
                   
                });
            };

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var deleteP = document.createElement("a");
            deleteP.id = "deleteP";
            deleteP.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(deleteP);
            deleteP.textContent= "Delete Patient";
            deleteP.href = "#";
            deleteP.onclick = ()=> {
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
        console.log("Patient List ", patients.join(", "));
    });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  })
    


  function addPatient() {
      // Get the modal
      var modal = document.getElementById("myAddPatientModal");

      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];



      modal.style.display = "block";

      
      var stage = document.getElementById("stage-select");
      stage.style.display = "block";

      var impairement = document.getElementById("stageImpairement");
      impairement.style.display = "none";

      var deficit = document.getElementById("stageDeficit");
      deficit.style.display = "none";

      var aphasia = document.getElementById("stageAphasia");
      aphasia.style.display = "none";

      var agnosia = document.getElementById("stageAgnosia");
      agnosia.style.display = "none";

      var selectedStage;
     stage.addEventListener("change", (e) => {
        var strUser = e.target.value;
        console.log(strUser);
        switch (strUser) {
            case "memoryImpairements": {
                deficit.style.display = "none";
                impairement.style.display = "block";
                aphasia.style.display = "none";
                agnosia.style.display = "none";
                impairement.addEventListener("change", (e) => {
                    var strStage = e.target.value;
                    console.log(strStage);
                    if (strStage == "semantic") {
                        selectedStage = 1;
                    } else if(strStage == "episodic"){
                        selectedStage = 2;
                    }
                    console.log(selectedStage);
                });
                console.log(selectedStage);
            }
                break;

            case "deficitsInExecutiveFunctions": {
                deficit.style.display = "block";
                impairement.style.display = "none";
                aphasia.style.display = "none";
                agnosia.style.display = "none";
                deficit.addEventListener("change", (e) => {
                    var strStage = e.target.value;
                    console.log(strStage);
                    if (strStage == "control") {
                        selectedStage = 3;
                    } else if(strStage == "planning"){
                        selectedStage = 4;
                    }
                    console.log(selectedStage);
                });
                console.log(selectedStage);
            }
                break;

                case "aphasia": {
                    deficit.style.display = "none";
                    impairement.style.display = "none";
                    aphasia.style.display = "block";
                    agnosia.style.display = "none";
                    deficit.addEventListener("change", (e) => {
                        var strStage = e.target.value;
                        console.log(strStage);
                        if (strStage == "spoken") {
                            selectedStage = 5;
                        } else if(strStage == "writing"){
                            selectedStage = 6;
                        }
                        console.log(selectedStage);
                    });
                    console.log(selectedStage);
                }
                    break;

                    case "agnosia": {
                        deficit.style.display = "none";
                        impairement.style.display = "none";
                        aphasia.style.display = "none";
                        agnosia.style.display = "block";
                        deficit.addEventListener("change", (e) => {
                            var strStage = e.target.value;
                            console.log(strStage);
                            if (strStage == "visual") {
                                selectedStage = 7;
                            } else if(strStage == "auditory"){
                                selectedStage = 8;
                            }
                            console.log(selectedStage);
                        });
                        console.log(selectedStage);
                    }
                        break;
                    
            default:
                deficit.style.display = "none";
                    impairement.style.display = "none";
                    aphasia.style.display = "none";
                    agnosia.style.display = "none";
                break;
        }
      });

      var sliderS = document.getElementById("myRangeS");
        var outputS = document.getElementById("demoS");
        outputS.innerHTML = sliderS.value;

        sliderS.oninput = function() {
        outputS.innerHTML = this.value;
        }

        var sliderH = document.getElementById("myRangeH");
        var outputH = document.getElementById("demoH");
        outputH.innerHTML = sliderH.value;

        sliderH.oninput = function() {
        outputH.innerHTML = this.value;
        }
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

      var pName = document.getElementById("name");
      var addBtn = document.getElementById("submitP");

      addBtn.addEventListener("click", () => {
        var hR = 0;
        var sR = 0;
        hR =  parseInt(sliderH.value);
        console.log(hR);
        sR =  parseInt(sliderS.value);
        console.log(sR);
        db.collection("Patient").add({
            name: pName.value,
            stade: selectedStage,
            hearingRate: hR,
            sightRate: sR,
            supervisor: localStorage.getItem("USERID"),
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

