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
    var title = param.get("title");

    //Variable for list type
    var type;

    //listItem array variable
    var item = 0;

    $("#titleName").append(title);

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
                        if (doc.data().title == title) {

                            //Select List Type
                            switch (doc.data().type) {
                                //1: Checklist Type
                                //2: Regular Type
                                case "1":
                                    type = "<input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'></input>";
                                    break;

                                default:
                                    type = 1;
                                    break;
                            }

                            doc.data().listItem.forEach(function () {
                                table = table + "<tr><td>" + type + "</td><td>" + doc.data().listItem[item] + "</td></tr>";
                                item++;

                                //Check if the type is a regular list
                                if (Number.isInteger(type)) {
                                    type++;
                                }
                            });

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