import { WithChildren } from "./preact.utils.ts";

export function FloatingCard({ children }: WithChildren) {
  return <article className="floating-card">{children}</article>;
}

export function CardHeader({ children }: WithChildren) {
  return <header className="card-header">{children}</header>;
}
export function CardContent({ children }: WithChildren) {
  return <div className="card-content">{children}</div>;
}

export function CardFooter({ children }: WithChildren) {
  return <footer className="card-footer">{children}</footer>;
}
