import { useState, useEffect } from "react";

const orderOptions = [
  { code: 'desc' as const, label: 'Mayor precio' },
  { code: 'asc' as const, label: 'Menor precio' },
];

type Option = (typeof orderOptions)[number];

type FilterPriceProps = {
  onChange?: (order: Option["code"]) => void;
  defaultValue?: Option["code"];
};

const FilterPrice = ({ onChange, defaultValue = "desc" }: FilterPriceProps) => {
  const defaultOption = orderOptions.find((o) => o.code === defaultValue) || orderOptions[0];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(defaultOption);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option.code);
  };

  useEffect(() => {
  const defaultOption = orderOptions.find((o) => o.code === defaultValue) || orderOptions[0];
  setSelected(defaultOption);
}, [defaultValue]);

  return (
    <div className="relative w-40 select-none">
      <button
        onClick={toggleDropdown}
        className="w-full bg-white rounded px-4 py-2 flex items-center justify-between font-bold text-gray-800 hover:bg-gray-50"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-md max-h-48 overflow-auto z-20"
        >
          {orderOptions.map((option) => (
            <li
              key={option.code}
              role="option"
              aria-selected={selected.code === option.code}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 font-semibold ${
                selected.code === option.code ? "bg-gray-100" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterPrice;
