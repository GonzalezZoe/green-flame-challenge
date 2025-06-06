import { useCarStore } from '../store/useCarsStore';
import FilterPrice from "../features/FilterPrice";
interface OrderByProps {
  totalCars: number;
}
export const OrderBy = ({ totalCars }: OrderByProps) => {
  const { order, setOrder, showPremiumFirst, setShowPremiumFirst } = useCarStore();
  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <label className="font-soft-blue font-bold">
        Encontramos {totalCars} vehículos para tu búsqueda
      </label>

      <div className="flex items-center gap-2 font-normal">
        <input
          type="checkbox"
          id="highlighted"
          checked={showPremiumFirst}
          onChange={e => setShowPremiumFirst(e.target.checked)}
        />
        <label htmlFor="highlighted">Mostrar destacados primero</label>
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-soft-blue text-white py-2 px-7 rounded-[8px] font-bold h-10 leading-none">
          Enviar cotización
        </button>
        <FilterPrice
          defaultValue={order}
          onChange={(value) => setOrder(value)}
        />
      </div>
    </div>
  );
};
