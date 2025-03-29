import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonasTable() {
  const [personasData, setPersonasData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = '/api/personas'; // Use proxy
        console.log(`Fetching data from: ${apiUrl}`);
        const response = await axios.get(apiUrl);
        setPersonasData(response.data);
      } catch (err) {
        console.error("Error fetching personas data:", err);
        setError('Error al cargar los datos de las personas.');
        setPersonasData({});
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []); // Fetch only once on component mount

  if (loading) {
    return <div className="text-center p-4">Cargando personas...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  const personasArray = Object.entries(personasData); // Convert object to array for mapping

  return (
    <div className="bg-white shadow rounded p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Lista de Personas con Deuda</h2>
      {personasArray.length === 0 ? (
        <p>No hay personas con deuda para mostrar.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">DNI</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Pagado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Deuda (Horas)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ocupación</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {personasArray.map(([dni, persona]) => (
              <tr key={dni}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{dni}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{persona.nombre || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{persona.credito}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                  {persona.deuda} ({persona.horas}hs)
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {Object.entries(persona.ocupacion).map(([consultorio, dias]) => (
                    <div key={consultorio} className="mb-2 last:mb-0">
                      <strong className="font-semibold">{consultorio}:</strong>
                      {Object.entries(dias).map(([dia, horas]) => (
                        <div key={dia} className="ml-2">
                          <span className="font-medium">{dia}:</span>
                          <ul className="list-disc list-inside ml-2">
                            {horas.map((hora, index) => (
                              <li key={index}>{hora}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PersonasTable;
