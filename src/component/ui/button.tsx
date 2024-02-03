import { StyleProps } from "../props";

interface ButtonProps extends StyleProps {
  disabled: boolean | undefined;
  onClick: () => void;
}

export function Button({
  disabled,
  onClick,
  style,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={className}
      style={{ ...style }}
    >
      {children}
    </button>
  );
}
