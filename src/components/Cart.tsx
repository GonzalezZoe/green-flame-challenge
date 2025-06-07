import { useCarStore } from '../store/useCarsStore';

export const Cart = () => {
  const cart = useCarStore(state => state.cart);
  const removeFromCart = useCarStore(state => state.removeFromCart);

  return (
    <div className={`bg-white shadow-md fixed bottom-0 z-10 w-full transition-all duration-300 ${
        cart.length > 0 ? 'block' : 'hidden'
      }`}>
      <ul className="container mx-auto p-4">
        {cart.map(({ carCode, rateCode, priceCOP, priceUSD, rateName, company_name }, i) => {
            const cleanCompanyName = company_name.trim().toLowerCase();
            const iconSrc = cleanCompanyName
            ? `/icons/${cleanCompanyName}-logo.svg`
            : '/icons/no-image.svg';


          return (
            <li
              key={`${carCode}-${rateCode}-${i}`}
              className="flex justify-between items-center py-2 relative"
            >
              <div className="flex items-center gap-4">
                <img
                  src={iconSrc}
                  alt={`${company_name ?? 'unknown'} logo`}
                  className="w-10 h-10 object-contain"
                  onError={(e) => (e.currentTarget.src = '/icons/no-image.svg')}
                />
                <div>
                  <h3 className="font-bold font-title flex gap-2">
                    {rateName} - {rateCode}
                  </h3>
                  <p className="font-soft-blue font-medium">Ver detalle de la tarifa</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col text-right">
                  <p className="font-bold font-title font-soft-blue">
                    COP {priceCOP.toLocaleString()}
                  </p>
                  <p className="font-medium subtitle-gray">USD {priceUSD.toLocaleString()}</p>
                </div>

                <div className="flex gap-4">
                  <button className="bg-soft-blue text-white py-2 px-7 rounded-[8px] font-bold h-10">
                    Continuar
                  </button>
                  <button
                    onClick={() => removeFromCart(carCode, rateCode)}
                    className="bg-soft-red text-white py-2 px-7 rounded-[8px] font-bold h-10 flex gap-2 items-center"
                  >
                    <img src="/icons/delete-logo.svg" alt="Eliminar" />
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
