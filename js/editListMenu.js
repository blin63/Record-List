/**
 * Gets the user's created lists and displays the lists to edit.
 * Author: Brendan Lin
 * Ver: 1.0
 */

 $(document).ready(function () {
    // Create the table variable w/ header
    var table = "<table class='table table-hover'><thead><tr><th scope='col'>List Name</th></tr</thead><tbody>";

    //get user's uid
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;

            //Query user's list from db
            var listData = db.collection("lists").where("uid", "==", uid).get()
                .then(function (query) {
                    query.forEach(function (doc) {
                        table = table + "<tr><td><a href='editList.html?id="+ doc.id +"'>" + doc.data().title + "</a></td></tr>";
                    })
                }).then(function () {
                    //close the table
                    table = table + "</tbody></table>";

                    //append the table to the HTML card body
                    $("#tableContent").append(table);
                });

        }
    });
});