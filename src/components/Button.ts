// A generic button component take can take an onClick handler
interface ButtonProps {
  value: string;
  onClick: () => void;
}

export function createButton(props: ButtonProps) {
  const { onClick, value } = props;

  const button = document.createElement("button");

  button.textContent = value;
  button.className = "bg-cyan-400 px-3 py-1 rounded";
  button.addEventListener("click", onClick);

  return button;
}
