import React from "react";
import clsx from "clsx";

export interface CardProps {
  photo?: string;
  title: string;
  subtitle?: string;
  belt?: string;
  description?: string;
  variant?: "default" | "sensei" | "alumno";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  photo,
  title,
  subtitle,
  belt,
  description,
  variant = "default",
  className,
}) => {
  const baseStyle =
    "max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl";

  const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
    default: "border-t-4 border-gray-300",
    sensei: "border-t-4 border-red-600",
    alumno: "border-t-4 border-blue-600",
  };

  return (
    <div className={clsx(baseStyle, variantStyles[variant], className)}>
      {photo && (
        <div className="h-56 w-full overflow-hidden">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 italic mt-1">{subtitle}</p>
        )}
        {belt && (
          <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {belt}
          </span>
        )}
        {description && (
          <p className="mt-3 text-gray-700 text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
