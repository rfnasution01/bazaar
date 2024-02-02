import { StyleProps } from "../props";

export function Nav({ style, className, children }: StyleProps) {
  return (
    <nav className={className} style={{ ...style }}>
      {children}
    </nav>
  );
}
