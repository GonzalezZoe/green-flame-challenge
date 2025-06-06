const LocationAndDateSelector = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="container mx-auto flex justify-center items-center space-x-4 py-4">
            <div className="rounded flex grey-background gap-10 py-2 px-5 font-medium">
             <span> Miami International Airport (MIA) </span>
              <span>  {'>'} </span>
            <span> Orlando International Airport (MCO) </span>  
            </div>
             <div className="rounded flex grey-background gap-10 py-2 px-5 font-medium">
             <span> 20 septiembre 2025, 12:00 </span>
              <span>  {'>'} </span>
            <span> 30 septiembre 2025, 18:00 </span>  
            </div>
             <button className="bg-soft-blue text-white py-2 px-5 rounded-[8px] font-medium">Modificar</button>
            </div>
        </div>
    );
}

export default LocationAndDateSelector;