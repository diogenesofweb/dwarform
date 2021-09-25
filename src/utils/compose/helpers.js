export const HTMLFormScript = `
function handleSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target);
  const form = Object.fromEntries(formData);
  console.log(form);
}
`;

export const HTMLSubmitButton = `
<button class="btn classic" type="submit" style="margin: 3rem auto 0" >console.log</button>
`;
