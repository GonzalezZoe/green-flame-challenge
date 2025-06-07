import { useState } from 'react'; 
import { useCarStore } from '../store/useCarsStore';
import type { CarRates } from '../types/Car';

interface PricesProps {
  carCode: string;
  rates: CarRates;
  companyName: string;
}

export const Prices = ({ carCode, rates, companyName }: PricesProps) => {
  if (!rates) return null;

  const rateEntries = Object.entries(rates);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allCars = useCarStore(state => state.allCars);
  const addToCart = useCarStore(state => state.addToCart);
  const cart = useCarStore(state => state.cart);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === rateEntries.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex(currentIndex + 1);
  };

  const [code, rate] = rateEntries[currentIndex];

  const priceCOP = parseFloat(rate.pricing?.COP?.total_charge?.total?.total_amount || '0');
  const priceUSD = parseFloat(rate.pricing?.USD?.total_charge?.total?.total_amount || '0');

  const isAlreadySelected = cart.some(item => item.carCode === carCode && item.rateCode === code);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

const trustedDomains = ['https://www.paylesscar.com', 'https://www.budget.com', 'https://www.avis.com'];

function getPreferredImageUrl(url?: string): string {
  if (!url || typeof url !== 'string') {
    return '/icons/no-image.svg';
  }

  if (trustedDomains.some(domain => url.startsWith(domain))) {
    return url;
  }

  const match = url.match(/([^/]+\.png)$/);
  const filename = match?.[1];
  if (filename) {
    return `/cars/${filename}`;
  }

  return '/icons/no-image.svg';
}


const handleSelect = () => {
  if (totalQuantity >= 5) return;

  const rateCode = code;
  const rateName = rate.rate_data.name;

  const carWithCompany = allCars.find(
    c =>
      c.code === carCode &&
      c.company_name === companyName && 
      c.rates &&
      c.rates[rateCode]
  );
  
  if (!carWithCompany) {
    alert("No se encontró el auto seleccionado correctamente.");
    return;
  }

  const productoSeleccionadoPictureUrl = carWithCompany.picture_url?.normal || '/icons/no-image.svg';
  const carPicture = getPreferredImageUrl(productoSeleccionadoPictureUrl);

  addToCart({
    carCode,
    rateCode,
    priceCOP,
    priceUSD,
    quantity: 1,
    rateName,
    company_name: companyName, 
    carPicture,
  });
};

  return (
    <div className="relative bg-white p-6 rounded-[16px] card-shadow w-full max-w-[400px]">
      <button
        onClick={handlePrev}
        disabled={isFirst}
        className={`absolute top-1/2 left-[-15px] -translate-y-1/2 z-10 rounded-full w-12 h-12 bg-white flex items-center justify-center card-shadow ${
          isFirst ? ' cursor-not-allowed' : ''
        }`}
      >
        <img
          className={`${isFirst ? 'w-[20px]' : 'w-[30px]'}`}
          src={isFirst ? '/icons/arrow-icon.svg' : '/icons/arrow-blue-left.svg'}
          alt="Anterior"
        />
      </button>

      <button
        onClick={handleNext}
        disabled={isLast}
        className={`absolute top-1/2 right-[-15px] -translate-y-1/2 z-10 rounded-full w-12 h-12 bg-white flex items-center justify-center card-shadow ${
          isLast ? ' cursor-not-allowed' : ''
        }`}
      >
        <img
          className="w-[30px]"
          src={isLast ? '/icons/arrow-gray-right.svg' : '/icons/arrow-right-icon.svg'}
          alt="Siguiente"
        />
      </button>

      <div key={code} className="flex flex-col items-center gap-4 h-full justify-center">
        <div className="text-center">
          <div className="flex items-center gap-2">
            <p className="font-bold rates-title">{rate.rate_data.name}</p>
            <img src="/icons/info-icon.svg" alt="Info" />
          </div>
          <p className="rates-subtitle subtitle-gray">Precio por 3 días de renta</p>
        </div>
        <hr className="hr-custom" />
        <div className="text-center">
          <h3 className="font-bold font-title font-soft-blue">
            COP {priceCOP.toLocaleString()}
          </h3>
          <p className="subtitle-gray font-normal">
            ({priceUSD.toLocaleString()} USD)
          </p>
        </div>
        <button
          onClick={handleSelect}
          disabled={isAlreadySelected || totalQuantity >= 5}
          className={`py-2 px-7 rounded-[8px] font-bold h-10 w-full ${
            isAlreadySelected || totalQuantity >= 5
              ? 'bg-gray-300 cursor-not-allowed text-gray-600'
              : 'bg-soft-blue text-white'
          }`}
        >
          {isAlreadySelected
            ? 'Ya seleccionado'
            : totalQuantity >= 5
            ? 'Máximo 5 vehículos'
            : 'Seleccionar'}
        </button>
      </div>
    </div>
  );
};
