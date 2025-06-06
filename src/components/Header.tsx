import SelectLanguage from "../features/SelectLanguage";
import LocationAndDateSelector from "../features/LocationAndDateSelector";
import Breadcrumb from "../features/Breadcrumb";
import { User } from "../features/User";
const Header = () => {
  return (
    <header className="bg-white">
    <div className="container mx-auto flex justify-between items-center py-5 border-b">
    <img src="/icons/logo-udr.svg" alt="Unión de representaciones" />
        <nav className="space-x-6 font-bold flex items-center">
          <a href="#home" className="hover:underline">Buscar transacción</a>
          <a href="#about" className="hover:underline">Políticas</a>
          <a href="#contact" className="hover:underline">Contáctenos</a>
          <SelectLanguage />
          <User />
        </nav>
      </div>
      <LocationAndDateSelector />
      <Breadcrumb />
    </header>
  );
};

export default Header;
