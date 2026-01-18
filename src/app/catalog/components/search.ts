// Komponent för sökning
export function createInput({
  type,
  name,
  label,
  classes = "",
}: {
  type: string;
  name: string;
  label: string;
  classes?: string;
}) {
  // Create
  const inputContainer = document.createElement("fieldset");
  inputContainer.className = classes;

  // Template
  inputContainer.innerHTML = `
    <legend>${label}</legend>
    <input type="${type}" name="${name}" id="${name}">
  `;

  return inputContainer;
}

