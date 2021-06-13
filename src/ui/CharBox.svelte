<script>
    import { storage } from "firebase/app";
    import "firebase/storage";

    export let char;

    let avatarUrl;

    if (char.avatar) {
        const storageRef = storage().ref();
        storageRef
            .child(char.avatar)
            .getDownloadURL()
            .then(function (url) {
                avatarUrl = url;
            });
    }
</script>

<div class="box">
    {#if avatarUrl}
    <article class="media">
        <div class="media-left">
            <figure class="image is-96x96">
                <img src={avatarUrl} alt={`Image of ${char.name}`} />
            </figure>
        </div>
        <div class="media-content">
            <div class="content">
                <p class="title">{char.name}</p>
                {#if char.meta}
                    <p class="subtitle">{char.meta}</p>
                {/if}

            </div>
        </div>
    </article>
    {:else}
        <p class="title">{char.name}</p>
        {#if char.meta}
            <p class="subtitle">{char.meta}</p>
        {/if}
    {/if}
</div>

<style>
</style>
