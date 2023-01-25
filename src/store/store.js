/** @typedef { import("../typings/types").Field } Field*/
import { derived, writable } from 'svelte/store';
import example from '../data/example';

import { TECH, STYLEDBY } from '../data/constants';
import { generateCode } from '../utils/generateCode';
import { browser } from '$app/environment';

const init = {
	forms: ['example'],
	name: 'example',
	/** @type {Field[]} */
	fields: example
};

export const forms = writable(init.forms);
export const activeForm = writable(init.name);

export const fields = writable(init.fields);
let _tech = TECH[0];
let _styledBy = STYLEDBY[0];

if (browser) {
	const y = localStorage.getItem('__tech');
	if (y) _tech = y;

	const x = localStorage.getItem('__styledBy');
	if (x) _styledBy = x;
}

export const tech = writable(_tech);
let first = true;
tech.subscribe((val) => {
	console.log(val);
	if (first) {
		first = false;
		return;
	}
	localStorage.setItem('__tech', val);
});

export const styledBy = writable(_styledBy);
let first2 = true;
styledBy.subscribe((val) => {
	console.log(val);
	if (first2) {
		first2 = false;
		return;
	}
	localStorage.setItem('__styledBy', val);
});

export const componentize = writable(false);

export const structure = derived(styledBy, ($styledBy) => {
	return $styledBy === 'Kazkadien' ? 'Label>Input' : 'Label+Input';
});

export const snippets = derived([styledBy, fields], ([$styledBy, $fields]) => {
	return generateCode({ form: $fields, tech: 'HTML', styledBy: $styledBy });
});
