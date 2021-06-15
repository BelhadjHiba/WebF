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
  var istrs = [];
  var strUser;
  var strUser1;
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
            sessionStorage.setItem("USERID", userID);
            console.log(sessionStorage.getItem("USERID"));
        });
        sessionStorage.setItem("USER", user);
            console.log(sessionStorage.getItem("USER"));

            console.log(userID);
    var queryP = db.collection("Events").where("supervisorId", "==", userID);
    queryP.onSnapshot((querySnapshot) => {
        var events = [];
        var i = 0;
        querySnapshot.forEach((doc) => {
            // events.push(doc.data().title);
            console.log(doc.data().title);

            // var d1 = document.createElement('div');
            // d1.classList = "row row-cols-1 row-cols-md-4 g-4";
            // d1.id = "d1" + i;
            // document.getElementById("eventHandler").appendChild(d1);

            var d2 = document.createElement('div');
            d2.className = "col";
            d2.id = "d2" + i;
            document.getElementById("eventHandler").appendChild(d2);

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

            var updateR = document.createElement("a");
            updateR.id = "updateP";
            updateR.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(updateR);
            updateR.textContent= "Update Reminder";
            updateR.href = "#";
            updateR.onclick = ()=> {
                // Get the modal
                var modal = document.getElementById("myAddReminderModal");

                // Get the button that opens the modal
                var btn = document.getElementById("myBtn");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];



                modal.style.display = "block";

                
                var reminder = document.getElementById("rType");
                reminder.style.display = "block";

                var med = document.getElementById("medicineType");
                med.style.display = "none";

                var fridge = document.getElementById("fridge");
                fridge.style.display = "none";
                var box = document.getElementById("box");
                box.style.display = "none";
                var heat = document.getElementById("heat");
                heat.style.display = "none";

                var drawer = document.getElementById("drawer");
                drawer.style.display = "none";
                var PillBox = document.getElementById("pillBox");
                PillBox.style.display = "none";
                var slot = document.getElementById("slot");
                slot.style.display = "none";
                var medPill = document.getElementById("medPill");
                medPill.style.display = "none";
                var medSyrop = document.getElementById("medSyrop");
                medSyrop.style.display = "none";
                var dropper = document.getElementById("dropper");
                dropper.style.display = "none";
                var drink = document.getElementById("drink");
                drink.style.display = "none";
                var medecineP = [];
                db.collection("House/Kitchen/Drawer/MedDrawer/PillBox").get()
                .then((querySnapshot) => {
                    var medType = document.getElementById("medicineType");
                    querySnapshot.forEach((doc) => {
                        medecineP.push(doc.id);
                        var option = document.createElement("option");
                        option.value = doc.id;
                        option.innerHTML = doc.id;
                        medType.appendChild(option);
                        // document.getElementById("pill").innerHTML = "PillBox";


                    });
                    console.log("boxMedecines", medecineP.join(", "));
                }).catch((error) => {
                    console.log(("Error getting Documents:" + error));
                });
                var medecineD = [];
                db.collection("/House/Kitchen/Dropper").get()
                .then((querySnapshot) => {
                    var medType = document.getElementById("medicineType");
                    querySnapshot.forEach((doc) => {
                        medecineD.push(doc.id);
                        var option = document.createElement("option");
                        option.value = doc.id;
                        option.innerHTML = doc.id;
                        medType.appendChild(option);
                    });
                    console.log("boxMedecines", medecineD.join(", "));
                }).catch((error) => {
                    console.log(("Error getting Documents:" + error));
                });
                var medecineDr = [];

                db.collection("House/Kitchen/Drawer/MedDrawer/SyropBox").get()
                .then((querySnapshot) => {
                    var medType = document.getElementById("medicineType");
                    querySnapshot.forEach((doc) => {
                        medecineDr.push(doc.id);
                        var option = document.createElement("option");
                        option.value = doc.id;
                        option.innerHTML = doc.id;
                        medType.appendChild(option);
                    });
                    console.log("boxMedecines", medecineDr.join(", "));
                }).catch((error) => {
                    console.log(("Error getting Documents:" + error));
                });

                var selectedReminder;
            reminder.addEventListener("change", (e) => {
                strUser = e.target.value;
                console.log(strUser);
                
                switch (strUser) {
                    case "dinner": {
                        istrs.delete;
                        med.style.display = "none";
                        fridge.style.display = "block";
                        document.getElementById("boxName").innerHTML = "Dinner";
                        box.style.display = "block";
                        document.getElementById("foodType").innerHTML = "Dinner";
                        heat.style.display = "block";

                        for (let i = 0; i < 3; i++) {
                            istrs.push(false);
                        }
                        var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                            if( e.target.checked)
                            istrs[0](true);
                        });
                        var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                            if( e.target.checked)
                            istrs[1](true);
                        });
                        var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                            if( e.target.checked)
                            istrs[2] = (true);
                        });

                        console.log(selectedReminder);
                    }
                        break;

                        case "snack": {
                            istrs.delete;
                            med.style.display = "none";
                            fridge.style.display = "block";
                            document.getElementById("boxName").innerHTML = "Snack";
                            box.style.display = "block";
                            document.getElementById("foodType").innerHTML = "Snack";
                            heat.style.display = "block";
                            for (let i = 0; i < 3; i++) {
                                istrs.push(false);
                            }
                            var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[0] = (true);
                            });
                            var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[1]= (true);
                            });
                            var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[2] = (true);
                            });
                        }
                            break;
            

                        case "lunch": {
                            istrs.delete;
                            med.style.display = "none";
                            fridge.style.display = "block";
                            document.getElementById("boxName").innerHTML = "Lunch";
                            box.style.display = "block";
                            document.getElementById("foodType").innerHTML = "Lunch";
                            heat.style.display = "block";
                            for (let i = 0; i < 3; i++) {
                                istrs.push(false);
                            }

                            var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[0] = (true);
                            });
                            var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[1] = (true);
                            });
                            var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[2] = (true);
                            });
                            console.log(selectedReminder);
                        }
                            break;

                            case "breakfast": {
                                istrs.delete;
                                med.style.display = "none";

                                fridge.style.display = "block";
                                document.getElementById("boxName").innerHTML = "Breakfast";
                                box.style.display = "block";
                                document.getElementById("foodType").innerHTML = "Breakfast";
                                heat.style.display = "block";
                                for (let i = 0; i < 3; i++) {
                                    istrs.push(false); 
                                }
                                var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[0] = (true);
                                
                                });
                                var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[1] = (true);
                                });
                                var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[2] = (true);
                                });
                                console.log(selectedReminder);
                            }
                                break;

                                case "medicine": {
                                    med.style.display = "block";
                                    med.addEventListener("change", (e) => {
                                        strUser1 = e.target.value;
                                        console.log(strUser1);
                                        if (medecineP.includes(strUser1)) {
                                            istrs.delete;
                                            document.getElementById("pill").innerHTML = "PillBox";

                                            drawer.style.display = "block";
                                            PillBox.style.display = "block";
                                            slot.style.display = "block";
                                            medPill.style.display = "block";
                                            medSyrop.style.display = "none";
                                            dropper.style.display = "none";
                                            drink.style.display = "none";
                                            for (let i = 0; i < 4; i++) {
                                                istrs.push(false);
                                            }

                                            var drawerI = document.getElementById("drawerI").addEventListener("change", (e)=>{
                                                if( e.target.checked)
                                                istrs[0] = (true);
                                            });
                                            var pillBoxI = document.getElementById("pillBoxI").addEventListener("change", (e)=>{
                                                if( e.target.checked)
                                                istrs[1] = (true);
                                            });
                                            var slotI = document.getElementById("slotI").addEventListener("change", (e)=>{
                                                if( e.target.checked)
                                                istrs[2] = (true);
                                            });
                                            var medPillI = document.getElementById("medPillI").addEventListener("change", (e)=>{
                                                if( e.target.checked)
                                                istrs[3] = (true);
                                            });
                                        } else if(medecineDr.includes(strUser1)) {
                                            istrs.delete;
                                            document.getElementById("pill").innerHTML = "SyropBox";

                                            drawer.style.display = "block";
                                            PillBox.style.display = "block";
                                            slot.style.display = "block";
                                            medPill.style.display = "none";
                                            medSyrop.style.display = "block";
                                            dropper.style.display = "none";
                                            drink.style.display = "none";
                                            for (let i = 0; i < 4; i++) {
                                                istrs.push(false);
                                            }

                                            var drawerI = document.getElementById("drawerI").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[0] = (true);
                            });
                                            var pillBoxI = document.getElementById("pillBoxI").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[1] = (true);
                            });
                                            var slotI = document.getElementById("slotI").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[2] = (true);
                            });
                                            var medSyropI = document.getElementById("medSyropI").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[3] = (true);
                            });

                                        } else if (medecineD.includes(strUser1)){
                                            istrs.delete;
                                            drawer.style.display = "none";
                                            PillBox.style.display = "none";
                                            slot.style.display = "none";
                                            medPill.style.display = "none";
                                            medSyrop.style.display = "none";
                                            dropper.style.display = "block";
                                            drink.style.display = "block";
                                            for (let i = 0; i < 2; i++) {
                                                istrs.push(false);
                                            }

                                            var dropperI = document.getElementById("dropperI").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[0] = (true);
                            });
                                            var drinkI = document.getElementById("drinkI").addEventListener("change", (e)=>{
                                if( e.target.checked)
                                istrs[1] = (true);
                            });
                                        } else {
                                            istrs.delete;
                                            drawer.style.display = "none";
                                            PillBox.style.display = "none";
                                            slot.style.display = "none";
                                            medPill.style.display = "none";
                                            medSyrop.style.display = "none";
                                            dropper.style.display = "none";
                                            drink.style.display = "none";
                                        }
                                        console.log(selectedReminder);
                                    });
                                }
                                    break;
                    
                            
                    default:
                        med.style.display = "none";
                        fridge.style.display = "none";
                        box.style.display ="none";
                        heat.style.display = "none";                 
                        break;
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

                document.getElementById("titleMod").innerHTML = "Update Reminder";
                var addBtn = document.getElementById("submitR");
                addBtn.value = "Update Reminder"

                addBtn.addEventListener("click", () => {
                console.log(istrs);
                console.log(strUser);
                var rTitle;
                    if (strUser == "medicine") {
                        rTitle =  strUser1;
                    } else {
                        rTitle =  strUser;
                    }
                db.collection("Events").doc(doc.id).update({
                    title: rTitle,
                    instructions: istrs,
                    supervisorId: sessionStorage.getItem("USERID"), 
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

            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            lineBreak.id = "br";
            document.getElementById(d4.id).appendChild(lineBreak);

            var deleteR = document.createElement("a");
            deleteR.id = "deleteP";
            deleteR.classList = "btn btn-dark";
            document.getElementById(d4.id).appendChild(deleteR);
            deleteR.textContent= "Delete Reminder";
            deleteR.href = "#";
            deleteR.onclick = ()=> {
                var result = confirm("Want to delete?");
                if (result) {
                    //Logic to delete the item
                    db.collection("Events").doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                        window.location.reload();
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            };
            i++;
        });
        console.log("Reminder List ", events.join(", "));
    });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  })

  function addReminder() {
    // Get the modal
    var modal = document.getElementById("myAddReminderModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];



    modal.style.display = "block";

    
    var reminder = document.getElementById("rType");
    reminder.style.display = "block";

    var med = document.getElementById("medicineType");
    med.style.display = "none";

    var fridge = document.getElementById("fridge");
    fridge.style.display = "none";
    var box = document.getElementById("box");
    box.style.display = "none";
    var heat = document.getElementById("heat");
    heat.style.display = "none";

    var drawer = document.getElementById("drawer");
    drawer.style.display = "none";
    var PillBox = document.getElementById("pillBox");
    PillBox.style.display = "none";
    var slot = document.getElementById("slot");
    slot.style.display = "none";
    var medPill = document.getElementById("medPill");
    medPill.style.display = "none";
    var medSyrop = document.getElementById("medSyrop");
    medSyrop.style.display = "none";
    var dropper = document.getElementById("dropper");
    dropper.style.display = "none";
    var drink = document.getElementById("drink");
    drink.style.display = "none";
    var medecineP = [];
    db.collection("House/Kitchen/Drawer/MedDrawer/PillBox").get()
    .then((querySnapshot) => {
        var medType = document.getElementById("medicineType");
        querySnapshot.forEach((doc) => {
            medecineP.push(doc.id);
            var option = document.createElement("option");
            option.value = doc.id;
            option.innerHTML = doc.id;
            medType.appendChild(option);
            // document.getElementById("pill").innerHTML = "PillBox";


        });
        console.log("boxMedecines", medecineP.join(", "));
    }).catch((error) => {
        console.log(("Error getting Documents:" + error));
    });
    var medecineD = [];
    db.collection("/House/Kitchen/Dropper").get()
    .then((querySnapshot) => {
        var medType = document.getElementById("medicineType");
        querySnapshot.forEach((doc) => {
            medecineD.push(doc.id);
            var option = document.createElement("option");
            option.value = doc.id;
            option.innerHTML = doc.id;
            medType.appendChild(option);
        });
        console.log("boxMedecines", medecineD.join(", "));
    }).catch((error) => {
        console.log(("Error getting Documents:" + error));
    });
    var medecineDr = [];

    db.collection("House/Kitchen/Drawer/MedDrawer/SyropBox").get()
    .then((querySnapshot) => {
        var medType = document.getElementById("medicineType");
        querySnapshot.forEach((doc) => {
            medecineDr.push(doc.id);
            var option = document.createElement("option");
            option.value = doc.id;
            option.innerHTML = doc.id;
            medType.appendChild(option);
        });
        console.log("boxMedecines", medecineDr.join(", "));
    }).catch((error) => {
        console.log(("Error getting Documents:" + error));
    });

    var selectedReminder;
   reminder.addEventListener("change", (e) => {
      strUser = e.target.value;
      console.log(strUser);
      
      switch (strUser) {
          case "dinner": {
              istrs.delete;
              med.style.display = "none";
              fridge.style.display = "block";
              document.getElementById("boxName").innerHTML = "Dinner";
              box.style.display = "block";
              document.getElementById("foodType").innerHTML = "Dinner";
              heat.style.display = "block";

              for (let i = 0; i < 3; i++) {
                istrs.push(false);
            }
              var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                if( e.target.checked)
                istrs[0](true);
            });
              var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                if( e.target.checked)
                istrs[1](true);
            });
              var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                if( e.target.checked)
                istrs[2] = (true);
            });

              console.log(selectedReminder);
          }
              break;

              case "snack": {
                istrs.delete;
                med.style.display = "none";
                fridge.style.display = "block";
                document.getElementById("boxName").innerHTML = "Snack";
                box.style.display = "block";
                document.getElementById("foodType").innerHTML = "Snack";
                heat.style.display = "block";
                for (let i = 0; i < 3; i++) {
                    istrs.push(false);
                }
                var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[0] = (true);
                });
                var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[1]= (true);
                });
                var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[2] = (true);
                });
            }
                break;
  

              case "lunch": {
                  istrs.delete;
                med.style.display = "none";
                fridge.style.display = "block";
                document.getElementById("boxName").innerHTML = "Lunch";
                box.style.display = "block";
                document.getElementById("foodType").innerHTML = "Lunch";
                heat.style.display = "block";
                for (let i = 0; i < 3; i++) {
                    istrs.push(false);
                }

                var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[0] = (true);
                });
                var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[1] = (true);
                });
                var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[2] = (true);
                });
                console.log(selectedReminder);
            }
                break;

                case "breakfast": {
                    istrs.delete;
                    med.style.display = "none";

                    fridge.style.display = "block";
                    document.getElementById("boxName").innerHTML = "Breakfast";
                    box.style.display = "block";
                    document.getElementById("foodType").innerHTML = "Breakfast";
                    heat.style.display = "block";
                    for (let i = 0; i < 3; i++) {
                        istrs.push(false); 
                    }
                    var fr = document.getElementById("fr").addEventListener("change", (e)=>{
                        if( e.target.checked)
                        istrs[0] = (true);
                       
                    });
                    var cbox = document.getElementById("cbox").addEventListener("change", (e)=>{
                        if( e.target.checked)
                        istrs[1] = (true);
                    });
                    var heatm = document.getElementById("heatm").addEventListener("change", (e)=>{
                        if( e.target.checked)
                        istrs[2] = (true);
                    });
                    console.log(selectedReminder);
                }
                    break;

                    case "medicine": {
                        med.style.display = "block";
                        med.addEventListener("change", (e) => {
                            strUser1 = e.target.value;
                            console.log(strUser1);
                            if (medecineP.includes(strUser1)) {
                                istrs.delete;
                                document.getElementById("pill").innerHTML = "PillBox";

                                drawer.style.display = "block";
                                PillBox.style.display = "block";
                                slot.style.display = "block";
                                medPill.style.display = "block";
                                medSyrop.style.display = "none";
                                dropper.style.display = "none";
                                drink.style.display = "none";
                                for (let i = 0; i < 4; i++) {
                                    istrs.push(false);
                                }

                                var drawerI = document.getElementById("drawerI").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[0] = (true);
                                });
                                var pillBoxI = document.getElementById("pillBoxI").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[1] = (true);
                                });
                                var slotI = document.getElementById("slotI").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[2] = (true);
                                });
                                var medPillI = document.getElementById("medPillI").addEventListener("change", (e)=>{
                                    if( e.target.checked)
                                    istrs[3] = (true);
                                });
                            } else if(medecineDr.includes(strUser1)) {
                                istrs.delete;
                                document.getElementById("pill").innerHTML = "SyropBox";

                                drawer.style.display = "block";
                                PillBox.style.display = "block";
                                slot.style.display = "block";
                                medPill.style.display = "none";
                                medSyrop.style.display = "block";
                                dropper.style.display = "none";
                                drink.style.display = "none";
                                for (let i = 0; i < 4; i++) {
                                    istrs.push(false);
                                }

                                var drawerI = document.getElementById("drawerI").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[0] = (true);
                });
                                var pillBoxI = document.getElementById("pillBoxI").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[1] = (true);
                });
                                var slotI = document.getElementById("slotI").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[2] = (true);
                });
                                var medSyropI = document.getElementById("medSyropI").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[3] = (true);
                });

                            } else if (medecineD.includes(strUser1)){
                                istrs.delete;
                                drawer.style.display = "none";
                                PillBox.style.display = "none";
                                slot.style.display = "none";
                                medPill.style.display = "none";
                                medSyrop.style.display = "none";
                                dropper.style.display = "block";
                                drink.style.display = "block";
                                for (let i = 0; i < 2; i++) {
                                    istrs.push(false);
                                }

                                var dropperI = document.getElementById("dropperI").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[0] = (true);
                });
                                var drinkI = document.getElementById("drinkI").addEventListener("change", (e)=>{
                    if( e.target.checked)
                    istrs[1] = (true);
                });
                            } else {
                                istrs.delete;
                                drawer.style.display = "none";
                                PillBox.style.display = "none";
                                slot.style.display = "none";
                                medPill.style.display = "none";
                                medSyrop.style.display = "none";
                                dropper.style.display = "none";
                                drink.style.display = "none";
                            }
                            console.log(selectedReminder);
                        });
                    }
                        break;
          
                  
          default:
              med.style.display = "none";
              fridge.style.display = "none";
              box.style.display ="none";
              heat.style.display = "none";                 
              break;
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
    var addBtn = document.getElementById("submitR");

    addBtn.addEventListener("click", () => {
      console.log(istrs);
      console.log(strUser);
      var rTitle;
        if (strUser == "medicine") {
            rTitle =  strUser1;
        } else {
            rTitle =  strUser;
        }
      db.collection("Events").add({
          title: rTitle,
          instructions: istrs,
          supervisorId: sessionStorage.getItem("USERID"), 
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


    