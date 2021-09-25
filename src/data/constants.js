export const TECH = ['HTML', 'Svelte', 'Vue'];

export const STYLEDBY = ['Bootstrap', 'Bulma', 'Kazkadien'];

export const PATTERNS = ['[A-Za-z]', '[0-9]{3}-[0-9]{3}-[0-9]{4}'];

export const ACCEPT = [
	'audio/*',
	'video/*',
	'image/*',
	'.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const myField = {
	name: 'Field',
	code: `<script>
	export let label = ''
</script>

<label class="field">
  {#if label}
    <i>{label}</i>
  {/if}
  <slot>input</slot>
</label>
`
};

const myBoxField = {
	name: 'BoxField',
	code: `<script>
	export let label = ''
	export let rows = false
</script>

<div class="field">
  {#if label}
    <i>{label}</i>
  {/if}
  <div class="boxfields" class:rows>
    <slot>boxfield-entries</slot>
  </div>
</div>
`
};

const myBoxFieldEntry = {
	name: 'BoxFieldEntry',
	code: `<script>
	/** @type {"checkbox" | "radio"} */
	export let type
	export let label = ''
</script>

<label>
  <slot>boxfield-entry</slot>
  <div class="icon-holder" class:round="{type == 'radio'}">
    <svg viewBox="0 0 24 24">
      <use href="{type == 'radio' ? '#circle' : '#check'}" />
    </svg>
  </div>
  {#if label}
    <div class="boxlabel">{label}</div>
  {/if}
</label>

// /* Icons for checkbox & radio, place them in app.html */
// <svg id="all-icons" style="display: none">
// <symbol id="check">
// <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
// </symbol>

// <symbol id="circle">
// <circle cx="12" cy="12" r="8" />
// </symbol>
// </svg>
`
};

export const MY_COMPONENTS = [myField, myBoxField, myBoxFieldEntry];
