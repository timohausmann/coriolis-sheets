<script>
    import Field from './Field.svelte';
    import FieldPoints from './FieldPoints.svelte';
	import TextField from './TextField.svelte';
	import Points from './Points.svelte';
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
    <div class="flex-2 flex-gutter">
        <section>
            <h2>Schiff</h2>
            <TextField label="Name" name="char_name" />
            <div class="row">
                <div class="flex-1">
                    <TextField label="Klasse & Typ" name="class_type" />
                    <TextField label="Problem" name="problem" />
                </div>
                <div class="flex-1">
                    <TextField label="Werft" name="shipyard" />
                    <TextField label="Schulden" name="debt" />
                </div>
            </div>
        </section>
        <section>
            <h2>Daten</h2>
            <div class="row">
                <div class="flex-1">
                    <Field label="Manövrierbarkeit" name="maneuverability" />
                    <Field label="Geschwindigkeit" name="speed" />
                </div>
                <div class="flex-1">
                    <Field label="Signatur" name="signature" />
                    <Field label="Panzerung" name="armor" />
                </div>
            </div>
        </section>
        <section>
            <h2>Module</h2>
            <Field label="Maximale Anzahl an Modulen" name="modules_max" />
        </section>
    </div>
    <div class="flex-1 flex-gutter">
        <section>
            <h2>Leistungspunkte</h2>
            <FieldPoints label="Leistungspunkte" name="performance" max="10" />
        </section>
        <section>
            <h2>Rumpfpunkte</h2>
            <FieldPoints label="Rumpfpunkte" name="hull" max="10" />
            <Points max="10" name="hull_points_2" />

            <TextField label="Kritische Schaden" name="crit_1" />
            <TextField label="Kr.W." name="crit_2" />
            <TextField label="Kr.W." name="crit_3" />
        </section>
    </div>
</div>