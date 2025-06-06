import type { Car } from '../types/Car';
import { Prices } from './Prices';
import { useCarStore } from '../store/useCarsStore';

export const ProductSheet = ({ car }: { car: Car & { company_name: string } }) => {
  const cart = useCarStore(state => state.cart);

  const isInCart = cart.some(item => item.carCode === car.code);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const iconSrc = `/icons/${car.company_name.toLowerCase()}-logo.svg`;

  return (
    <div className="rounded-[18px] border-l-8 border-solid border-[#3179BD] card-shadow bg-white mb-8 p-5">
      <div className="flex gap-10 justify-between">
        <div className="flex relative gap-10">
          <div className="flex flex-col items-center justify-center">
            <div className='absolute top-0 left-0'>
             <div className='flex flex-col items-left'>
                <img src={iconSrc} className="" alt="car icon" />
                <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, index) => (
                    <img
                    key={index}
                    src={
                        index < car.stars
                        ? '/icons/star-solid-icon.svg'
                        : '/icons/star-outlined-icon.svg'
                    }
                    alt={index < car.stars ? 'Estrella llena' : 'Estrella vacía'}
                    className="w-3 h-3"
                    />
                ))}
                </div>
             </div>
            </div>
            {car.features.category == "Premium" && (
              <div className="absolute bottom-0 left-0 bg-soft-green rounded-[8px] px-4 py-2">
                <span className="flex gap-2 green-text font-medium">
                  <img src="/icons/featured-icon.svg" />
                  Destacado
                </span>
              </div>
            )}
            <img
              src={car.picture_url?.normal || '/icons/no-image.svg'}
              alt={car.name_details}
              className="w-[250px] h-[150px] object-contain"
              onError={(e) => (e.currentTarget.src = '/icons/no-image.svg')}
            />
          </div>
          <div className="flex flex-col gap-8 mb-2">
            <div>
              <span className="flex items-center gap-2 uppercase group-product light-blue-text font-bold">
                Grupo {car.vehicle_group} - {car.code}
              </span>
              <h3 className="font-bold font-title font-soft-blue">{car.features.category}</h3>
              <h3 className="font-normal text-gray-600 name-product">{car.name_details}</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="grey-background detail-product font-bold flex items-center">
                <img src="/icons/passengers-icon.svg" alt="passengers icon" className="inline-block w-4 h-4 mr-1" />
                {car.features.seats}
              </span>
              <span className="grey-background detail-product font-bold flex items-center">
                <img src="/icons/doors-icon.svg" alt="doors icon" className="inline-block w-4 h-4 mr-1" />
                {car.features.doors}
              </span>
              <span className="grey-background detail-product font-bold flex items-center">
                <img
                  src="/icons/transmission-icon.svg"
                  alt="transmission icon"
                  className="inline-block w-4 h-4 mr-1"
                />
                {car.features.transmission === 'automatic' ? 'A' : 'M'}
              </span>
              <span className="grey-background detail-product font-bold flex items-center">
                <img src="/icons/luggage-icon.svg" alt="small suitcase icon" className="inline-block w-4 h-4 mr-1" />
                {car.features.small_suitcase}
              </span>
              <span className="grey-background detail-product font-bold flex items-center">
                <img src="/icons/carry-icon.svg" alt="large suitcase icon" className="inline-block w-4 h-4 mr-1" />
                {car.features.large_suitcase}
              </span>
              <span className="grey-background detail-product font-bold flex items-center">
                <img
                  src="/icons/air-conditioning-icon.svg"
                  alt="air conditioning icon"
                  className="inline-block w-4 h-4 mr-1"
                />
                {car.features.air_conditioning ? 'SI' : 'NO'}
              </span>
            </div>
            <hr className="hr-custom" />
            <div>
              {isInCart ? (
                <span className="font-normal green-text flex items-center gap-3">
                  <img src="/icons/check-logo.svg" alt="check icon" />
                  Vehículo agregado a su cotización ({totalQuantity} de 5)
                </span>
              ) : (
                <span className="font-bold font-soft-blue flex items-center gap-3">
                  <img className="h-3 w-3" src="/icons/select-message-logo.svg" alt="select icon" />
                  Seleccionar este vehículo para cotizar
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="vertical-line"></div>
        <Prices carCode={car.code} rates={car.rates} />
      </div>
    </div>
  );
};
