import { create } from 'zustand';
import type { Car, CarsByCompany } from '../types/Car';

export interface CarWithCompany extends Car {
  company_name: string;
}

interface Filters {
  companies: string[];
  categories: string[];
  seats: string[];
  luggages: string[];
  priceMin: number | null;
  priceMax: number | null;
}

export interface CartItem {
  carCode: string;
  rateCode: string;
  priceCOP: number;
  priceUSD: number;
  quantity: number;
  rateName: string;
  company_name: string;
}

interface CarStore {
  carsByCompany: CarsByCompany;
  allCars: CarWithCompany[];
  filteredCars: CarWithCompany[];
  order: 'asc' | 'desc';
  setOrder: (order: 'asc' | 'desc') => void;
  setCarsByCompany: (data: CarsByCompany) => void;
  showPremiumFirst: boolean;
  setShowPremiumFirst: (show: boolean) => void;

  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;

  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (carCode: string, rateCode: string) => void;
  clearCart: () => void;
}

export const useCarStore = create<CarStore>((set, get) => ({
  carsByCompany: {},
  allCars: [],
  filteredCars: [],

  order: 'desc',
  setOrder: (order) => set({ order }),

  showPremiumFirst: false,
  setShowPremiumFirst: (value) => set({ showPremiumFirst: value }),

  filters: {
    companies: [],
    categories: [],
    seats: [],
    luggages: [],
    priceMin: null,
    priceMax: null,
  },

  setFilters: (newFilters) => {
    const prevFilters = get().filters;
    const filters = { ...prevFilters, ...newFilters };
    const allCars = get().allCars;

    const filtered = allCars.filter(car => {
      if (filters.companies.length && !filters.companies.includes(car.company_name)) return false;
      if (filters.categories.length && !filters.categories.includes(car.features.category)) return false;
      if (filters.seats.length && !filters.seats.includes(car.features.seats)) return false;

      const luggageStr = `${car.features.large_suitcase}G/${car.features.small_suitcase}C`;
      if (filters.luggages.length && !filters.luggages.includes(luggageStr)) return false;

      const firstRate = Object.values(car.rates)[0];
      if (!firstRate) return false;

      const price = Number(firstRate.pricing.COP.total_charge.total.total_amount);
      if (isNaN(price)) return false;

      if (filters.priceMin !== null && filters.priceMax !== null) {
        if (filters.priceMin > filters.priceMax) return false;
        if (price < filters.priceMin || price > filters.priceMax) return false;
      } else {
        if (filters.priceMin !== null && price < filters.priceMin) return false;
        if (filters.priceMax !== null && price > filters.priceMax) return false;
      }

      return true;
    });

    set({ filters, filteredCars: filtered });
  },

  setCarsByCompany: (data) => {
    const all = Object.entries(data).flatMap(([company, cars]) =>
      cars.map(car => ({
        ...car,
        company_name: company,
      }))
    );

    set({
      carsByCompany: data,
      allCars: all,
      filteredCars: all,
    });
  },

  cart: [],

  addToCart: (item) =>
  set(state => {
    if (state.cart.length >= 5) {
      alert("No puedes agregar más de 5 productos al carrito.");
      return {};
    }
    return { cart: [...state.cart, item] };
  }),


  removeFromCart: (carCode, rateCode) => {
    set(state => ({
      cart: state.cart.filter(item => !(item.carCode === carCode && item.rateCode === rateCode))
    }));
  },

  clearCart: () => set({ cart: [] }),
}));
