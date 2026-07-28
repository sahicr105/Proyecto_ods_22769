import { Link } from "react-router-dom";

function Principal() {
  return (
    <section id="inicio">
      <div className="bg-[#dddddd] px-6 pt-24 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* ¿Qué es el consumo responsable? */}
          <section className="bg-[#f6f5ef] border-l-6 border-[#c7a06a] p-8 md:p-14 shadow-sm">
            <h1 className="text-[#4f3724] text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              ¿Qué es el consumo responsable?
            </h1>

            <p className="mt-8 text-[#5b4a3b] text-lg leading-9 max-w-3xl">
              Es una forma de consumir de manera consciente, reduciendo
              residuos, reutilizando productos y eligiendo opciones más
              sostenibles.
            </p>

            <p className="mt-10 text-[#5b4a3b] text-lg leading-9 max-w-3xl">
              El ODS 12 promueve hábitos responsables para disminuir la
              contaminación y proteger el medio ambiente.
            </p>
          </section>

          {/* Plataforma */}
          <section className="bg-[#f6f5ef] border-l-6 border-[#d6b27a] p-8 md:p-14 shadow-sm flex flex-col justify-center">
            <h2 className="text-[#4f3724] text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Plataforma de Consumo Responsable
            </h2>

            <p className="mt-8 text-[#5b4a3b] text-lg leading-8 max-w-2xl">
              Registra tus acciones sostenibles, reduce tu impacto ambiental y
              contribuye a un futuro más responsable.
            </p>

            <Link to="/login" className="self-start mt-4 inline-block">
              <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2">
                Iniciar Sesión
              </button>
            </Link>
          </section>

        </div>
      </div>
    </section>
  );
}

export default Principal;