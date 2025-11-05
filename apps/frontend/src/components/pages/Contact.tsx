import React, { useState } from "react";

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar el mensaje.");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2">
          Contacto - Escuela Kaizenkan
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          ICHINEN DOJO KARATEDO
        </h2>

        <div className="space-y-2 text-gray-700 text-center mb-6">
          <p>📍 <strong>Castro Barros 723</strong>, Córdoba, Argentina (5000)</p>
          <p>📞 +54 9 351 555-1234</p>
          <p>📧 ichinendojo@gmail.com</p>
          <p>
            🌐{" "}
            <a
              href="https://instagram.com/karatedokaizenkan_oficial"
              target="_blank"
              rel="noreferrer"
              className="text-red-600 hover:underline"
            >
              @karatedokaizenkan_oficial
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <textarea
            name="message"
            placeholder="Tu mensaje"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`w-full px-6 py-3 rounded-lg text-white transition 
              ${status === "sending" ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {/* Mensajes de estado */}
          {status === "success" && (
            <p className="text-green-600 text-center mt-2">✅ ¡Mensaje enviado con éxito!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center mt-2">❌ Ocurrió un error. Inténtalo de nuevo.</p>
          )}
        </form>
      </div>
    </main>
  );
};
