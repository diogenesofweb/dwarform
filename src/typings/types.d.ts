export interface Field {
	id: number;
	// type: string;
	type: InputType;
	label: string;
	value: string;

	size: number | null;
	maxlength: number | null;
	minlength: number | null;
	max: string | number | null;
	min: string | number | null;
	step: string | number | null;

	rows: number;
	cols: number;

	// checked: boolean;
	accept: string | null;

	pattern: string | null;
	placeholder: string | null;

	multiple: boolean | null;

	required: boolean | null;
}

export interface Attributes {
	value: boolean;
	placeholder: boolean;

	size: boolean;

	maxlength: boolean;
	minlength: boolean;

	max: boolean;
	min: boolean;
	step: boolean;

	rows?: boolean;
	cols?: boolean;
	// checked?: boolean;
	accept?: boolean;

	pattern: boolean;

	multiple: boolean;

	required: boolean;
}

export interface CodeSnippets {
	template: string;
	script: string;
	info: string;
}

export type MyIcon = 'content_copy' | 'code';

export type InputType =
	| 'select'
	| 'textarea'
	| 'checkbox'
	| 'date'
	| 'email'
	| 'file'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'search'
	| 'text'
	| 'tel'
	| 'url';
