import ATTRS from '../../data/attrs';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns string
 */
export function composeHTMLKazkadien(fields) {
	const checkIcon = `<div class="icon-holder"><svg viewBox="0 0 24 24"><use href="#check"></use></svg></div>`;
	const circleIcon = `<div class="icon-holder round"><svg viewBox="0 0 24 24"><use href="#circle"></use></svg></div>`;

	let add_icons = false;
	let code = '';

	fields.forEach((f) => {
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
			add_icons = true;
			const icon = f.type === 'radio' ? circleIcon : checkIcon;
			let boxes = '';

			if (f.value) {
				values.forEach((v) => {
					boxes += `
        <label class="box-field-entry">
          <input type="${f.type}" value="${v}" ${attributes}/>
          ${icon}
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

	if (add_icons) {
		composedCode.info = `

<-- Icons for checkbox & radio -->
<svg id="all-icons" style="display: none">
  <symbol id="check">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </symbol>

  <symbol id="circle">
    <circle cx="12" cy="12" r="8" />
  </symbol>
</svg>
    `;
	}

	return composedCode;
}
