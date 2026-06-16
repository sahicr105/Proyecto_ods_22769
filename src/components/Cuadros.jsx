import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Cuadros() {
  const [impacto, setImpacto] = useState({
    bolsas: 0,
    botellas: 0,
    desperdicios: 0,
    usuarios: 0,
  });
  
  useEffect(() => {
    const obtenerImpacto = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "usuarios")
        );

        let bolsas = 0;
        let botellas = 0;
        let desperdicios = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          bolsas += data.bolsas || 0;
          botellas += data.botellas || 0;
          desperdicios += data.desperdicios || 0;
        });

        setImpacto({
          bolsas,
          botellas,
          desperdicios,
          usuarios: querySnapshot.size,
        });
        
      } catch (error) {
        console.error(error);
      }
    };

    obtenerImpacto();
  }, []);

  return (
    /*6*/
    <div className="min-h-screen bg-[#dddddd] px-6 pt-24 md:px-10 lg:px-16">
      
      
      <div className="grid grid-cols- gap-6 lg:grid-cols-2">
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

        {/* RIGHT CARD */}
        <section className="bg-[#f6f5ef] border-l-6 border-[#d6b27a] p-8 md:p-14 shadow-sm flex flex-col justify-center">
          <h2 className="text-[#4f3724] text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Plataforma de Consumo Responsable
          </h2>

          <p className="mt-8 text-[#5b4a3b] text-lg leading-8 max-w-2xl">
            Registra tus acciones sostenibles, reduce tu impacto ambiental y
            contribuye a un futuro más responsable.
          </p>

            <Link to="/login"  className="self-start mt-4 inline-block">
              <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 position:right">
                Iniciar Sesión
              </button>
            </Link>
          
        </section>
      </div>

      <section className="mt-10 bg-[#f6f5ef] border-4 border-[#d2d2d2] py-16 px-6 md:px-10">
        <div className="text-center">
          <h2 className="text-[#4f3724] text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Impacto Comunitario
          </h2>

          <div className="mt-4 text-[#6b5a4a] text-sm md:text-base leading-6">
            <p>Actualizado: X</p>
            <p>Desde: X</p>
          </div>
        </div>

        {}
        <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          <Stat number={impacto.bolsas} label="Bolsas reutilizadas" />
          <Stat number={impacto.botellas} label="Botellas recicladas" />
          <Stat number={impacto.desperdicios} label="Reducción de residuos" />
          <Stat number={impacto.usuarios} label="Usuarios apoyando" />
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