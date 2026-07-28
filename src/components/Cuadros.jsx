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
    <section id="impacto">
      <div className="bg-[#dddddd] px-6 pt-2 md:px-10 lg:px-16">

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
    </section>
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