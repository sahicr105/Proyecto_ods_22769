import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  const scrollToSection = (id) => {

    // Si no estamos en Home
    if (location.pathname !== "/") {

      navigate("/");

      // Espera a que cargue Home antes del scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth"
        });
      }, 300);

    } else {

      // Si ya estamos en Home
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
      });

    }

    setOpen(false);
  };


  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/75 border-b border-white/20">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        <h1 className="text-xl md:text-2xl font-bold text-green-700">
        </h1>


        {/* MENU PC */}
        <ul className="hidden md:flex gap-8 font-medium">

          <li
            onClick={() => scrollToSection("inicio")}
            className="hover:text-green-700 transition cursor-pointer"
          >
            Inicio
          </li>


          <li
            onClick={() => scrollToSection("impacto")}
            className="hover:text-green-700 transition cursor-pointer"
          >
            Impacto
          </li>


          <li
            onClick={() => scrollToSection("apoyar")}
            className="hover:text-green-700 transition cursor-pointer"
          >
            ¿Cómo apoyar?
          </li>

        </ul>



        {/* BTN LOGIN */}
        <Link to="/login" className="hidden md:block">

          <button className="bg-green-700 hover:bg-green-800 transition text-white px-5 py-2 rounded-full">

            Iniciar Sesión

          </button>

        </Link>



        {/* BTN HAMBURGUESA */}
        <button
          className="md:hidden text-2xl text-green-700"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}

        </button>


      </div>




      {/* MENU CELULAR */}
      {open && (

        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">


          <ul className="flex flex-col items-center gap-6 py-6 font-medium">


            <li
              onClick={() => scrollToSection("inicio")}
              className="cursor-pointer"
            >
              Inicio
            </li>



            <li
              onClick={() => scrollToSection("impacto")}
              className="cursor-pointer"
            >
              Impacto
            </li>



            <li
              onClick={() => scrollToSection("apoyar")}
              className="cursor-pointer"
            >
              ¿Cómo apoyar?
            </li>




            <Link 
              to="/login" 
              onClick={() => setOpen(false)}
            >

              <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full">

                Iniciar Sesión

              </button>

            </Link>



          </ul>


        </div>

      )}


    </nav>
  );
}


export default Navbar;