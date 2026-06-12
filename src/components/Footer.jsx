function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400">
          EcoImpact
        </h2>

        <p className="text-gray-400 mb-6">
          Producción y consumo responsables
        </p>

        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="hover:text-green-400 transition">
            Inicio
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Comunidad
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Impacto
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          © 2026 EcoImpact - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;