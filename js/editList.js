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
let idMatch = param.get("id");

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
                    if (doc.id == idMatch) {
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
                    if (i != getListContent.length - 1) {
                        listItemHold = listItemHold + getListContent[i] + ";";
                    } else {
                        listItemHold = listItemHold + getListContent[i];
                    }
                    
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
    //variables
    var title;
    var type;
    var listItem = [];
    var checkItem = [];

    //get modified data from text fields in form
    title = document.getElementById("listName").value;
    type = document.getElementById("typeSelect").value;
    listItem = document.getElementById("listItems").value.split(";");

    //create new checkItem boolean array
    for (let i = 0; i < listItem.length; i++) {
        checkItem[i] = false;
    }

    //update new checkItem array from old
    //outer for loop controls the new boolan array; inner loop checks if original data is in array and keeps selected checkmark if selected
    for (let j = 0; j < getchecklist.length; j++) {
        for (let k = 0; k < listItem.length; k++) {
            //if boolean array in original was not selected (not checked), skip checking
            if (!getchecklist[j]) {
                break;
            }

            //if original data is still in modified list and was originally selected (checkmark), reflect that change in new boolean list at new location
            if (getListContent[j] == listItem[k]) {
                checkItem[k] = true;
                break;
            }
        }
    }

    //call updateData function to query db
    updateData(title, type, listItem, checkItem);
});

//sends a update query to db when update button is clicked
function updateData(title, type, listItem, checkItem) {
    db.collection("lists").doc(docId).update({
        title: title,
        type: type,
        listItem: listItem,
        checkItem: checkItem
    }).then(function() {
        setTimeout(function() {
            window.location.replace("editListMenu.html");
        }, 5000);
    });
}