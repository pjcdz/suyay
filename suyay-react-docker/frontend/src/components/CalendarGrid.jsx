import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for admin view

// Define hours and days structure based on original PHP
const horasLabels = ["8 - 9", "9 - 10", "10 - 11", "11 - 12", "12 - 13", "13 - 14", "14 - 15", "15 - 16", "16 - 17", "17 - 18", "18 - 19", "19 - 20", "20 - 21", "21 - 22"];
const diasLabels = ["Horas", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."];
const diasCodigos = [1, 2, 3, 4, 5, 6]; // Corresponding to first digit of codHora

// Helper to generate codHora based on day index (0-5) and hour index (0-13)
const generateCodHora = (diaIndex, horaIndex) => {
  const dia = diasCodigos[diaIndex];
  const horaInicio = 8 + horaIndex;
  const horaFin = horaInicio + 1;
  // Format: DHHMM (e.g., Lunes 8-9 -> 10809)
  return parseInt(`${dia}${String(horaInicio).padStart(2, '0')}${String(horaFin).padStart(2, '0')}`);
};

// Simple color mapping for admin view based on DNI
const adminColors = [
  'bg-yellow-300 hover:bg-yellow-400',
  'bg-blue-300 hover:bg-blue-400',
  'bg-purple-300 hover:bg-purple-400',
  'bg-pink-300 hover:bg-pink-400',
  'bg-indigo-300 hover:bg-indigo-400',
  // Add more if needed
];
const getAdminColor = (dni, dniColorMap) => {
    if (!dni || dni === 0) return 'bg-green-200 hover:bg-green-300'; // Free slot color
    if (!dniColorMap[dni]) {
        // Assign a new color cyclically
        dniColorMap[dni] = adminColors[Object.keys(dniColorMap).length % adminColors.length];
    }
    return dniColorMap[dni];
};


function CalendarGrid({ selectedConsultorio, isAdmin }) { // Add isAdmin prop
  const [horasData, setHorasData] = useState({}); // Store data keyed by codHora
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the DNI color map so it persists across renders but resets on data fetch
   const dniColorMap = useMemo(() => ({}), [horasData]);

  useEffect(() => {
    if (!selectedConsultorio) return;

    const fetchHoras = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the backend service name if running inside docker network,
        // or localhost if accessing directly via exposed port (adjust as needed)
        // For development with docker-compose, use the service name.
        // If frontend runs outside docker, use http://localhost:3001
        const apiUrl = `/api/horasalquiladas/${selectedConsultorio}`; // Vite proxy will handle this if configured
        // const apiUrl = `http://localhost:3001/api/horasalquiladas/${selectedConsultorio}`; // Or direct URL

        console.log(`Fetching data from: ${apiUrl}`); // Debug log
        const response = await axios.get(apiUrl);

        // Process data into a map for easy lookup
        const dataMap = response.data.reduce((acc, hora) => {
          acc[hora.codHora] = hora;
          return acc;
        }, {});
        setHorasData(dataMap);

      } catch (err) {
        console.error("Error fetching horas data:", err);
        setError('Error al cargar los datos del calendario.');
        setHorasData({}); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchHoras();
  }, [selectedConsultorio]); // Refetch when selectedConsultorio changes

  if (loading) {
    return <div className="text-center p-4">Cargando calendario...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }


  return (
    <div className="bg-white shadow rounded p-4 overflow-x-auto">
      <div className="grid grid-cols-7 gap-px border border-gray-200 bg-gray-200 min-w-[600px]"> {/* Added min-width */}
        {/* Header Row */}
        {diasLabels.map((diaLabel, index) => (
          <div key={index} className="bg-gray-100 p-2 text-center font-semibold text-sm">
            {diaLabel}
          </div>
        ))}

        {/* Calendar Cells */}
        {horasLabels.map((horaLabel, horaIndex) => (
          <React.Fragment key={horaIndex}>
            {/* Hour Label Column */}
            <div className="bg-gray-100 p-2 text-center font-semibold text-sm flex items-center justify-center">
              {horaLabel}
            </div>
            {/* Day Columns */}
            {diasCodigos.map((_, diaIndex) => {
              const codHora = generateCodHora(diaIndex, horaIndex);
              const horaInfo = horasData[codHora];
              const isOcupado = horaInfo?.isOcupado;
              const isPagado = horaInfo?.isPagado;
              const dni = horaInfo?.dni;

              let cellContent = null;
              let cellClass = 'p-1 h-10 flex items-center justify-center text-xs transition-colors duration-150'; // Adjusted padding

              if (isAdmin) {
                cellClass += ` ${getAdminColor(dni, dniColorMap)}`;
                if (isOcupado && !isPagado) {
                    cellContent = <span className="font-bold text-red-700">❌</span>; // Indicator for not paid
                }
                 // Wrap cell in Link for admin view
                 return (
                    <Link
                        key={`${diaIndex}-${horaIndex}`}
                        to={`/admin/edit/${selectedConsultorio}/${codHora}`}
                        className={`${cellClass} block`} // Make link fill the cell
                    >
                        {cellContent}
                    </Link>
                 );

              } else {
                 // Public view styling
                 cellClass += ` ${isOcupado ? 'bg-red-300 hover:bg-red-400' : 'bg-green-200 hover:bg-green-300'}`;
                 return (
                    <div key={`${diaIndex}-${horaIndex}`} className={cellClass}>
                        {/* Public view doesn't show content inside */}
                    </div>
                 );
              }
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;
