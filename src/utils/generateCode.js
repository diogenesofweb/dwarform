import { composer } from './compose/composer';

/** @typedef { import("../typings/types").Field } Field*/

/**
 * @param {{form: Field[], tech: string, styledBy: string}} params
 * @returns {import("../typings/types").CodeSnippets}
 */
export function generateCode({ form, tech, styledBy }) {
	/** @type {import("../typings/types").CodeSnippets} */
	let code;
	// let code = {
	// 	template: 'Not implemented :(',
	// 	info: '',
	// 	script: ''
	// };

	code = composer(form, tech, styledBy);

	return code;
}
