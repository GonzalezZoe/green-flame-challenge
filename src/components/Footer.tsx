import { Newsletter } from "../features/Newsletter";
const Footer = () => {
  return (
    <footer className="bg-white">
       <Newsletter/>
      <div className="container flex flex-col mx-auto text-center">
        <div className="border-b py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1 flex flex-col items-start">
            <img src="/icons/logo-udr.svg" alt="Logo Unión de Representaciones" />
            <div className="flex gap-4 items-center mt-2">
                <span className="bg-soft-blue p-2 w-8 h-8 rounded"><img src="/icons/whatsapp-icon.svg" alt="Logo Whatsapp"/></span>
                <span className="bg-soft-blue p-2 w-8 h-8 rounded"><img src="/icons/instagram-icon.svg" alt="Logo Instagram"/></span>
                <span className="bg-soft-blue p-2 w-8 h-8 rounded"><img src="/icons/facebook-icon.svg" alt="Logo Facebook"/></span>
                <span className="bg-soft-blue p-2 w-8 h-8 rounded"><img src="/icons/linkedin-icon.svg" alt="Logo LinkedIn"/></span>
                <span className="bg-soft-blue p-2 w-8 h-8 rounded"><img src="/icons/xing-icon.svg" alt="Logo Xing"/></span>
            </div>
            </div>
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
                <h6 className="font-title font-bold font-soft-blue mb-2">¿Necesitas ayuda?</h6>
                <ul className="text-sm space-y-1">
                <li><p>union@udr.com.co</p></li>
                <li><p>Teléfono: +57 601 589 7880 / 99</p></li>
                <li><p>Calle 20 No. 4-55, Piso 3, Bogotá</p></li>
                </ul>
            </div>
            <div>
                <h6 className="font-title font-bold font-soft-blue mb-2">Instructivos</h6>
                <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">Disney</a></li>
                <li><a href="#" className="hover:underline">Universal</a></li>
                <li><a href="#" className="hover:underline">Avis Budget</a></li>
                <li><a href="#" className="hover:underline">Terrawind</a></li>
                </ul>
            </div>

            <div>
                <h6 className="font-title font-bold font-soft-blue mb-2">Información</h6>
                <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">Aviso legal</a></li>
                <li><a href="#" className="hover:underline">Políticas de privacidad</a></li>
                <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
                <li><a href="#" className="hover:underline">Ver mis transacciones</a></li>
                </ul>
            </div>

            <div>
                <h6 className="font-title font-bold font-soft-blue mb-2">Nosotros</h6>
                <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">¿Quiénes somos?</a></li>
                <li><p>NIT: 860535628-1</p></li>
                <li><p>Registro Nacional de Turismo No. 1041</p></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
        <div className="flex flex-wrap justify-around items-center gap-4 py-8 border-b">
            <img src="/logos/anato-logo.png" alt="Logo anato"/>
            <img src="/logos/camara-colombiana-comercio-logo.png" alt="Logo Camara Colombiana Comercio"/>
            <img src="/logos/superintendencia-logo.png" alt="Logo Super Intendencia"/>
            <img src="/logos/super-transporte-logo.png" alt="Logo Super Transporte"/>
            <img src="/icons/iata-logo.svg" alt="Logo Iata"/>
        </div>
        <div className="flex justify-between items-center py-8">
            <p className="text-sm">
            © {new Date().getFullYear()} Green Flame. Todos los derechos reservados.
            </p>
        <img src="/icons/greenFlame-logo.svg" alt="Desarrollado por Green Flame"/>
        </div>
          </div>
    </footer>
    ) }

    export default Footer;