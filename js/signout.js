/**
 * Script to log out user
 * Author: Brendan Lin
 * Ver: 1.0 
 */

document.getElementById("logout").addEventListener("click", function () {
    firebase.auth().signOut().then(function () {
        window.location.replace("../index.html");
    }).catch(function (error) {
        console.log("Unable to log user out");
    });
});