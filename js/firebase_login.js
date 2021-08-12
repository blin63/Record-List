// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {

        var user = authResult.user;
        if (authResult.additionalUserInfo.isNewUser) {
            db.collection("users").doc(user.uid).set({
                name: user.displayName,
                email: user.email
            }).then(function() {
                window.location.assign("../html/list.html");
            })
                .catch(function(error) {
                    console.log("Error adding user " + error);
                });
        } else {
            return true;
        }

        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../html/list.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID

    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);