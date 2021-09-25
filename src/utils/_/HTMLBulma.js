import ATTRS from '../../data/attrs';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns string
 */
export function composeHTMLBulma(fields) {
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
			let boxes = '';

			if (f.value) {
				values.forEach((v) => {
					boxes += `
      <label class="${f.type}">
        <input type="${f.type}" value="${v}" ${attributes} name="${name}"/>
        <span>${v}</span>
      </label>
        `;
				});
			}

			code += `
  <p><b>${f.label}</b></p>
  <div class="field">
    <div class="control">
      ${boxes}
    </div>
  </div>
    `;

			return;
		}

		if (f.type == 'range') {
			code += `
	<div class="field">
		<label for="${id}" class="label">${f.label}</label>
		<input  class="input"  type="range"${attributes} id="${id}">
	</div>
		`;

			return;
		}

		if (f.type == 'textarea') {
			code += `
	<div class="field">
    <label for="${id}" class="label">${f.label}</label>
    <div class="control">
      <textarea class="textarea"${attributes} id="${id}"></textarea>
    </div>
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
  <div class="field">
		<label for="${id}" class="label">${f.label}</label>
    <div class="control">
      <div class="select">
        <select ${attributes} id="${id}">
          <option value="" selected>Select Me</option>${options}
        </select>
      </div>
	  </div>
	</div>
    `;

			return;
		}

		if (f.type == 'file') {
			code += `
  <p><b>${f.label}</b></p>
  <div class="file">
    <label class="file-label">
      <input class="file-input" type="file" name="" ${attributes}>
      <span class="file-cta">
        <span class="file-label">
          Choose a file…
        </span>
      </span>
    </label>
  </div>
    `;

			return;
		}

		code += `
	<div class="field">
		<label for="${id}" class="label">${f.label}</label>
    <div class="control">
		  <input class="input" type="${f.type}" ${attributes} id="${id}">
	  </div>
	</div>
    `;
	});

	let final = '<form id="bulma">' + code + '\n</form>';

	/** @type {import("../../typings/types").CodeSnippets} */
	const composedCode = {
		template: final,
		info: '',
		script: ''
	};

	return composedCode;
}
