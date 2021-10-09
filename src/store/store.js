/** @typedef { import("../typings/types").Field } Field*/
import { derived, writable } from 'svelte/store';
// import { browser } from '$app/env';
import example from '../data/example';

import { TECH, STYLEDBY } from '../data/constants';
import { generateCode } from '../utils/generateCode';

const init = {
	forms: ['example'],
	name: 'example',
	/** @type {Field[]} */
	fields: example
};

export const forms = writable(init.forms);
export const activeForm = writable(init.name);

export const fields = writable(init.fields);

export const tech = writable(TECH[0]);

export const styledBy = writable(STYLEDBY[0]);

export const componentize = writable(false);

export const structure = derived(styledBy, ($styledBy) => {
	return $styledBy === 'Kazkadien' ? 'Label>Input' : 'Label+Input';
});

export const snippets = derived([styledBy, fields], ([$styledBy, $fields]) => {
	return generateCode({ form: $fields, tech: 'HTML', styledBy: $styledBy });
});
