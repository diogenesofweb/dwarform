import { HTMLFormScript, HTMLSubmitButton } from './helpers';
import { composeKazkadien } from './Kazkadien';
import { composeBootstrap } from './Bootstap';
import { composeBulma } from './Bulma';
import { composeSvelteComponentized } from './SvelteComponentized';

import { get } from 'svelte/store';
import { componentize } from '../../store/store';

const icons = `

<!-- Icons for checkbox & radio -->
<svg id="all-icons" style="display: none">
  <symbol id="check">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </symbol>

  <symbol id="circle">
    <circle cx="12" cy="12" r="8" />
  </symbol>
</svg>
    `;
/**
 * @param {import("../../typings/types").Field[]} fields
 * @param {string} tech
 * @param {string} styledBy
 * @returns string
 */
export function composer(fields, tech, styledBy) {
	const is_svelte = tech === 'Svelte' ? true : false;
	const is_vue = tech === 'Vue' ? true : false;

	let composed = {
		code: '<b>not implemented</b>',
		data: '',
		arrays: '',
		add_icons: false
	};

	if (is_svelte && styledBy === 'Kazkadien' && get(componentize)) {
		composed = composeSvelteComponentized(fields);
	} else {
		switch (styledBy) {
			case 'Kazkadien':
				composed = composeKazkadien(fields, { is_svelte, is_vue });
				break;

			case 'Bootstrap':
				composed = composeBootstrap(fields, { is_svelte, is_vue });
				break;

			case 'Bulma':
				composed = composeBulma(fields, { is_svelte, is_vue });
				break;

			default:
				console.warn('Wrong styledBy !');
				break;
		}
	}

	let { add_icons, code, data, arrays } = composed;

	let script = '';

	if (arrays) {
		script += arrays;
	}

	if (data) {
		if (is_vue) {
			script += `\nlet data = reactive({${data}\n})`;
		} else {
			script += `\nlet data = {${data}\n}`;
		}
	}

	let props = 'onsubmit="handleSubmit(event)"';

	if (is_svelte) {
		props = ' on:submit|preventDefault={handleSubmit}';
		script += '\n\nfunction handleSubmit(e) {\n\tconsole.log(data);\n}';
	} else if (is_vue) {
		props = ' @submit.prevent="handleSubmit"';
		script += '\n\nfunction handleSubmit(e) {\n\tconsole.log(data);\n}';
	} else {
		script += HTMLFormScript;
	}

	const classes = styledBy === 'Kazkadien' ? ' class="form alpha"' : '';
	const styles = styledBy === 'Kazkadien' ? ' style="display:grid;gap:2.5rem;"' : '';

	let myForm = `<form id="my-form"${classes} ${props}>
	<div class="field-group" ${styles}>
${code}
${HTMLSubmitButton}
	</div>
</form>`;

	if (script) {
		if (is_vue) {
			script = `<script setup>
import { reactive } from 'vue'

${script}
</script>\n\n`;

			myForm = `<template>
  ${myForm}
</template>
	`;
		} else {
			script = `<script>\n${script}\n</script>\n\n`;
		}
	}

	/** @type {import("../../typings/types").CodeSnippets} */
	const composedCode = {
		template: myForm,
		info: '',
		script: script
	};

	if (add_icons) {
		composedCode.info = icons;
	}

	return composedCode;
}
