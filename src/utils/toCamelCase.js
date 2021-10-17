/**
 * @param {string} str
 */
export default function toCamelCase(str) {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+|[^A-Za-z0-9]/g, '');
}
