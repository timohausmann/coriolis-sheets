<script>
	import Field from './Field.svelte';
	import TextField from './TextField.svelte';
	import Slider from './Slider.svelte';
	import Equipment from './Equipment.svelte';
	import Weapon from './Weapon.svelte';
</script>

<style>

    section {
    /*    padding: 0 0.25rem;*/
        background: rgba(188, 224, 204, 0.9);
        margin-bottom: 0.5rem;
    }

    h2 {
        padding: 0.5rem;
        background: rgba(42, 54, 44, 0.9);
        color: white;
        font-size: 0.875rem;
        font-weight: normal;
        text-transform: uppercase;
        /*margin: 0 -0.25rem;*/
        margin: 0;
    }
</style>

<div class="row">
    <div class="flex-1 flex-gutter">
        <section>
            <h2>Attribute</h2>
            <Field label="Stärke" />
            <Field label="Geschicklichkeit" />
            <Field label="Verstand" />
            <Field label="Empathie" />
        </section>

        <section>
            <h2>Trauma</h2>
            <Field label="Trefferpunkte" />
            <Slider min="0" max="12" />
            <TextField label="Kritische Wunden" />
            <TextField label="Kr.W." />
            <TextField label="Kr.W." />
            <Field label="Willenskraft" />
            <Slider min="0" max="12" />
        </section>
    </div>
    <div class="flex-2 flex-gutter">
        <section>
            <h2>Charakter</h2>
            <div class="row">
                <div class="flex-2">
                    <TextField label="Name" />
                    <TextField label="Konzept" />
                    <TextField label="Gruppenkonzept" />        
                </div>
                <div class="flex-1">
                    <TextField label="Hintergrund" />
                    <TextField label="Ikone" />
                    <Field label="Reputation" />
                </div>
            </div>
            <TextField label="Persönliches Problem" />
        </section>
        <section>
            <h2>Aussehen</h2>
            <TextField label="Gesicht" />
            <TextField label="Kleidung" />
        </section>
        <section>
            <h2>Beziehungen</h2>
            <TextField label="SC 1" />
            <TextField label="SC 2" />
            <TextField label="SC 3" />
            <TextField label="SC 4" />
        </section>
    </div>
</div>


<div class="row">
    <div class="flex-2 flex-gutter">

        <div class="row">
            <section class="flex-1 flex-gutter">
                <h2>Strahlung</h2>
                <Slider min="0" max="10" />
            </section>
            <section class="flex-1 flex-gutter">
                <h2>Erfahrung</h2>
                <Slider min="0" max="10" />
            </section>
        </div>

        <section class="section">
            <h2>Fertigkeiten</h2>
            <div class="row">
                <div class="flex-1">
                    <Field label="Beobachtung (Verstand)" />
                    <Field label="Beweglichkeit (Geschicklichkeit)" />
                    <Field label="Fernkampf (Geschicklichkeit)" />
                    <Field label="Infiltration (Geschicklichkeit)" />
                    <Field label="Kraftakt (Stärke)" />
                    <Field label="Manipulation (Empathie)" />
                    <Field label="Nahkampf (Stärke)" />
                    <Field label="Überleben (Verstand)" />
                </div>
                <div class="flex-1">
                    <Field label="Datendschinn (Verstand)" />
                    <Field label="Kommandieren (Empathie)" />
                    <Field label="Kultur (Empathie)" />
                    <Field label="Medikurgie (Verstand)" />
                    <Field label="Mystik (Empathie)" />
                    <Field label="Pilot (Geschicklichkeit)" />
                    <Field label="Technologie (Verstand)" />
                    <Field label="Wissenschaft (Verstand)" />
                </div>
            </div>
        </section>

        <section>
            <h2>Waffen</h2>
            <Weapon />
            <Weapon />
            <Weapon />
            <Weapon />
        </section>
    </div>


    <div class="flex-1 flex-gutter">
        <section>
            <h2>Talente</h2>
            <TextField label="Talent 1" />
            <TextField label="Talent 2" />
            <TextField label="Talent 3" />
        </section>
        <section>
            <h2>Ausrüstung</h2>
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
            <Equipment />
        </section>
        
        <section>
            <h2>Panzerung</h2>
            <div class="row">
                <div class="flex-2">
                    <TextField label="Name" />
                </div>
                <div class="flex-1">
                    <TextField label="Wert" />
                </div>
                <div class="flex-1">
                    <TextField label="Anm." />
                </div>
            </div>
        </section>
    </div>

        


</div>



