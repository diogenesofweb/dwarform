/** @typedef { import("../typings/types").Attributes } Attributes*/

/** @type {Attributes} */
const select = {
	value: false,
	placeholder: false,
	size: true,
	maxlength: false,
	minlength: false,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: false,
	multiple: true,
	required: true
};

/** @type {Attributes} */
const textarea = {
	value: false,
	placeholder: true,
	size: false,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: true,
	cols: true,
	pattern: false,
	multiple: false,
	required: true
};

/** @type {Attributes} */
const checkbox = {
	value: true,
	placeholder: false,
	size: false,
	maxlength: false,
	minlength: false,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	// checked: true,
	pattern: false,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const date = {
	value: true,
	placeholder: false,
	size: false,
	maxlength: false,
	minlength: false,
	max: true,
	min: true,
	step: true,
	rows: false,
	cols: false,
	pattern: false,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const email = {
	value: true,
	placeholder: true,
	size: true,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: true,
	multiple: true,
	required: true
};
/** @type {Attributes} */
const file = {
	value: false,
	placeholder: false,
	size: false,
	maxlength: false,
	minlength: false,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: false,
	multiple: true,
	required: true,
	accept: true
};
/** @type {Attributes} */
const number = {
	value: true,
	placeholder: true,
	size: false,
	maxlength: false,
	minlength: false,
	max: true,
	min: true,
	step: true,
	rows: false,
	cols: false,
	pattern: false,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const password = {
	value: true,
	placeholder: true,
	size: true,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: true,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const radio = {
	value: true,
	placeholder: false,
	size: false,
	maxlength: false,
	minlength: false,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	// checked: true,
	pattern: false,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const range = {
	value: true,
	placeholder: false,
	size: false,
	maxlength: false,
	minlength: false,
	max: true,
	min: true,
	step: true,
	rows: false,
	cols: false,
	pattern: false,
	multiple: false,
	required: false
};
/** @type {Attributes} */
const search = {
	value: true,
	placeholder: true,
	size: true,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: true,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const tel = {
	value: true,
	placeholder: true,
	size: true,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: true,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const text = {
	value: true,
	placeholder: true,
	size: true,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: true,
	multiple: false,
	required: true
};
/** @type {Attributes} */
const url = {
	value: true,
	placeholder: true,
	size: true,
	maxlength: true,
	minlength: true,
	max: false,
	min: false,
	step: false,
	rows: false,
	cols: false,
	pattern: true,
	multiple: false,
	required: true
};

export default {
	select,
	textarea,
	checkbox,
	date,
	email,
	file,
	number,
	password,
	radio,
	range,
	search,
	text,
	tel,
	url
};
