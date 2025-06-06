import React from 'react';

interface FilterDropdownProps {
  label: string;
  open: boolean;
  toggle: () => void;
  options: string[];
  selected: string[];
  onToggleOption: (option: string) => void;
  countByOption?: Record<string, number>;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  open,
  toggle,
  options,
  selected,
  onToggleOption,
  countByOption = {},
}) => {
  return (
    <div>
      <button
        onClick={toggle}
        className="lighted-blue-bg font-soft-blue w-full text-left py-3 px-6 flex justify-between items-center border-b"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform filter-arrow-color ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="p-6">
          {options.map(option => (
            <label key={option} className="block mt-1 font-normal">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggleOption(option)}
                className="mr-2 accent-[#3179BD]"
              />
              {option} <span className='filter-arrow-color font-medium'>({countByOption[option] ?? 0})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
