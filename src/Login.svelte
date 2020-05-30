<script>
import { auth } from 'firebase/app';
import * as firebaseui from 'firebaseui';


let authContainer;

const ui = new firebaseui.auth.AuthUI(auth());

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
            auth.EmailAuthProvider.PROVIDER_ID,
            //auth.GoogleAuthProvider.PROVIDER_ID
        ],
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE
    };

    ui.start('#firebaseui-auth-container', uiConfig);
}

auth().onAuthStateChanged(function (user) {

    authContainer.innerHTML = '';

    if (user) {
        console.log('We have a user!', user);

        const btn = document.createElement('button');
        btn.innerText = "Sign Out";
        btn.addEventListener('click', signOut);
        authContainer.appendChild(btn);

        //authenticatedRequest('GET', '/app-js');
    } else {
        console.log('We are not authed I guess!', user);

        createSignInForm();
    }
});



function signOut() {
    auth().signOut();
}
</script>
<style>
    p {
        color: #eee;
        margin-bottom: 2rem;
        text-align: center;
    }
</style>

<p class="firebaseui-text">
    Create a new account or<br /> sign in with your existing account here.
</p>

<div id="firebaseui-auth-container" bind:this={authContainer}></div>
