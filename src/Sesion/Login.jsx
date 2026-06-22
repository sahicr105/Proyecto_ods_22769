import { useState } from "react";

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, provider, db } from "../firebase";
import Navbar from "../components/Navbar";
import eco from "../assets/form.jpg";

function Login() {
  const [register, setRegister] = useState(false);

  // LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // REGISTRO
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  // MENSAJE UI
  const [mensaje, setMensaje] = useState("");

  // GOOGLE LOGIN
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔒 bloquear si no existe en tu BD (opcional recomendado)
      // aquí podrías hacer getDoc igual que antes

      setMensaje(`Bienvenido ${user.displayName}`);
    } catch (error) {
      console.error(error);
    }
  };

  // LOGIN EMAIL
  const loginEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      const user = userCredential.user;

      // 🔒 BLOQUEO DE VERIFICACIÓN
      if (!user.emailVerified) {
        await signOut(auth);
        setMensaje("❌ Debes verificar tu correo antes de iniciar sesión");
        return;
      }

      setMensaje("✅ Bienvenido");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Correo o contraseña incorrectos");
    }
  };

  // REGISTRO
  const registrar = async () => {
    if (!nombre || !correo || !password || !confirmar) {
      return setMensaje("⚠️ Complete todos los campos");
    }

    if (password !== confirmar) {
      return setMensaje("⚠️ Las contraseñas no coinciden");
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;

    if (!passwordRegex.test(password)) {
      return setMensaje(
        "⚠️ La contraseña debe tener 8+ caracteres, 1 letra, 1 número y 1 símbolo"
      );
    }

    try {
      // 🔥 CREAR USUARIO
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      );

      const user = userCredential.user;

      // 👤 NOMBRE
      await updateProfile(user, {
        displayName: nombre,
      });

      // 📧 ENVIAR VERIFICACIÓN
      await sendEmailVerification(user);

      // 🗄️ FIRESTORE
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        correo,
        uid: user.uid,
        botellas: 0,
        bolsas: 0,
        desperdicios: 0,
        total: 0,
        primerImpacto: null,
      });

      // 🔥 IMPORTANTÍSIMO: cerrar sesión para que NO entre al perfil
      await signOut(auth);

      setMensaje("📧 Te enviamos un correo. Revisa tu bandeja y verifica tu cuenta.");

      setRegister(false);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear cuenta");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 grid md:grid-cols-2 bg-[#f5f5f0]">

        {/* IZQUIERDA */}
        <div className="hidden md:flex items-center justify-center p-4">
          <img
            src={eco}
            alt="eco"
            className="w-full h-[90vh] object-cover rounded-3xl"
          />
        </div>

        {/* DERECHA */}
        <div className="flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-md">

            {/* MENSAJE */}
            {mensaje && (
              <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800">
                {mensaje}
              </div>
            )}

            {/* LOGIN */}
            {!register ? (
              <>
                <h1 className="text-5xl font-black mb-4">LOGIN</h1>

                <p className="text-gray-600 mb-10 text-lg">
                  Ingrese sus datos para iniciar sesión
                </p>

                <div className="space-y-5">

                  <input
                    type="email"
                    placeholder="Correo"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 outline-none focus:border-green-700 bg-white"
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 outline-none focus:border-green-700 bg-white"
                  />

                  <button
                    onClick={loginEmailPassword}
                    className="w-full bg-green-700 hover:bg-green-800 transition text-white py-4 rounded-lg text-lg"
                  >
                    INICIAR SESIÓN
                  </button>

                  <button
                    onClick={loginGoogle}
                    className="w-full border border-gray-300 hover:bg-gray-100 transition py-4 rounded-lg text-lg"
                  >
                    Continuar con Google
                  </button>

                </div>

                <p className="mt-8 text-lg">
                  ¿No tienes cuenta?{" "}
                  <span
                    onClick={() => setRegister(true)}
                    className="text-green-700 font-bold cursor-pointer"
                  >
                    CREAR
                  </span>
                </p>
              </>
            ) : (
              <>
                {/* REGISTRO */}
                <h1 className="text-5xl font-black mb-4">REGISTRO</h1>

                <p className="text-gray-600 mb-10 text-lg">
                  Cree su cuenta llenando la siguiente información
                </p>

                <div className="space-y-5">

                  <input
                    type="text"
                    placeholder="Nombre(s)"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 outline-none focus:border-green-700 bg-white"
                  />

                  <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 outline-none focus:border-green-700 bg-white"
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 outline-none focus:border-green-700 bg-white"
                  />

                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 outline-none focus:border-green-700 bg-white"
                  />

                  <button
                    onClick={registrar}
                    className="w-full bg-green-700 hover:bg-green-800 transition text-white py-4 rounded-lg text-lg"
                  >
                    REGISTRARSE
                  </button>

                </div>

                <p className="mt-8 text-lg">
                  ¿Ya tienes cuenta?{" "}
                  <span
                    onClick={() => setRegister(false)}
                    className="text-green-700 font-bold cursor-pointer"
                  >
                    INICIAR SESIÓN
                  </span>
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;