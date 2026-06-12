function Cuadros() {
  return (
    /*6*/
    <div className="min-h-screen bg-[#dddddd] px-2 py-24 md:px-10 lg:px-16">
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="bg-[#f6f5ef] border-l-4 border-[#c7a06a] p-8 md:p-14 shadow-sm">
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

        {/* RIGHT CARD */}
        <section className="bg-[#f6f5ef] border-l-4 border-[#d6b27a] p-8 md:p-14 shadow-sm flex flex-col justify-center">
          <h2 className="text-[#4f3724] text-4xl md:text-5xl font-serif leading-tight max-w-xl">
            Plataforma de Consumo Responsable
          </h2>

          <p className="mt-8 text-[#5b4a3b] text-lg leading-8 max-w-2xl">
            Registra tus acciones sostenibles, reduce tu impacto ambiental y
            contribuye a un futuro más responsable.
          </p>

          <button className="mt-10 w-fit bg-[#6e9f43] hover:bg-[#5d8837] transition-all duration-300 text-white font-semibold px-8 py-4">
            Iniciar sesión
          </button>
        </section>
      </div>

      {}
      <section className="mt-10 bg-[#f6f5ef] border-4 border-[#d2d2d2] py-16 px-6 md:px-10">
        <div className="text-center">
          <h2 className="text-[#4f3724] text-4xl md:text-6xl font-serif">
            Impacto Comunitario
          </h2>

          <div className="mt-4 text-[#6b5a4a] text-sm md:text-base leading-6">
            <p>Actualizado: 08 Jun 2026</p>
            <p>Desde: 23/03/2026</p>
          </div>
        </div>

        {}
        <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          <Stat number="51" label="Bolsas reutilizadas" />
          <Stat number="32" label="Botellas recicladas" />
          <Stat number="19" label="Reducción de residuos" />
          <Stat number="4" label="Usuarios apoyando" />
        </div>
      </section>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <h3 className="text-[#5f973d] text-5xl md:text-7xl font-bold font-serif">
        {number}
      </h3>

      <p className="mt-3 text-[#4f3724] text-lg md:text-2xl font-serif">
        {label}
      </p>
    </div>
  );
}
export default Cuadros;