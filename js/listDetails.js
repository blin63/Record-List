/**
 * Displays the list selected
 * Author: Brendan Lin
 * Ver: 1.0
 */

$(document).ready(function () {
    // Create the table variable w/ header
    var table = "<table class='table'><thead><tr><th scope='col'>Type</th><th scope='col'>List Item</th></tr</thead><tbody>";

    //Get the title stored in the URL
    const param = new URLSearchParams(window.location.search);
    var id = param.get("id");

    //Variable for list type
    var type;

    //Variable for title
    var title;

    //counter variable
    var counter = 1;

    //Checkbox array variable
    var checkboxArr = [];

    //get user's uid
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;

            //Get the List from the db
            db.collection("lists").where("uid", "==", uid).get()
                .then(function (query) {
                    query.forEach(function (doc) {
                        if (doc.id == id) {

                            title = doc.data().title;
                            $("#titleName").append(title);

                            //Get Checkbox Array
                            checkboxArr = doc.data().checkItem;

                            for (let i = 0; i < checkboxArr.length; i++) {
                                //Select List Type
                                switch (doc.data().type) {
                                    //1: Checklist Type
                                    //2: Regular Type
                                    case "1":
                                        //Check if checkbox was previously selected before from db
                                        if (!checkboxArr[i]) {
                                            type = "<input class='form-check-input chkbox' type='checkbox' id='flexCheckDefault' onclick='updateCheckboxArr(" + i + ")'></input>";
                                        } else {
                                            type = "<input class='form-check-input chkbox' type='checkbox' id='flexCheckDefault' onclick='updateCheckboxArr(" + i + ")' checked></input>";
                                        }    
                                        break;

                                    default:
                                        type = counter;
                                        break;
                                }

                                //Check if the type is a regular list
                                if (Number.isInteger(type)) {
                                    counter++;
                                }

                                table = table + "<tr><td>" + type + "</td><td>" + doc.data().listItem[i] + "</td></tr>"; 
                            }
                        }
                    })
                }).then(function () {
                    //close the table and append to HTML page
                    table = table + "</tbody></table>";

                    $("#tableContent").append(table);
                });

        }
    });
});

//Update Checkbox Array
function updateCheckboxArr(index) {
    console.log(index);
    //Get the title stored in the URL
    const param = new URLSearchParams(window.location.search);
    var id = param.get("id");

    //checkbox arr variable
    var checkboxArr = [];
    
    //get the checkbox arr from db
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;

            db.collection("lists").where("uid", "==", uid).get()
            .then(function(query) {
                query.forEach(function (doc) {
                    if (doc.id == id) {
                        checkboxArr = doc.data().checkItem;
                    }
                })
            }).then(function() {
                //disable all checkboxes to allow time for db to update checkItem arr
                for (let i = 0; i < checkboxArr.length; i++) {
                    document.getElementsByClassName("chkbox")[i].disabled = true;
                } 

                //If Box is checked, set index to false; if box is unchecked, set index to true
                if (checkboxArr[index]) {
                    checkboxArr[index] = false;
                } else {
                    checkboxArr[index] = true;
                }
            }).then(function() {
                //update query
                db.collection("lists").doc(id).update({
                    checkItem: checkboxArr
                }).then(function() {
                    //Allow all checkboxes to be active after update
                    setTimeout(function() {
                        for (let t = 0; t < checkboxArr.length; t++) {
                            document.getElementsByClassName("chkbox")[t].disabled = false;
                        }
                    }, 3000)
                });
            });
        }
    })
}