import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";

function Actions() {
  const actions = [
    {
      title: "Usa bolsas reutilizables",
      image: img1,
    },
    {
      title: "Evita desperdiciar comida",
      image: img2,
    },
    {
      title: "Recicla correctamente",
      image: img3,
    },
    {
      title: "Ahorra agua y energía",
      image: img4,
    },
  ];

  return (
    <section className="py-12 md:py-12 px-6 md:px-6 bg-[#dddddd]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#4f3724] text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-center mb-8">
          ¿Qué puedes hacer tú?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {actions.map((action, index) => (
            <div
              key={index}
              className="group bg-white overflow-hidden shadow-lg flex md:block"
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