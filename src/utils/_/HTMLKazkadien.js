import ATTRS from '../../data/attrs';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns string
 */
export function composeHTMLKazkadien(fields) {
	let code = '';

	fields.forEach((f) => {
		let attributes = '';
		/** @type {string[]} */
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
			let boxes = '';

			if (f.value) {
				values.forEach((v) => {
					boxes += `
        <label class="box-field-entry">
          <input type="${f.type}" value="${v}" ${attributes}/>
          <div class="box-field-entry-mark">${v}</div>
        </label>
        `;
				});
			}

			code += `
    <div class="box-field">
      <div class="box-field-title">${f.label}</div>
      <div class="box-field-entries rows">
        ${boxes}
      </div>
    </div>
    `;

			return;
		}

		if (f.type == 'textarea') {
			code += `
    <label class="field">
      <span>${f.label}</span>
      <textarea ${attributes}></textarea>
    </label>
    `;

			return;
		}

		if (f.type == 'select') {
			let options = '';

			if (f.value) {
				values.forEach((v) => (options += `\n\t\t\t\t<option value="${v}">${v}</option>`));
			}

			code += `
    <label class="field">
      <div class="field-title">${f.label}</div>
      <select${attributes}>
        <option value=""></option>${options}
      </select>
    </label>
    `;

			return;
		}

		code += `
    <label class="field">
      <div class="field-title">${f.label}</div>
      <input type="${f.type}"${attributes}/>
    </label>
    `;
	});

	let final = '<form class="form">\n\t<div class="field-group">' + code + '\n\t</div>\n</form>';

	/** @type {import("../../typings/types").CodeSnippets} */
	const composedCode = {
		template: final,
		info: '',
		script: ''
	};

	return composedCode;
}
