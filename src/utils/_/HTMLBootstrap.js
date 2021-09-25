import ATTRS from '../../data/attrs';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns string
 */
export function composeHTMLBootstrap(fields) {
	let code = '';

	fields.forEach((f) => {
		let id = 'b-' + Math.random().toString().slice(-4);
		let attributes = '';
		let values = [];

		Object.entries(f).forEach(([key, val]) => {
			if (['checkbox', 'radio', 'select'].includes(f.type) && key == 'value') {
				values = f.value.split(',');
				return;
			}
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
			let name = f.label.replace(' ', '_').toLocaleLowerCase();
			code += `\n\n\t\t<p>${f.label}</p>\n`;

			if (f.value) {
				values.forEach((v) => {
					let id = 'b-' + Math.random().toString().slice(-4);

					code += `
	<div class="form-check mb-3">
		<input class="form-check-input" type="${f.type}"${attributes} name="${name}" id="${id}">
		<label class="form-check-label" for="${id}">
			${v}
		</label>
	</div>
				`;
				});
			}

			return;
		}

		if (f.type == 'range') {
			code += `
	<div class="mb-3">
		<label for="${id}" class="form-label">${f.label}</label>
		<input type="range"${attributes} class="form-range" id="${id}">
	</div>
		`;

			return;
		}

		if (f.type == 'textarea') {
			code += `
	<div class="form-floating mb-3">
		<textarea class="form-control"${attributes} id="${id}"></textarea>
		<label for="${id}">${f.label}</label>
	</div>
    `;

			return;
		}

		if (f.type == 'select') {
			let options = '';

			if (f.value) {
				values.forEach((v) => (options += `\n\t\t\t<option value="${v}">${v}</option>`));
			}

			code += `
	<select class="form-select mb-3"${attributes}>
		<option selected>${f.label}</option>${options}
	</select>
    `;
			return;
		}

		code += `
	<div class="mb-3">
		<label for="${id}" class="form-label">${f.label}</label>
		<input type="${f.type}" ${attributes} class="form-control" id="${id}">
	</div>
    `;
	});

	let final = '<form id="bootstrap">' + code + '\n</form>';

	/** @type {import("../../typings/types").CodeSnippets} */
	const composedCode = {
		template: final,
		info: '',
		script: ''
	};

	return composedCode;
}
