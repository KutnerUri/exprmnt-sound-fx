import cn from "classnames";
import { modernTheme } from "./components/theme";
import { shadowTheme } from "./theme/shadows";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return <div className={cn(modernTheme(), shadowTheme())}>{children}</div>;
}
