// Komponent för sökning
// NOTE: Should capture Search term in state as well so that I can be displayed in browse result view
export interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
}

export function createInput(props: InputProps) {
  const { type, name } = props;
  const placeholder = props.placeholder || "";

  const inputContainer = document.createElement("input");
  inputContainer.type = type;
  inputContainer.name = name;
  inputContainer.id = name;
  inputContainer.className = "w-full bg-zinc-400 rounded py-1 px-2 my-6";
  inputContainer.placeholder = placeholder;

  return inputContainer;
}
