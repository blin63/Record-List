/**
 * Check if user is logged in at all times
 * Author: Brendan Lin
 * Ver: 1.0
 */

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //user is logged in
      console.log("User " + user.uid + " is logged in");
    } else {
      //user is logged out
      //Re-direct user to index.html
      window.location.replace("../index.html");
    }
  });