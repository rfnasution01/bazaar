import { StyleProps } from "../props";

export function H1({ style, className, children }: StyleProps) {
  return (
    <h1
      className={className}
      style={{
        fontFamily: "serif",
        fontSize: "30px",
        letterSpacing: "1px",
        fontWeight: 700,
        color: "black",
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

export function H2({ style, className, children }: StyleProps) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: "serif",
        fontSize: "24px",
        letterSpacing: "1px",
        fontWeight: 600,
        // color: "black",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function H3({ style, className, children }: StyleProps) {
  return (
    <h3
      className={className}
      style={{
        fontFamily: "serif",
        fontSize: "20px",
        letterSpacing: "1px",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

export function H4({ style, className, children }: StyleProps) {
  return (
    <h4
      className={className}
      style={{
        fontFamily: "serif",
        fontSize: "18px",
        letterSpacing: "1px",
        fontWeight: 400,
        color: "black",
        ...style,
      }}
    >
      {children}
    </h4>
  );
}

export function H5({ style, className, children }: StyleProps) {
  return (
    <h5
      className={className}
      style={{
        fontFamily: "serif",
        fontSize: "16px",
        letterSpacing: "1px",
        fontWeight: 300,
        color: "black",
        ...style,
      }}
    >
      {children}
    </h5>
  );
}

export function H6({ style, className, children }: StyleProps) {
  return (
    <h6
      className={className}
      style={{
        fontFamily: "serif",
        fontSize: "12px",
        letterSpacing: "1px",
        fontWeight: 300,
        color: "black",
        ...style,
      }}
    >
      {children}
    </h6>
  );
}
