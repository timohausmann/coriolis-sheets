<script>
    import Field from './Field.svelte';
    import FieldPoints from './FieldPoints.svelte';
	import TextField from './TextField.svelte';
	import TextArea from './TextArea.svelte';
	import Points from './Points.svelte';
	import Equipment from './Equipment.svelte';
    import Weapon from './Weapon.svelte';
    import Image from './Image.svelte';
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
    <section class="flex-1 flex-gutter">
        <h2>Abbildung</h2>
        <Image />
    </section>
    <section class="flex-2 flex-gutter">
        <h2>Beschreibung</h2>
        <TextArea label="Beschreibung" name="description" />
    </section>
</div>
<div class="row">
    <div class="flex-1 flex-gutter">
        <section>
            <h2>Attribute</h2>
            <Field label="Stärke" name="attr_str" />
            <Field label="Geschicklichkeit" name="attr_dex" />
            <Field label="Verstand" name="attr_int" />
            <Field label="Empathie" name="attr_emp" />
        </section>
    </div>
    <div class="flex-2 flex-gutter">
        <section>
            <h2>Charakter</h2>
            <div class="row">
                <div class="flex-2">
                    <TextField label="Name" name="char_name" />
                    <TextField label="Konzept" name="char_concept" />
                    <div class="row">
                        <div class="flex-1">
                            <TextField label="Gruppenkonzept" name="group_concept" />
                        </div>
                        <div class="flex-1">
                            <TextField label="Gruppentalent" name="group_talent" />
                        </div>
                    </div>
                    <TextField label="Persönliches Problem" name="challenge" />
                </div>
                <div class="flex-1">
                    <TextField label="Hintergrund" name="char_bg" />
                    <TextField label="Heimatsystem" name="homesystem" />
                    <TextField label="Ikone" name="char_icon" />
                    <Field label="Reputation" name="char_rep" />
                </div>
            </div>
        </section>
    </div>
</div>









<div class="row">
    <div class="flex-1 flex-gutter">

        <section>
            <h2>Trauma</h2>
            <FieldPoints label="Trefferpunkte" name="hp" max="12" />

            <TextField label="Kritische Wunden" name="crit_1" />
            <TextField label="Kr.W." name="crit_2" />
            <TextField label="Kr.W." name="crit_3" />

            <FieldPoints label="Willenskraft" name="will" max="12" />
        </section>
    </div>
    <div class="flex-2 flex-gutter">
        <section>
            <h2>Aussehen</h2>
            <TextField label="Gesicht" name="look_face" />
            <TextField label="Kleidung" name="look_clothing" />
        </section>
        <section>
            <h2>Beziehungen</h2>
            <TextField label="SC 1" name="rel_sc1" />
            <TextField label="SC 2" name="rel_sc2" />
            <TextField label="SC 3" name="rel_sc3" />
            <TextField label="SC 4" name="rel_sc4" />
        </section>
    </div>
</div>


<div class="row">
    <div class="flex-2 flex-gutter">

        <div class="row">
            <section class="flex-1 flex-gutter">
                <h2>Strahlung</h2>
                <Points max="10" name="rad" />
            </section>
            <section class="flex-1 flex-gutter">
                <h2>Erfahrung</h2>
                <Points max="10" name="xp" />
            </section>
        </div>

        <section class="section">
            <h2>Fertigkeiten</h2>
            <div class="row">
                <div class="flex-1">
                    <Field label="Beobachtung (Verstand)" name="ab_observation" />
                    <Field label="Beweglichkeit (Geschicklichkeit)" name="ab_agility" />
                    <Field label="Fernkampf (Geschicklichkeit)" name="ab_ranged" />
                    <Field label="Infiltration (Geschicklichkeit)" name="ab_infiltration" />
                    <Field label="Kraftakt (Stärke)" name="ab_strength" />
                    <Field label="Manipulation (Empathie)" name="ab_manipulation" />
                    <Field label="Nahkampf (Stärke)" name="ab_melee" />
                    <Field label="Überleben (Verstand)" name="ab_survival" />
                </div>
                <div class="flex-1">
                    <Field label="Datendschinn (Verstand)" name="ab_datadschinn" />
                    <Field label="Kommandieren (Empathie)" name="ab_command" />
                    <Field label="Kultur (Empathie)" name="ab_culture" />
                    <Field label="Medikurgie (Verstand)" name="ab_medi" />
                    <Field label="Mystik (Empathie)" name="ab_mystic" />
                    <Field label="Pilot (Geschicklichkeit)" name="ab_pilot" />
                    <Field label="Technologie (Verstand)" name="ab_tech" />
                    <Field label="Wissenschaft (Verstand)" name="ab_science" />
                </div>
            </div>
        </section>

        <section>
            <h2>Waffen</h2>
            <Weapon suffix="1" />
            <Weapon suffix="2" />
            <Weapon suffix="3" />
            <Weapon suffix="4" />
        </section>

        
        <div class="row">
            <section class="flex-2 flex-gutter">
                <h2>Panzerung</h2>
                <div class="row">
                    <div class="flex-2">
                        <TextField label="Name" name="armor_name" />
                    </div>
                    <div class="flex-1">
                        <TextField label="Wert" name="armor_value" />
                    </div>
                    <div class="flex-1">
                        <TextField label="Anm." name="armor_comment" />
                    </div>
                </div>
            </section>
            <section class="flex-1 flex-gutter">
                <h2>Birr</h2>
                <TextField label="Birr" name="birr" />
            </section>
        </div>
    </div>


    <div class="flex-1 flex-gutter">
        <section>
            <h2>Talente</h2>
            <TextField label="Talent 1" name="talent_1" />
            <TextField label="Talent 2" name="talent_2" />
            <TextField label="Talent 3" name="talent_3" />
            <TextField label="Talent 4" name="talent_4" />
            <TextField label="Talent 5" name="talent_5" />
        </section>
        <section>
            <h2>Ausrüstung</h2>
            <Equipment suffix="1" />
            <Equipment suffix="2" />
            <Equipment suffix="3" />
            <Equipment suffix="4" />
            <Equipment suffix="5" />
            <Equipment suffix="6" />
            <Equipment suffix="7" />
            <Equipment suffix="8" />
            <Equipment suffix="9" />
            <Equipment suffix="10" />
            <Equipment suffix="11" />
        </section>
    </div>
    
</div>