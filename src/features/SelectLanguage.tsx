import { useState } from 'react';

const languages = [
  { code: 'es', name: 'Español', flag: '/icons/spa-flag.svg' },
  { code: 'en', name: 'English', flag: '/icons/usa-flag.svg' },
];

const SelectLanguage = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  const toggleDropdown = () => setOpen(!open);
  const handleSelect = (lang: typeof languages[0]) => {
    setSelected(lang);
    setOpen(false);
  };

  return (
    <div className="relative w-40">
      <button
        onClick={toggleDropdown}
        className="w-full grey-background px-4 py-2 flex items-center justify-between bg-white rounded"
      >
        <div className="flex items-center gap-2">
          <img src={selected.flag} alt={selected.name} className="w-5 h-5" />
          <span>{selected.name}</span>
        </div>
        <svg
          className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 top-full w-full mt-1 border bg-white rounded shadow z-10">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <img src={lang.flag} alt={lang.name} className="w-5 h-5" />
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectLanguage;
