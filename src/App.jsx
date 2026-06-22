import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Cuadros from "./components/Cuadros";
import Actions from "./components/Acciones";

import Login from "./Sesion/Login";
import Welcome from "./Sesion/Perfil";

function Home() {
  return (
    <>
      <Navbar />
      <Cuadros />
      <Actions />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // 🔥 refresca estado real de verificación
        await currentUser.reload();

        // 🔒 SOLO USUARIOS VERIFICADOS ENTRAN
        if (!currentUser.emailVerified) {
          await signOut(auth);
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error(error);
        await signOut(auth);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold">Cargando...</h1>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="bg-[#f5f5f0] text-gray-800 overflow-x-hidden">

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              user
                ? <Navigate to="/welcome" replace />
                : <Login />
            }
          />

          {/* PERFIL / WELCOME */}
          <Route
            path="/welcome"
            element={
              user
                ? <Welcome user={user} />
                : <Navigate to="/login" replace />
            }
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;