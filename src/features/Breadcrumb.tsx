const Breadcrumb = () => {
  return (
    <nav className="flex justify-center items-center breadcrumb-bg text-white py-5">
    <div className="container mx-auto flex justify-center items-center text-sm gap-20">
      <a className="font-bold text-white">Selecciona tu vehículo</a> <span className="disabled-category-breadcrumb"><img src="/icons/chevron-icon.svg"/></span>
      <a className="disabled-category-breadcrumb">Agrega equipamiento adicional</a> <span className="disabled-category-breadcrumb"><img src="/icons/chevron-icon.svg"/></span> 
      <a className="disabled-category-breadcrumb">Información del conductor</a> <span className="disabled-category-breadcrumb"><img src="/icons/chevron-icon.svg"/></span>
      <a className="disabled-category-breadcrumb">Confirmación de la reserva</a>
    </div>
    </nav>
  );
}

export default Breadcrumb;