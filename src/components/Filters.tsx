import React, { useState, useMemo, useCallback } from 'react';
import { useCarStore } from '../store/useCarsStore';
import { FilterDropdown } from '../features/FilterDropdown';

export const Filters = () => {
  const allCars = useCarStore(state => state.allCars);
  const filters = useCarStore(state => state.filters);
  const setFilters = useCarStore(state => state.setFilters);

  const [showCompany, setShowCompany] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showSeats, setShowSeats] = useState(false);
  const [showLuggage, setShowLuggage] = useState(false);

  const companies = useMemo(
    () => Array.from(new Set(allCars.map(car => car.company_name))),
    [allCars]
  );

  const categories = useMemo(
    () => Array.from(new Set(allCars.map(car => car.features.category))),
    [allCars]
  );

  const seats = useMemo(
    () => Array.from(new Set(allCars.map(car => car.features.seats))),
    [allCars]
  );

  const luggages = useMemo(
    () => Array.from(
      new Set(allCars.map(car =>
        `${car.features.large_suitcase}G/${car.features.small_suitcase}C`
      ))
    ),
    [allCars]
  );

  const toggleSelection = useCallback(
    (value: string, selectedList: string[], key: keyof typeof filters) => {
      const newList = selectedList.includes(value)
        ? selectedList.filter(v => v !== value)
        : [...selectedList, value];
      setFilters({ [key]: newList });
    },
    [setFilters]
  );

  const onChangePriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === '' ? null : Number(val);

    if (num !== null && filters.priceMax !== null && num > filters.priceMax) return;

    setFilters({ priceMin: num });
  };

  const onChangePriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === '' ? null : Number(val);

    if (num !== null && filters.priceMin !== null && num < filters.priceMin) return;

    setFilters({ priceMax: num });
  };

  const countByCompany = useMemo(() => allCars.reduce((acc, car) => {
    acc[car.company_name] = (acc[car.company_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [allCars]);

  const countByCategory = useMemo(() => allCars.reduce((acc, car) => {
    const category = car.features.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [allCars]);

  const countBySeats = useMemo(() => allCars.reduce((acc, car) => {
    const seats = car.features.seats;
    acc[seats] = (acc[seats] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [allCars]);

  const countByLuggage = useMemo(() => allCars.reduce((acc, car) => {
    const key = `${car.features.large_suitcase}G/${car.features.small_suitcase}C`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [allCars]);

  return (
    <div className="flex flex-col bg-white py-6 rounded-[16px] font-bold h-fit">
      <h3 className="font-soft-blue flex gap-3 text-center rates-title font-bold mb-4 px-6">
        <img src="/icons/filter-icon.svg" alt="Filter Icon" className="w-6 h-6" />
        Filtrar resultados
      </h3>

      <FilterDropdown
        label="Compañía rentadora"
        open={showCompany}
        toggle={() => setShowCompany(!showCompany)}
        options={companies}
        selected={filters.companies}
        onToggleOption={(val) => toggleSelection(val, filters.companies, 'companies')}
        countByOption={countByCompany}
      />

      <FilterDropdown
        label="Categoría del auto"
        open={showCategory}
        toggle={() => setShowCategory(!showCategory)}
        options={categories}
        selected={filters.categories}
        onToggleOption={(val) => toggleSelection(val, filters.categories, 'categories')}
        countByOption={countByCategory}
      />

      <FilterDropdown
        label="Cantidad de pasajeros"
        open={showSeats}
        toggle={() => setShowSeats(!showSeats)}
        options={seats}
        selected={filters.seats}
        onToggleOption={(val) => toggleSelection(val, filters.seats, 'seats')}
        countByOption={countBySeats}
      />

      <FilterDropdown
        label="Capacidad de maletas"
        open={showLuggage}
        toggle={() => setShowLuggage(!showLuggage)}
        options={luggages}
        selected={filters.luggages}
        onToggleOption={(val) => toggleSelection(val, filters.luggages, 'luggages')}
        countByOption={countByLuggage}
      />

      <div className="px-6">
        <p className="font-soft-blue font-bold py-4">Rango de precio (COP)</p>
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span className="flex items-center grey-background filter-arrow-color py-1 px-3 rounded-l-md">COP</span>
            <span className="flex items-center font-medium bg-white border border-r-0 filter-arrow-color p-3">
              Desde
            </span>
            <input
              type="number"
              value={filters.priceMin ?? ''}
              onChange={onChangePriceMin}
              className="w-1/2 border border-l-0 px-2 py-1 font-soft-blue rounded-r-md"
            />
          </div>
          <div className="flex">
            <span className="flex items-center grey-background filter-arrow-color py-1 px-3 rounded-l-md">COP</span>
            <span className="flex items-center font-medium bg-white border border-r-0 filter-arrow-color p-3">
              Hasta
            </span>
            <input
              type="number"
              value={filters.priceMax ?? ''}
              onChange={onChangePriceMax}
              className="w-1/2 border border-l-0 px-2 py-1 font-soft-blue rounded-r-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
