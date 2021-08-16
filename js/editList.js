/**
 * This script automatically reads the list selected from the db and allows the user to edit or delete the list selected.
 * Author: Brendan Lin
 * Ver: 1.0
 */

//variables
var docId;
let getTitle;
let getType;
let getListContent = [];
let getchecklist = [];

const param = new URLSearchParams(window.location.search);
let titleMatch = param.get("title");

//Read the selected list data from db
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;

        //Query user's list from db
        var listData = db.collection("lists").where("uid", "==", uid).get()
            .then(function (query) {
                query.forEach(function (doc) {
                    //get selected doc from db
                    if (doc.data().title == titleMatch) {
                        docId = doc.id;
                        getTitle = doc.data().title;
                        getType = doc.data().type;
                        getListContent = doc.data().listItem;
                        getchecklist = doc.data().checkItem;
                    }
                })
            }).then(function () {
                //take list data and insert into form area
                document.getElementById("listName").value = getTitle;
                document.getElementById("typeSelect").value = getType;
                let listItemHold = getListContent[0] + ";";

                //append a ; after each listItem array item
                for (let i = 1; i < getListContent.length; i++) {
                    listItemHold = listItemHold + getListContent[i] + ";";
                }

                //take appended listItem array and insert it into textarea
                document.getElementById("listItems").value = listItemHold;
            });

    }
});

//Delete Eventlistener operation
document.getElementById("delete").addEventListener("click", function() {
    //Query db to delete selected doc from lists collection
    db.collection("lists").doc(docId).delete()
    .then(function() {
        setTimeout(function() {
            window.location.replace("editListMenu.html");
        }, 5000);
    });
});

//Update Eventlistener operation
document.getElementById("update").addEventListener("click", function() {

});