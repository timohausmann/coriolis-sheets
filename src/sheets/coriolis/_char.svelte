<script>
    import { _ } from 'svelte-i18n';

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
        margin: 0;
    }
    .description {
        display: flex;
        flex-direction: column;
    }
    .description :global(h2) {

    }
    .description :global(.field) {
        flex: 1;
    }
</style>

<div class="row">
    <section class="flex-1 flex-gutter">
        <h2>{$_('sheet_image')}</h2>
        <Image />
    </section>
    <section class="flex-2 flex-gutter description">
        <h2>{$_('sheet_description')}</h2>
        <TextArea label="{$_('sheet_description')}" name="description" />
    </section>
</div>
<div class="row">
    <div class="flex-1 flex-gutter">
        <section>
            <h2>{$_('sheet_attributes')}</h2>
            <Field label={$_('attr_str')} name="attr_str" />
            <Field label={$_('attr_dex')} name="attr_dex" />
            <Field label={$_('attr_int')} name="attr_int" />
            <Field label={$_('attr_emp')} name="attr_emp" />
        </section>
    </div>
    <div class="flex-2 flex-gutter">
        <section>
            <h2>{$_('sheet_character')}</h2>
            <div class="row">
                <div class="flex-2">
                    <TextField label={$_('sheet_name')} name="name" />
                    <TextField label={$_('sheet_concept')} name="char_concept" />
                    <div class="row">
                        <div class="flex-1">
                            <TextField label={$_('sheet_group_concept')} name="group_concept" />
                        </div>
                        <div class="flex-1">
                            <TextField label={$_('sheet_group_talent')} name="group_talent" />
                        </div>
                    </div>
                    <TextField label={$_('sheet_problem')} name="challenge" />
                </div>
                <div class="flex-1">
                    <TextField label={$_('sheet_background')} name="char_bg" />
                    <TextField label={$_('sheet_homesystem')} name="homesystem" />
                    <TextField label={$_('sheet_icon')} name="char_icon" />
                    <Field label={$_('sheet_reputation')} name="char_rep" />
                </div>
            </div>
        </section>
    </div>
</div>









<div class="row">
    <div class="flex-1 flex-gutter">

        <section>
            <h2>{$_('sheet_trauma')}</h2>
            <FieldPoints label={$_('sheet_hp')} name="hp" max="12" />

            <TextField label={$_('sheet_crits')} name="crit_1" />
            <TextField label={$_('sheet_crits_short')} name="crit_2" />
            <TextField label={$_('sheet_crits_short')} name="crit_3" />

            <FieldPoints label={$_('sheet_spirit')} name="will" max="12" />
        </section>
    </div>
    <div class="flex-2 flex-gutter">
        <section>
            <h2>{$_('sheet_looks')}</h2>
            <TextField label={$_('sheet_face')} name="look_face" />
            <TextField label={$_('sheet_apparel')} name="look_clothing" />
        </section>
        <section>
            <h2>{$_('sheet_relationships')}</h2>
            <TextField label="{$_('sheet_player_char')} 1" name="rel_sc1" />
            <TextField label="{$_('sheet_player_char')} 2" name="rel_sc2" />
            <TextField label="{$_('sheet_player_char')} 3" name="rel_sc3" />
            <TextField label="{$_('sheet_player_char')} 4" name="rel_sc4" />
        </section>
    </div>
</div>


<div class="row">
    <div class="flex-2 flex-gutter">

        <div class="row">
            <section class="flex-1 flex-gutter">
                <h2>{$_('sheet_radiation')}</h2>
                <Points max="10" name="rad" />
            </section>
            <section class="flex-1 flex-gutter">
                <h2>{$_('sheet_experience')}</h2>
                <Points max="10" name="xp" />
            </section>
        </div>

        <section>
            <h2>{$_('sheet_skills')}</h2>
            <div class="row">
                <div class="flex-1">
                    <Field label="{$_('skill_observation')}" name="ab_observation" base="attr_int" skillType="common" />
                    <Field label="{$_('skill_agility')}" name="ab_agility" base="attr_dex" skillType="common" />
                    <Field label="{$_('skill_ranged')}" name="ab_ranged" base="attr_dex" skillType="common" />
                    <Field label="{$_('skill_infiltration')}" name="ab_infiltration" base="attr_dex" skillType="common" />
                    <Field label="{$_('skill_strength')}" name="ab_strength" base="attr_str" skillType="common" />
                    <Field label="{$_('skill_manipulation')}" name="ab_manipulation" base="attr_emp" skillType="common" />
                    <Field label="{$_('skill_melee')}" name="ab_melee" base="attr_str" skillType="common" />
                    <Field label="{$_('skill_survival')}" name="ab_survival" base="attr_int" skillType="common" />
                </div>
                <div class="flex-1">
                    <Field label="{$_('skill_data')}" name="ab_datadschinn" base="attr_int" />
                    <Field label="{$_('skill_command')}" name="ab_command" base="attr_emp" />
                    <Field label="{$_('skill_culture')}" name="ab_culture" base="attr_emp" />
                    <Field label="{$_('skill_medical')}" name="ab_medi" base="attr_int" />
                    <Field label="{$_('skill_mystic')}" name="ab_mystic" base="attr_emp" />
                    <Field label="{$_('skill_pilot')}" name="ab_pilot" base="attr_dex" />
                    <Field label="{$_('skill_tech')}" name="ab_tech" base="attr_int" />
                    <Field label="{$_('skill_science')}" name="ab_science" base="attr_int" />
                </div>
            </div>
        </section>

        <section>
            <h2>{$_('sheet_weapons')}</h2>
            <Weapon suffix="1" />
            <Weapon suffix="2" />
            <Weapon suffix="3" />
            <Weapon suffix="4" />
        </section>

        
        <div class="row">
            <section class="flex-2 flex-gutter">
                <h2>{$_('sheet_armor')}</h2>
                <div class="row">
                    <div class="flex-2">
                        <TextField label={$_('sheet_name')} name="armor_name" />
                    </div>
                    <div class="flex-1">
                        <TextField label={$_('sheet_value')} name="armor_value" />
                    </div>
                    <div class="flex-1">
                        <TextField label={$_('sheet_note')} name="armor_comment" />
                    </div>
                </div>
            </section>
            <section class="flex-1 flex-gutter">
                <h2>{$_('sheet_birr')}</h2>
                <TextField label={$_('sheet_birr')} name="birr" />
            </section>
        </div>
    </div>


    <div class="flex-1 flex-gutter">
        <section>
            <h2>{$_('sheet_talents')}</h2>
            <TextField label="{$_('sheet_talent')} 1" name="talent_1" />
            <TextField label="{$_('sheet_talent')} 2" name="talent_2" />
            <TextField label="{$_('sheet_talent')} 3" name="talent_3" />
            <TextField label="{$_('sheet_talent')} 4" name="talent_4" />
            <TextField label="{$_('sheet_talent')} 5" name="talent_5" />
        </section>
        <section>
            <h2>{$_('sheet_equipment')}</h2>
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