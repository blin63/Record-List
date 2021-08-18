/**
 * Extracts data from form and sends them to database.
 * Author: Brendan Lin
 * Ver: 1.0
 */

//variables
var uid;

//get user's uid
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        uid = user.uid;
    }
});

let title;
let type;
let listItem;
let checkItem = [];

//validation variables;
titleError = false;
typeError = false;
listItemError = false;
errMsg = "";

//Extract data from form and prepare them for sending to the db
document.getElementById("submit").addEventListener("click", function () {
    title = document.getElementById("titleName").value;
    type = document.getElementById("select").value;
    listItem = document.getElementById("listItems").value.split(";");

    //Create a checkItem boolean array as large as the listItem array
    for (let i = 0; i < listItem.length; i++) {
        checkItem.push(false);
    }

    //Check if data is valid
    if (type == "0") {
        typeError = true;
        errMsg = errMsg + "<li>Please Select a valid List Type</li>";
    }

    if (title.length == 0) {
        titleError = true;
        errMsg = errMsg + "<li>Please Enter a Title Name</li>";
    }

    if (listItem == "") {
        listItemError = true;
        errMsg = errMsg + "<li>Please Enter a Record to add to list</li>";
    }

    //If any errors are present don't add to db; reset error variables
    if (typeError || titleError || listItemError) {
        typeError = false;
        titleError = false;
        listItemError = false;

        //Display Error Message
        document.getElementById("errorList").innerHTML = errMsg;
        document.getElementById("error").style.visibility = "visible";
        errMsg = "";

        //Reset all Variables
        checkItem = [];
        title = null;
        type = null;
        listItem = null;
    } else {
        //Call function to write add list to db
        writeData();
    }
});

//Function writes data to db
function writeData() {
    //Add data to db
    db.collection("lists").add({
        uid: uid,
        title: title,
        type: type,
        listItem: listItem,
        checkItem: checkItem
    }).then(setTimeout(function () {
        window.location.replace("list.html");
    }, 5000));
}