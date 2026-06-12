import { useEffect, useState } from "react";

import { signOut } from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function Welcome({ user }) {

  // ESTADOS
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [contadorVisual, setContadorVisual] = useState(0);

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  // CREAR USUARIO
  const crearUsuario = async () => {

    try {
      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          nombre: user.displayName,
          correo: user.email,
          uid: user.uid,
          botellas: 0,
          bolsas: 0,
          desperdicios: 0,
          total: 0,
          primerImpacto: null,
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  // OBTENER USUARIO
  const obtenerUsuario = async () => {
    try {
      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setDatosUsuario(data);
        setContadorVisual(data.total || 0);
      }

    } catch (error) {
      console.error(error);
    }
  };

  // GUARDAR ACCIÓN
  const guardarAccion = async (tipo) => {

    try {
      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data();

      // ANIMACIÓN
      let inicio = contadorVisual;
      let objetivo = contadorVisual + 1;
      const intervalo = setInterval(() => {
        inicio++;
        setContadorVisual(inicio);

        if (inicio >= objetivo) {
          clearInterval(intervalo);
        }
      }, 40);

      // BASE
      const updateData = {
        total: increment(1),
      };

      // PRIMER IMPACTO
      if (!data.primerImpacto) {
        updateData.primerImpacto = serverTimestamp();
      }

      // BOTELLAS
      if (tipo === "botellas") {
        updateData.botellas = increment(1);
      }

      // BOLSAS
      if (tipo === "bolsas") {
        updateData.bolsas = increment(1);
      }

      // DESPERDICIOS
      if (tipo === "desperdicios") {
        updateData.desperdicios = increment(1);
      }

      await updateDoc(userRef, updateData);
      obtenerUsuario();
    } catch (error) {
      console.error(error);
    }
  };

  // CARGAR
  useEffect(() => {

    const cargar = async () => {
      await crearUsuario();
      await obtenerUsuario();
    };
    cargar();
  }, []);

  return (
    <div className="min-h-screen bg-[#efefef] p-10">
      {}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            Hola, {user.displayName}
          </h1>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-xl"
        >
          Cerrar sesión
        </button>

      </div>

      {/* REGISTRAR ACCIÓN */}
      <div className="bg-[#f7f7f7] rounded-3xl p-8 mb-8">

        <h2 className="text-3xl font-bold mb-8">
          Registrar acción
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          {}
          <div
            onClick={() => guardarAccion("bolsas")}
            className="bg-[#e8e6e2] rounded-2xl p-10 text-center cursor-pointer hover:scale-105 transition"
          >

            <p className="text-5xl mb-4">
              ♻️
            </p>

            <h3 className="text-2xl font-semibold">
              Reciclaje de bolsas
            </h3>

            <p className="text-gray-500 mt-3">
              +1 acción
            </p>

          </div>

          {}
          <div
            onClick={() => guardarAccion("botellas")}
            className="bg-[#e8e6e2] rounded-2xl p-10 text-center cursor-pointer hover:scale-105 transition"
          >

            <p className="text-5xl mb-4">
              🧴
            </p>

            <h3 className="text-2xl font-semibold">
              Reciclaje de botellas
            </h3>

            <p className="text-gray-500 mt-3">
              +1 acción
            </p>

          </div>

          {}
          <div
            onClick={() => guardarAccion("desperdicios")}
            className="bg-[#e8e6e2] rounded-2xl p-10 text-center cursor-pointer hover:scale-105 transition"
          >

            <p className="text-5xl mb-4">
              🌱
            </p>

            <h3 className="text-2xl font-semibold">
              Reducción de desperdicios
            </h3>

            <p className="text-gray-500 mt-3">
              +1 acción
            </p>

          </div>

        </div>
      </div>

      {}
      <div className="grid md:grid-cols-2 gap-8">

        {}
        <div className="bg-[#f7f7f7] rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Impacto total generado
          </h2>

          <h1 className="text-7xl font-black text-green-700">
            {contadorVisual}
          </h1>

          <p className="text-gray-400 text-md mt-2">
            Desde:{" "}
            {datosUsuario?.primerImpacto?.toDate().toLocaleDateString()}
          </p>

        </div>

        {/* ESTADÍSTICAS */}
        <div className="bg-[#f7f7f7] rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Estadísticas
          </h2>

          <div className="space-y-6">

            <div className="flex items-center justify-between">
              <p className="text-xl">
                🧴 Botellas
              </p>
              <p className="text-2xl font-bold text-green-700">
                {datosUsuario?.botellas || 0}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xl">
                ♻️ Bolsas
              </p>
              <p className="text-2xl font-bold text-green-700">
                {datosUsuario?.bolsas || 0}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xl">
                🌱 Desperdicios
              </p>
              <p className="text-2xl font-bold text-green-700">
                {datosUsuario?.desperdicios || 0}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;