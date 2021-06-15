<script>
    import { _ } from 'svelte-i18n';

    import Field from './Field.svelte';
    import FieldPoints from './FieldPoints.svelte';
	import TextField from './TextField.svelte';
	import Equipment from './Equipment.svelte';
	import Points from './Points.svelte';
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
    <div class="flex-2 flex-gutter">
        <section>
            <h2>Schiff</h2>
            <TextField label="Name" name="name" />
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
            <TextField label="1" name="module_1" />
            <TextField label="2" name="module_2" />
            <TextField label="3" name="module_3" />
            <TextField label="4" name="module_4" />
            <TextField label="5" name="module_5" />
            <TextField label="6" name="module_6" />
            <TextField label="7" name="module_7" />
            <TextField label="8" name="module_8" />
            <TextField label="9" name="module_9" />
            <TextField label="10" name="module_10" />
            <TextField label="11" name="module_11" />
            <TextField label="12" name="module_12" />
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

            <TextField label="Kritischer Schaden" name="crit_1" />
            <TextField label="Kr.S." name="crit_2" />
            <TextField label="Kr.S." name="crit_3" />
        </section>
        <section>
            <h2>Merkmale</h2>
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
        </section>
    </div>
</div>
<div class="row">
    <section>
        <h2>Crew</h2>
        <div class="row">
            <div class="flex-1">
                <TextField label="Kapitän" name="crew_captain" />
            </div>
            <div class="flex-1">
                <TextField label="Pilot" name="crew_pilot" />
            </div>
            <div class="flex-1">
                <TextField label="Sensorbediener" name="crew_sensors" />
            </div>
            <div class="flex-1">
                <TextField label="Bordschütze" name="crew_gunner" />
            </div>
            <div class="flex-1">
                <TextField label="Maschinist" name="crew_machinist" />
            </div>
        </div>
    </section>
</div>
<div class="row">
    <div class="flex-1">
        <section>
            <h2>Inventar</h2>
            <div class="row">
                <div class="flex-1">
                    <TextField label="1" name="inventory_1" />
                    <TextField label="2" name="inventory_2" />
                    <TextField label="3" name="inventory_3" />
                    <TextField label="4" name="inventory_4" />
                    <TextField label="5" name="inventory_5" />
                    <TextField label="6" name="inventory_6" />
                </div>
                <div class="flex-1">
                    <TextField label="7" name="inventory_7" />
                    <TextField label="8" name="inventory_8" />
                    <TextField label="9" name="inventory_9" />
                    <TextField label="10" name="inventory_10" />
                    <TextField label="11" name="inventory_11" />
                    <TextField label={$_('sheet_birr')} name="birr" />
                </div>
            </div>
        </section>
    </div>
</div>
<div class="row">
    <section>
        <h2>{$_('sheet_weapons')}</h2>
        <Weapon suffix="1" shipweapon={true} />
        <Weapon suffix="2" shipweapon={true} />
        <Weapon suffix="3" shipweapon={true} />
        <Weapon suffix="4" shipweapon={true} />
    </section>
</div>