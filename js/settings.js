/**
 * Script to allow user to update user profile settings.
 * Author: Brendan Lin
 * Ver: 1.0
 */

//variables
var userName;
var email;
var uid;

//get User profile data
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        uid = user.uid;

        db.collection("users").doc(uid).get()
            .then(function (doc) {
                userName = doc.data().name;
                email = doc.data().email;
            });
    }
});

//Send user password reset email
document.getElementById("resetPassword").addEventListener("click", function () {
    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            // Password reset email sent!
            console.log("Password reset email sent");
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
});

//Update username
document.getElementById("updateUsername").addEventListener("click", function () {
    let currentName = document.getElementById("currentUser").value;
    let newName = document.getElementById("newUser").value;
    if (userName == currentName) {
        if (newName.length > 0) {
            const user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: newName
            }).then(function () {
                // Update successful; update users collection corresponding to user's uid
                db.collection("users").doc(uid).update({
                    name: newName
                }).then(function () {
                    //reload settings page when finished updating db
                    setTimeout(function () {
                        window.location.reload();
                    }, 5000);
                });
            });
        }
    }
});

//Update email
document.getElementById("updateEmail").addEventListener("click", function () {
    let currentEmail = document.getElementById("currentEmail").value;
    let newEmail = document.getElementById("newEmail").value;

    if (currentEmail == email) {
        const user = firebase.auth().currentUser;

        user.updateEmail(newEmail).then(function() {
            // Update successful; update email in users db
            db.collection("users").doc(uid).update({
                email: newEmail
            }).then(function() {
                setTimeout(function() {
                    window.location.reload();
                }, 5000);
            });
        });
    } else {
        console.log("email update failed");
    }
});