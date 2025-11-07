import React from "react";

interface ClassCardProps {
  topic: string;
  date: string;
  description?: string;
  studentCount: number;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  topic,
  date,
  description,
  studentCount,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white flex flex-col gap-2 hover:shadow-md transition">
      <h3 className="text-lg font-bold text-gray-800">{topic}</h3>
      <p className="text-sm text-gray-500">{formattedDate}</p>
      {description && <p className="text-gray-700 text-sm">{description}</p>}
      <p className="text-sm text-gray-600">
        👥 {studentCount} estudiante{studentCount !== 1 && "s"}
      </p>
      <button className="self-end text-sm text-blue-600 hover:underline">
        Ver detalle →
      </button>
    </div>
  );
};
