function About() {
  const cards = [
    {
      title: "¿Qué es el consumo responsable?",
      text: "Consumir conscientemente, reducir residuos y elegir productos sostenibles.",
    },

    {
      title: "Objetivo ODS 12",
      text: "Promover hábitos responsables para proteger el medio ambiente.",
    },

    {
      title: "Impacto positivo",
      text: "Cada acción ecológica ayuda a disminuir contaminación y desperdicios.",
    },
  ];

  return (
    <section className="py-2 px-6 bg-[#dddddd]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#4f3724] text-5xl md:text-5x1 lg:text-6xl font-serif leading-tight text-center ">
          Consumo Responsable
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-10 shadow-lg mt-4 inline-block"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                {card.title}
              </h3>

              <p className="mt-8 text-[#5b4a3b] text-lg leading-6 max-w-3xl">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;