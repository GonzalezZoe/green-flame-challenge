import { useEffect, useMemo } from 'react';
import { useCarStore } from '../store/useCarsStore';
import { ProductSheet } from './ProductSheet';
import { Filters } from './Filters';
import { OrderBy } from './OrderBy';
import type { Car } from '../types/Car';
import { Cart } from './Cart';

const fixCarImageUrl = (url: string | null | undefined) => {
  if (typeof url === 'string' && url.startsWith('https://test/assets/fleet_images/')) {
    return url.replace('https://test/assets/fleet_images/', '/cars/');
  }
  return url || '/placeholder.png';
};

const Catalog = () => {
  const filteredCars = useCarStore(state => state.filteredCars);
  const setCarsByCompany = useCarStore(state => state.setCarsByCompany);
  const order = useCarStore(state => state.order);
  const showPremiumFirst = useCarStore(state => state.showPremiumFirst);

  const fixedCars = useMemo(
    () =>
      filteredCars.map(car => ({
        ...car,
        picture_url: {
          normal: fixCarImageUrl(car.picture_url?.normal),
          featured: fixCarImageUrl(car.picture_url?.featured),
        },
      })),
    [filteredCars]
  );

  const getPriceCOP = (car: Car) => {
    const rateCodes = Object.keys(car.rates || {});
    if (rateCodes.length === 0) return 0;
    const firstRate = car.rates[rateCodes[0]];
    if (firstRate?.pricing?.COP?.total_charge?.total?.total_amount) {
      return parseFloat(firstRate.pricing.COP.total_charge.total.total_amount);
    }
    return 0;
  };

  const sortedCars = useMemo(() => {
    return [...fixedCars].sort((a, b) => {
      if (showPremiumFirst) {
        if (a.features.category === 'Premium' && b.features.category !== 'Premium') return -1;
        if (a.features.category !== 'Premium' && b.features.category === 'Premium') return 1;
      }
      const priceA = getPriceCOP(a);
      const priceB = getPriceCOP(b);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }, [fixedCars, order, showPremiumFirst]);

  useEffect(() => {
    fetch('/data/cars.json')
      .then(res => res.json())
      .then(data => {
        setCarsByCompany(data.cars);
      })
      .catch(err => console.error('Error cargando autos:', err));
  }, [setCarsByCompany]);

  return (
    <>
    <div className='container mx-auto flex gap-10 my-8'>
      <Filters />
      <div className="w-full">
        <OrderBy totalCars={sortedCars.length} />
        {sortedCars.map((car, i) => (
          <ProductSheet key={`${car.code}-${i}`} car={car} />
        ))}
      </div>
    </div>
    <Cart />
    </>
  );
};

export default Catalog;
