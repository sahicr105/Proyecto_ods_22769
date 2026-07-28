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
import { sendPasswordResetEmail } from "firebase/auth";

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
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [mostrarPrivacidad, setMostrarPrivacidad] = useState(false);

  // GOOGLE LOGIN
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await user.reload();

      if (!user.emailVerified) {
        await signOut(auth);
        setMensaje("❌ Debes verificar tu cuenta de Google");
        return;
      }

      setMensaje("✅ Bienvenido con Google");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error en Google login");
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

      await user.reload();

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
      return setMensaje("⚠️ Completa todos los campos");
    }

  // AVISO
  if (!aceptaPrivacidad) {
    return setMensaje("⚠️ Debes aceptar el Aviso de Privacidad.");
  }

    if (password !== confirmar) {
      return setMensaje("⚠️ Las contraseñas no coinciden");
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;

    if (!passwordRegex.test(password)) {
      return setMensaje(
        "⚠️ Mínimo 8 caracteres, 1 letra, 1 número y 1 símbolo"
      );
    }

    try {
      // CREAR USUARIO
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      );

      const user = userCredential.user;

      // NOMBRE
      await updateProfile(user, {
        displayName: nombre,
      });

      // VERIFICACION
      await sendEmailVerification(user);

      // FIRESTORE DATOS
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

      await signOut(auth);

      setMensaje("📧 Revisa tu correo para verificar tu cuenta");

      setRegister(false);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar cuenta");
    }
  };

  const resetPassword = async () => {
    if (!loginEmail) {
      setMensaje("⚠️ Ingresa tu correo primero");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, loginEmail);
      setMensaje("📧 Se envió un correo para restablecer tu contraseña");
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo enviar el correo");
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
                  Inicia sesión con tu cuenta
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
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-lg"
                  >
                    INICIAR SESIÓN
                  </button>

                  <button
                    onClick={loginGoogle}
                    className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-lg"
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
                
                <button
                  onClick={resetPassword}
                  className="text-sm text-blue-600 hover:underline mt-2 cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </>
            ) : (
              <>
                {/* REGISTRO */}
                <h1 className="text-5xl font-black mb-4">REGISTRO</h1>

                <p className="text-gray-600 mb-10 text-lg">
                  Crea tu cuenta
                </p>

                <div className="space-y-5">

                  <input
                    type="text"
                    placeholder="Nombre"
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

                  <div className="flex items-start gap-2 text-sm">

                  <input
                    type="checkbox"
                    checked={aceptaPrivacidad}
                    onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                    className="mt-1"
                  />

                  <p>
                    Acepto el{" "}
                    <span
                      onClick={() => setMostrarPrivacidad(true)}
                      className="text-green-700 underline cursor-pointer"
                    >
                      Aviso de Privacidad
                    </span>
                  </p>

                </div>

                  <button
                    onClick={registrar}
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-lg"
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
      {mostrarPrivacidad && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 max-w-xl w-[90%] max-h-[80vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4">
              Aviso de Privacidad
            </h2>

            <p className="text-gray-700 leading-7">
              Al registrarte en esta aplicación aceptas que los datos personales
              proporcionados, como tu nombre y correo electrónico, serán utilizados
              únicamente para crear y administrar tu cuenta de usuario.

              <br /><br />

              La información almacenada no será compartida con terceros y será usada
              exclusivamente para el funcionamiento de la plataforma y el seguimiento
              de tus acciones relacionadas con el cuidado del medio ambiente.

              <br /><br />

              Esta aplicación es un proyecto académico y se implementan medidas
              razonables para proteger los datos registrados.
            </p>

            <button
              onClick={() => setMostrarPrivacidad(false)}
              className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg"
            >
              Entendido
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Login;