import ATTRS from '../../data/attrs';
import toCamelCase from '../toCamelCase';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns {{code: string, data: string, arrays: string, add_icons: boolean}}
 */
export function composeBootstrap(fields, { is_svelte = false, is_vue = false }) {
	let code = '';
	let data = '';
	let arrays = '';
	let add_icons = false;

	const is_plus = is_svelte || is_vue;

	fields.forEach((f) => {
		const _label = toCamelCase(f.label);
		const id = 'b-' + Math.random().toString().slice(-4);

		let attributes = '';
		/** @type {string[]} */
		let values = [];

		Object.entries(f).forEach(([key, val]) => {
			if (['checkbox', 'radio', 'select'].includes(f.type) && key == 'value') {
				values = f.value.split(',');
				return;
			}

			if (key == 'value' && is_plus) return;

			if (ATTRS[f.type][key] && val) {
				if (key == 'required') {
					attributes += ' required';
					return;
				}

				if (key == 'multiple') {
					attributes += ' multiple';
					return;
				}

				attributes += ` ${key}="${val}"`;
			}
		});

		if (['checkbox', 'radio'].includes(f.type)) {
			code += `\n<p>${f.label}</p>\n`;

			if (is_plus) {
				let props = '';

				const arr = values.reduce((p, c) => p + `"${c}",`, '');
				arrays += `const ${_label} = [${arr}]\n`;
				data += `\n\t${_label}: ${f.type == 'radio' ? `""` : '[]'},`;

				if (is_svelte) {
					props = `bind:group="{data.${_label}}"`;

					code += `
	{#each ${_label} as val, i}
	<div class="form-check mb-3">
		<input ${props} class="form-check-input" id="{val+i}" type="${f.type}" ${attributes} value="{val}" name="${_label}">
		<label class="form-check-label" for="{val+i}">
			{val}
		</label>
	</div>
	{/each}\n`;
				}

				if (is_vue) {
					props = `v-model="data.${_label}" :value="val"`;

					code += `
	<div v-for="(val, i) in ${_label}" class="form-check mb-3" :key="i">
		<input ${props} class="form-check-input" :id="val+i" type="${f.type}" ${attributes} name="${_label}">
		<label class="form-check-label" :for="val+i">
		{{val}}
		</label>
	</div>\n`;
				}

				return;
			}

			if (f.value) {
				values.forEach((v) => {
					let id = 'b-' + Math.random().toString().slice(-4);

					code += `
	<div class="form-check mb-3">
		<input class="form-check-input" type="${f.type}" ${attributes} name="${_label}" id="${id}">
		<label class="form-check-label" for="${id}">
			${v}
		</label>
	</div>
				`;
				});
			}

			return;
		}

		if (f.type == 'select') {
			if (is_plus) {
				let props = '';
				let options = '';

				const arr = values.reduce((p, c) => p + `"${c}",`, '');
				arrays += `const ${_label} = [${arr}]\n`;
				data += `\n\t${_label}: "",`;

				if (is_svelte) {
					props += `bind:value="{data.${_label}}"`;
					options = `{#each ${_label} as val}
		<option value="{val}">{val}</option>
		{/each}`;
				}

				if (is_vue) {
					props += `v-model="data.${_label}"`;
					options = `<option v-for="(val, i) in ${_label}" :value="val" :key="i">{{val}}</option>`;
				}

				code += `
	<select ${props} class="form-select mb-3"${attributes}>
		<option selected>${f.label}</option>
		${options}
	</select>
`;

				return;
			}

			let options = '';

			if (f.value) {
				values.forEach((v) => (options += `\n\t\t<option value="${v}">${v}</option>`));
			}

			code += `
	<select class="form-select mb-3"${attributes} name="${_label}">
		<option selected>${f.label}</option>${options}
	</select>
    `;
			return;
		}

		let props = '';

		if (is_plus) {
			data += `\n\t${_label}: "${f.value}",`;

			if (is_svelte) props = `bind:value="{data.${_label}}"`;

			if (is_vue) props = `v-model="data.${_label}"`;
		}

		if (f.type == 'range') {
			code += `
	<div class="mb-3">
		<label for="${id}" class="form-label">${f.label}</label>
		<input ${props} type="range"${attributes} class="form-range" id="${id}" name="${_label}">
	</div>
		`;
			return;
		}

		if (f.type == 'textarea') {
			code += `
	<div class="form-floating mb-3">
		<textarea ${props} class="form-control"${attributes} id="${id}" name="${_label}"></textarea>
		<label for="${id}">${f.label}</label>
	</div>
    `;
			return;
		}

		code += `
	<div class="mb-3">
		<label for="${id}" class="form-label">${f.label}</label>
		<input ${props} type="${f.type}" ${attributes} class="form-control" id="${id}" name="${_label}">
	</div>
    `;
	});

	return {
		code,
		data,
		arrays,
		add_icons
	};
}
