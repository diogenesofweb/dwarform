/** @typedef { import("../typings/types").Field } Field*/
import { derived, writable } from 'svelte/store';
import example from '../data/example';
import { TECH, STYLEDBY } from '../data/constants';
import { generateCode } from '../utils/generateCode';

/** @type {Field[]} */
let arr = example;

export const fields = writable(arr);

export const tech = writable(TECH[0]);

export const styledBy = writable(STYLEDBY[0]);

export const componentize = writable(false);

export const structure = derived(styledBy, ($styledBy) => {
	return $styledBy === 'Kazkadien' ? 'Label>Input' : 'Label+Input';
});

export const snippets = derived([styledBy, fields], ([$styledBy, $fields]) => {
	return generateCode({ form: $fields, tech: 'HTML', styledBy: $styledBy });
});
