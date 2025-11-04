import React from "react";
import dojoImage from "../../../public/img/distintivo1.jpg";
import senseiImage from "../../../public/img/sensei1.jpg"; // 📸 cambiá la imagen si querés
import { Button } from "../ui/Button/Button";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col">
      {/* Hero/Header */}
      <header className="relative flex flex-col md:flex-row items-center justify-between bg-gray-50 min-h-[85vh] overflow-hidden">
        {/* Imagen lateral */}
        <div className="md:w-1/2 w-full h-72 md:h-full">
          <img
            src={dojoImage}
            alt="Escuela Kaizenkan"
            className="w-full h-full object-cover brightness-90"
          />
        </div>

        {/* Texto principal */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escuela <span className="text-red-600">Kaizenkan</span>
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            👉 Perfil Oficial de la Escuela Kaizenkan
            <br />
            🥋 <strong>Karate Do Shorin Ryu</strong>
            <br />
            ⛩ Formamos personas a través del arte marcial, promoviendo
            disciplina, respeto y perseverancia. Cada clase es una oportunidad
            para mejorar cuerpo, mente y espíritu.
          </p>

          <div className="bg-white/60 border border-gray-200 shadow-sm rounded-xl p-4 mb-6 text-sm text-gray-600">
            📍 <strong>Castro Barros 723</strong>, Córdoba, Argentina (5000)
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            <Button variant="primary" onClick={() => navigate("/login")}>
              Ingresar al Dojo
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                window.scrollTo({
                  top: 800,
                  behavior: "smooth",
                })
              }
            >
              Conocer más
            </Button>
          </div>
        </div>
      </header>

      {/* Sección “Sobre la Escuela” */}
      <section
        id="about"
        className="flex flex-col md:flex-row items-center justify-center gap-10 py-20 px-6 md:px-20 bg-white"
      >
        {/* Imagen del sensei o dojo */}
        <div className="md:w-1/2 w-full">
          <img
            src={senseiImage}
            alt="Sensei en entrenamiento"
            className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-[450px]"
          />
        </div>

        {/* Texto informativo */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre la Escuela
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            El <strong>ICHINEN DOJO </strong>nace en 1997,en la ciudad de Rio Tercero, Córdoba - Argentina y su nombre es un término budista, que aunque tiene varios significados parecidos, nosotros tomamos la idea de que  
            <strong> ICHINEN </strong> significa un "instante".  
            A través del entrenamiento constante, buscamos fortalecer tanto el
            cuerpo como la mente, cultivando el respeto, la humildad y la
            superación personal.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            <li>🥋 Enfoque en la técnica y el espíritu del Karate.</li>
            <li>🌸 Clases para niños, adolescentes y adultos.</li>
            <li>💪 Formación integral basada en valores y disciplina.</li>
          </ul>

          <Button
            variant="primary"
            className="mt-2"
            onClick={() => navigate("/contacto")}
          >
            Contactar la Escuela
          </Button>
        </div>
      </section>
    </main>
  );
};
