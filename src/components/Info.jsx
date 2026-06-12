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
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Consumo Responsable
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                {card.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
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