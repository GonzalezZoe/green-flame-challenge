export const Newsletter = () => {
  return (
    <div className="breadcrumb-bg text-white py-10 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Columna de texto */}
        <div className="md:col-span-1 max-w-md">
          <h3 className="font-bold rates-title">
            ¿Quieres estar al tanto de nuestras novedades?
          </h3>
          <p className="text-sm mt-2">
            Suscríbete a nuestro newsletter y mantente al día con nuestras novedades, lanzamientos de productos y ofertas exclusivas.
          </p>
        </div>

        {/* Columna de formulario */}
        <div className="md:col-span-2">
          <form className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <input
              type="text"
              className="w-full max-w-[350px] flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              className="w-full max-w-[350px] flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="py-2 px-7 rounded-[8px] font-bold bg-soft-blue text-white h-10 w-full md:w-auto"
            >
              ¡Suscríbete!
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs">
            <input id="register" type="checkbox" className="" />
            <label htmlFor="register" className="disabled-category-breadcrumb">
              Acepto registrarme en la base de datos de Unión de Representaciones para recibir información y promociones en esta dirección de correo electrónico.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
