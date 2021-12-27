<script>
    import { Link } from 'svelte-routing';
    import { userStore } from './stores.js';

    export let location;

    let createHref = 'sheet';
    let partyHref = 'login';

    if($userStore.isSignedIn) {
        createHref = 'characters';
        partyHref = 'parties';
    }
</script>

<section
    class="section has-text-white intro"
    style="background-image: url(/images/coriolis-space-station-langwichsplendur.webp)"
>
    <div class="container">
        <a name="start" />
        <h2 class="js-intro">
            Store your characters
            <br />
            in the cloud
        </h2>
        <Link getProps={() => ({ class: 'cta' })} to={`/${createHref}`}
            >Create a Character</Link
        >
    </div>
    <div class="footnote has-text-white">
        <a
            href="http://www.langwichsplendur.se/2019/06/17/coriolis-station/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Artwork by John Salquist
        </a>
    </div>
</section>

<section class="section dark has-text-white">
    <div class="container">
        <a name="sheets" />
        <div class="columns">
            <div class="column is-two-thirds">
                <h2>Sheets for characters and ships</h2>
                <ul>
                    <li>Never lose your character sheet again</li>
                    <li>No more coffee stains or eraser marks</li>
                    <li>Upload an image of your character or ship</li>
                    <li>Additional fields for lore and inventory</li>
                    <li>Works on mobile and desktop</li>
                </ul>
                <Link getProps={() => ({ class: 'cta' })} to={`/sheet`}
                    >View Sheet</Link
                >
            </div>
            <div class="column">
                <img
                    src="/images/coriolis-character-sheet.webp"
                    alt="Coriolis Character Sheet"
                />
            </div>
        </div>
    </div>
    <div class="footnote has-text-white">
        <a
            href="https://pixabay.com/photos/space-panorama-galaxy-cosmos-2638158/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Artwork by Alex Myers
        </a>
    </div>
</section>

<section
    class="section has-text-white"
    style="background-image: url(/images/BrainCloud-and-scientist_mango_concept-art_04-1080h.webp)"
>
    <div class="container">
        <a name="team-up" />
        <h2 class="">
            Team up
            <br />
            with your party
        </h2>
        <ul>
            <li>Create a party and invite your crew</li>
            <li>See the character sheets of your mates</li>
            <li>Board a ship together</li>
        </ul>
        <Link getProps={() => ({ class: 'cta' })} to={`/${partyHref}`}
            >Start a party</Link
        >
    </div>
    <div class="footnote has-text-white">
        <a
            href="https://commons.wikimedia.org/wiki/File:BrainCloud-and-scientist_mango_concept-art_04.png"
            target="_blank"
            rel="noopener noreferrer"
        >
            Artwork by David Revoy
        </a>
    </div>
</section>

<section class="section dark has-text-white">
    <div class="container">
        <a name="contribute"></a>
        <h2>Free<br />as free can be</h2>
        <p>Coriolis Sheets is free and open source forever.</p>
        <h3>Feeling cute, might contribute later?</h3>
        <p>
            You are invited to contribute to this project:<br />
            Code | Artwork | Data | Translation | Donation
        </p>
        <a class="cta" href="https://github.com/timohausmann/coriolis-sheets" target="_blank" rel="noopener noreferrer">Visit us as github</a>
    </div>
</section>
<svelte:head>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<style lang="scss">
    @import './_vars.scss';

    section {
        font-family: 'DM Mono', monospace;

        min-height: 100vh;
        padding-top: 25vh;

        position: relative;
        background: center no-repeat #111;
        background-size: cover;
    }

    section.has-text-white::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 0;
    }

    section.intro {   
        &::after {
            background: rgba(0, 0, 0, 0);
        }

        @media #{$media-tablet-landscape-lt} {
            background-position: 85% 50%;
        }
    }

    section.dark {
        background-image: url(/images/space-2638158_1920.webp);
    }

    section.dark::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.9)
        );
        z-index: 0;
    }

    section:first-of-type {
        margin-top: -3.25rem;

        @media #{$media-tablet-landscape-lt} {
            display: flex;
            align-items: flex-end;
            padding-bottom: 10vh;
        }

        @media #{$media-tablet-landscape} {
            padding-top: 60vh;
        }
    }

    .container {
        z-index: 1;
    }

    h2 {
        font-size: 3rem;
        font-weight: 500;
        line-height: 1.2;
        margin-bottom: 2rem;

        @media #{$media-tablet-landscape-lt} {
            font-size: 2.5rem;
        }

        @media #{$media-tablet-landscape} {
            max-width: 60%;
        }
    }

    h2::after {
        content: '_';
        animation: flash 1s infinite;
    }

    h3 {
        font-size: 1.125rem;
        font-weight: 500;
        margin-top: 2rem;
        margin-bottom: 0.5rem;
    }

    p,
    ul {
        font-size: 1.125rem;
        margin-bottom: 1rem;

        @media #{$media-mobile} {
            font-size: 1rem;
        }
    }

    ul {
        list-style: none;
    }

    li {
        margin-bottom: 0.5rem;
    }

    li::before {
        content: '> ';
    }

    .footnote {
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
        z-index: 1;
    }
    
    .footnote a {
        color: inherit;
        border-bottom: 1px solid transparent;
        transition: border-bottom-color 1s;

        &:hover {
            border-bottom-color: rgba(255, 255, 255, 0.8);
        }
    }

    @keyframes flash {
        0%,
        100% {
            opacity: 0;
        }
        66% {
            opacity: 1;
        }
    }
</style>
