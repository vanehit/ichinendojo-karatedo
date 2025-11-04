import clsx from "clsx";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const base =
    "px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md focus:ring-2 focus:ring-offset-2";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    // 🎯 Estilo principal (rojo dojo)
    primary:
      "bg-red-700 hover:bg-red-800 text-white focus:ring-red-500",

    // 🥋 Estilo secundario (negro elegante)
    secondary:
      "bg-gray-900 hover:bg-gray-800 text-yellow-400 border border-yellow-500 focus:ring-yellow-400",

    // ⚠️ Estilo peligro (usado para logout, eliminar, etc.)
    danger:
      "bg-yellow-600 hover:bg-yellow-700 text-gray-900 focus:ring-yellow-400",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
