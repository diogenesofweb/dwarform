import ATTRS from '../../data/attrs';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns {{code: string, data: string, arrays: string, add_icons: boolean}}
 */
export function composeSvelteComponentized(fields) {
	let add_icons = false;
	let code = '';
	let data = '';
	let vars = '';
	let arrays = '// import { Field, BoxField, BoxFieldEntry } from "@kazkadien/svelte";\n';

	fields.forEach((f) => {
		const _label = f.label.toLocaleLowerCase().replaceAll(/[^a-z]/g, '_');
		let attributes = '';
		/** @type {string[]} */
		let values = [];

		Object.entries(f).forEach(([key, val]) => {
			if (['checkbox', 'radio', 'select'].includes(f.type) && key == 'value') {
				values = f.value.split(',');
				return;
			}

			if (key == 'value') return;
			// console.log(key, val);
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
			const arr = values.reduce((p, c) => p + `"${c}",`, '');
			arrays += `const __${_label} = [${arr}];\n`;

			// data += `\n\t${_label}: ${f.type == 'radio' ? `""` : '[]'},`;
			data += `\n\t${_label},`;
			vars += `let ${_label} = ${f.type == 'radio' ? `""` : '[]'};\n`;

			let boxes = `{#each  __${_label} as val}
		<BoxFieldEntry label="{val}">
			<input type="${f.type}" ${attributes} bind:group="{${_label}}" value="{val}" />
		</BoxFieldEntry>
		{/each}`;

			code += `
	<BoxField label="${f.label}">
		${boxes}
	</BoxField>
`;

			return;
		}

		if (f.type == 'select') {
			const arr = values.reduce((p, c) => p + `"${c}",`, '');
			arrays += `const __${_label} = [${arr}];\n`;

			// data += `\n\t${_label}: "",`;
			data += `\n\t${_label},`;
			vars += `let ${_label}= "";\n`;

			const options = `
			{#each __${_label} as val}
			<option value="{val}">{val}</option>
			{/each}`;

			code += `
	<Field label="${f.label}">
		<select bind:value="{${_label}}" ${attributes}>
			<option value=""></option>${options}
		</select>
	</Field>
`;

			return;
		}

		if (f.type == 'textarea') {
			// data += `\n\t${_label}: "${f.value}",`;
			data += `\n\t${_label},`;
			vars += `let ${_label}= "${f.value}";\n`;
			code += `
	<Field label="${f.label}">
		<textarea bind:value="{${_label}}" ${attributes}/>
	</Field>
`;

			return;
		}

		// data += `\n\t${_label}: "${f.value}",`;
		data += `\n\t${_label},`;
		vars += `let ${_label}= "${f.value}";\n`;
		code += `
	<Field label="${f.label}">
		<input bind:value="{${_label}}" type="${f.type}" ${attributes}/>
	</Field>
`;
	});

	return {
		code,
		data,
		arrays: arrays + vars,
		add_icons
	};
}
