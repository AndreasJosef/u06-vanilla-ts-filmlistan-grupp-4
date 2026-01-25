// A generic button component take can take an onClick handler
interface ButtonProps {
  value: string;
  onClick: () => void;
  classes?: string;
}

export function createButton(props: ButtonProps) {
  const { onClick, value, classes } = props;

  const button = document.createElement("button");
  const baseStyles = "px-3 py-1 rounded";

  button.textContent = value;
  classes
    ? (button.className = `${baseStyles} ${classes}`)
    : (button.className = baseStyles);

  button.addEventListener("click", onClick);

  return button;
}
