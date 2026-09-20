import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padded?: boolean;
};

export function Card({
  children,
  className,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5",
        padded && "p-6 sm:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-wider text-brand-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardTitle({
  children,
  className,
  as: Tag = "h3",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}) {
  return (
    <Tag
      className={cn("mt-2 text-lg font-semibold tracking-tight text-slate-900", className)}
    >
      {children}
    </Tag>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-3 text-sm leading-6 text-slate-600", className)}>
      {children}
    </p>
  );
}
