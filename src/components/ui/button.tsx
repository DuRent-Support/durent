import * as React from "react";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function cn(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(" ");
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-foreground text-background hover:opacity-90 border border-transparent",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-secondary",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-secondary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
