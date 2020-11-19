<script>
    import { Link } from 'svelte-routing'
    import { storage } from "firebase/app";
    import "firebase/storage";
    //import { onMount, onDestroy } from 'svelte';

    export let id;
    export let name;
    export let avatar;

    let avatarUrl;
  
    if(avatar) {
        const storageRef = storage().ref();
        storageRef.child(avatar).getDownloadURL().then(function(url) {
            avatarUrl = url;
        });
    }
  </script>
  <style>
  
  </style>
  
  <Link to="/characters/{id}">
    <div class="avatar" style="background-image: url({avatarUrl});"></div>
    {name}
  </Link>