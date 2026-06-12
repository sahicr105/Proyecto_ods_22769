import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">
          
        </h1>

        <ul className="hidden md:flex gap-8 font-medium">
          <Link to="/">
            <li className="hover:text-green-700 cursor-pointer transition">
              Inicio
            </li>
          </Link>

          <li className="hover:text-green-700 cursor-pointer transition">
            Impacto
          </li>

          <li className="hover:text-green-700 cursor-pointer transition">
            Repollo
          </li>
        </ul>

        <Link to="/login">
          <button className="bg-green-700 hover:bg-green-800 transition text-white px-5 py-2 rounded-full">
            X
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;