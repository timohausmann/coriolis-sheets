<script>
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const ui = new firebaseui.auth.AuthUI(firebase.auth());



function createSignInForm() {

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return true;
            },
            uiShown: function () {

            }
        },
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE
    };

    ui.start('#firebaseui-auth-container', uiConfig);
}

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        console.log('We have a user!', user);

        //authenticatedRequest('GET', '/app-js');
    } else {
        console.log('We are not authed I guess!', user);

        createSignInForm();
    }
});

//document.getElementById('signOut').addEventListener('click', signOut);

//function signOut() {
//    firebase.auth().signOut();
//}
</script>
<style>
    .content {
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 480px;
        max-height: 320px;
        width: 100%;
        transform: translateX(-50%) translateY(-50%);

        text-align: center;
    }
</style>
<div class="content" id="firebase-auth">
    <div id="firebaseui-auth-container"></div>
</div>