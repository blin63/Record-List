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
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

let title;
let type;
let listItem;
let checkItem = [];

//Extract data from form and prepare them for sending to the db
document.getElementById("submit").addEventListener("click", function() {
    title = document.getElementById("titleName").value;
    type = document.getElementById("select").value;
    listItem = document.getElementById("listItems").value.split(";");
    
    //Create a checkItem boolean array as large as the listItem array
    for (let i = 0; i < listItem.length; i++) {
        checkItem.push(false);
    }

    //Call function to write add list to db
    writeData();
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
    }).then(setTimeout(function(){
        window.location.replace("list.html");
    }, 5000));
}