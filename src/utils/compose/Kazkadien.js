import ATTRS from '../../data/attrs';
import toCamelCase from '../toCamelCase';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns {{code: string, data: string, arrays: string, add_icons: boolean}}
 */
export function composeKazkadien(fields, { is_svelte = false, is_vue = false }) {
	let code = '';
	let data = '';
	let arrays = '';
	let add_icons = false;

	const is_plus = is_svelte || is_vue;

	fields.forEach((f) => {
		const _label = toCamelCase(f.label);

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
			if (!add_icons) add_icons = true;
			// const icon = f.type === 'radio' ? circleIcon : checkIcon;

			if (is_plus) {
				const arr = values.reduce((p, c) => p + `"${c}",`, '');
				arrays += `const ${_label} = [${arr}]\n`;
				data += `\n\t${_label}: ${f.type == 'radio' ? `""` : '[]'},`;

				let props = '';
				let boxes = '';

				if (is_svelte) {
					props = `bind:group="{data.${_label}}"`;

					boxes = `{#each ${_label} as val, i}
				<label>
					<input ${props} type="${f.type}" value="{val}" ${attributes} name="${_label}"/>
					<div class="boxlabel">{val}</div>
				</label>
				{/each}`;
				}

				if (is_vue) {
					props = `v-model="data.${_label}"`;

					boxes = `<label v-for="(val, i) in ${_label}" :key="i">
					<input ${props} type="${f.type}" :value="val" ${attributes} name="${_label}"/>
					<div class="boxlabel">{{val}}</div>
				</label>`;
				}

				code += `
    <div class="field">
      <b>${f.label}</b>
      <div class="boxfields rows">
        ${boxes}
      </div>
    </div>
    `;
				return;
			}

			let boxes = '';

			if (f.value) {
				values.forEach((v) => {
					boxes += `
        <label class="boxfield">
          <input type="${f.type}" value="${v}" ${attributes} name="${_label}"/>
          <div class="boxlabel">${v}</div>
        </label>
        `;
				});
			}

			code += `
    <div class="field">
      <b>${f.label}</b>
      <div class="boxfields rows">
        ${boxes}
      </div>
    </div>
    `;

			return;
		}

		if (f.type == 'select') {
			if (is_plus) {
				const arr = values.reduce((p, c) => p + `"${c}",`, '');
				arrays += `const ${_label} = [${arr}]\n`;
				data += `\n\t${_label}: "",`;

				let props = '';
				let options = '';

				if (is_svelte) {
					props = `bind:value="{data.${_label}}"`;
					options = `
				{#each ${_label} as val}
				<option value="{val}">{val}</option>
				{/each}`;
				}

				if (is_vue) {
					props = `v-model="data.${_label}"`;
					options = `<option v-for="(val, i) in ${_label}" :value="val" :key="i">{{val}}</option>`;
				}

				code += `
		<label class="field">
			<b>${f.label}</b>
			<select ${props} ${attributes}>
				<option value="" selected></option>${options}
			</select>
		</label>
		`;
				return;
			}

			let options = '';

			if (f.value) {
				values.forEach((v) => (options += `\n\t\t\t\t<option value="${v}">${v}</option>`));
			}

			code += `
    <label class="field">
      <b>${f.label}</b>
      <select${attributes} name="${_label}">
        <option value=""></option>${options}
      </select>
    </label>
    `;

			return;
		}

		let props = '';
		if (is_plus) {
			data += `\n\t${_label}: "${f.value}",`;

			if (is_svelte) props = `bind:value="{data.${_label}}"`;

			if (is_vue) props = `v-model="data.${_label}"`;
		}

		if (f.type == 'textarea') {
			code += `
    <label class="field">
      <b>${f.label}</b>
      <textarea ${props} ${attributes} name="${_label}"></textarea>
    </label>
    `;

			return;
		}

		code += `
    <label class="field">
      <b>${f.label}</b>
      <input ${props} type="${f.type}"${attributes} name="${_label}"/>
    </label>
    `;
	});

	return {
		code,
		data,
		arrays,
		add_icons
	};
}
