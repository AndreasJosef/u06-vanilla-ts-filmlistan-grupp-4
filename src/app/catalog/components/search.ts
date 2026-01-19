// Komponent för sökning
// NOTE: Should capture Search term in state as well so that I can be displayed in browse result view
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
    <legend class="hidden">${label}</legend>
    <input 
      type="${type}" 
      name="${name}" 
      id="${name}" 
      class="w-full bg-zinc-600 rounded py-1 px-2 my-6"
      placeholder="Search Movie">
  `;

  return inputContainer;
}
