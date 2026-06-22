import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Cuadros from "./components/Cuadros";
import About from "./components/Info";
import Actions from "./components/Acciones";

import Login from "./Sesion/Login";
import Welcome from "./Sesion/Perfil";

function Home() {
  return (
    <>
      <Navbar />
      <Cuadros />
      {/* <About /> */}
      <Actions />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <h1>Cargando...</h1>;

  return (
    <BrowserRouter>
      <div className="bg-[#f5f5f0] text-gray-800 overflow-x-hidden">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              user && user.emailVerified
                ? <Navigate to="/welcome" />
                : <Login />
            }
          />

          <Route
            path="/welcome"
            element={
              user && user.emailVerified
                ? <Welcome user={user} />
                : <Navigate to="/login" />
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;