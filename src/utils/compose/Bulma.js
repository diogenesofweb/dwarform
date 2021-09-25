import ATTRS from '../../data/attrs';

/**
 * @param {import("../../typings/types").Field[]} fields
 * @returns {{code: string, data: string, arrays: string, add_icons: boolean}}
 */
export function composeBulma(fields, { is_svelte = false, is_vue = false }) {
	let code = '';
	let data = '';
	let arrays = '';
	let add_icons = false;

	const is_plus = is_svelte || is_vue;

	fields.forEach((f) => {
		const _label = f.label.toLocaleLowerCase().replaceAll(/[^a-z]/g, '_');
		let id = 'b-' + Math.random().toString().slice(-4);

		let attributes = '';
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
			if (is_plus) {
				let props = '';

				const arr = values.reduce((p, c) => p + `"${c}",`, '');
				arrays += `const ${_label} = [${arr}]\n`;
				data += `\n\t${_label}: ${f.type == 'radio' ? `""` : '[]'},`;

				let boxes = '';

				if (is_svelte) {
					props = `bind:group="{data.${_label}}"`;

					boxes = `{#each ${_label} as val, i}
		<label class="${f.type}">
			<input ${props} type="${f.type}" value="{val}" ${attributes} name="${_label}"/>
			<span>{val}</span>
			</label>
		{/each}`;
				}

				if (is_vue) {
					props = `v-model="data.${_label}"`;

					boxes = `<label v-for="(val, i) in ${_label}" :key="i"  class="${f.type}">
			<input ${props} :value="val" type="${f.type}" ${attributes} name="${_label}"/>
			<span>{{val}}</span>
			</label>`;
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

			let boxes = '';

			if (f.value) {
				values.forEach((v) => {
					boxes += `
      <label class="${f.type}">
        <input type="${f.type}" value="${v}" ${attributes} name="${_label}"/>
        <span>${v}</span>
      </label>
        `;
				});
			}

			code += `
  <p><b>${f.label}!</b></p>
  <div class="field">
    <div class="control">
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
  <div class="field">
    <label for="${id}" class="label">${f.label}</label>
    <div class="control">
      <div class="select">
        <select ${props} ${attributes} id="${id}">
          <option disabled>Select Me!</option>
					${options}
        </select>
      </div>
    </div>
  </div>
    `;

				return;
			}

			let options = '';

			if (f.value) {
				values.forEach((v) => (options += `\n\t\t\t<option value="${v}">${v}</option>`));
			}

			code += `
  <div class="field">
		<label for="${id}" class="label">${f.label}</label>
    <div class="control">
      <div class="select">
        <select ${attributes} id="${id}" name="${_label}">
          <option value="" selected>Select Me!</option>${options}
        </select>
      </div>
	  </div>
	</div>
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
	<div class="field">
		<label for="${id}" class="label">${f.label}</label>
		<input ${props} class="" type="range"${attributes} id="${id}" name="${_label}">
	</div>
		`;
			return;
		}

		if (f.type == 'textarea') {
			code += `
	<div class="field">
    <label for="${id}" class="label">${f.label}</label>
    <div class="control">
      <textarea ${props} class="textarea"${attributes} id="${id}" name="${_label}"></textarea>
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
      <input ${props} class="file-input" type="file" ${attributes} name="${_label}">
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
		  <input ${props} class="input" type="${f.type}" ${attributes} id="${id}" name="${_label}">
	  </div>
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
