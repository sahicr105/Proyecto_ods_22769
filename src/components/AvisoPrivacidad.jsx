function AvisoPrivacidad({ abierto, cerrar }) {
  if (!abierto) return null;

  return (
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
          onClick={cerrar}
          className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg"
        >
          Entendido
        </button>

      </div>

    </div>
  );
}

export default AvisoPrivacidad;