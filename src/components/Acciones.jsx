function Actions() {
  const actions = [
    {
      title: "Usa bolsas reutilizables",
      image: "src/assets/1.jpg",
    },
    {
      title: "Evita desperdiciar comida",
      image: "src/assets/2.jpg",
    },
    {
      title: "Recicla correctamente",
      image: "src/assets/3.jpg",
    },
    {
      title: "Ahorra agua y energía",
      image: "src/assets/4.jpg",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-[#f8f8f5]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16">
          ¿Qué puedes hacer tú?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {actions.map((action, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex md:block"
            >
              {/* Imagen */}
              <div className="w-28 h-28 md:w-full md:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-full md:h-72 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Texto */}
              <div className="p-4 md:p-8 flex items-center md:block">
                <h3 className="text-lg md:text-2xl font-semibold">
                  {action.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Actions;