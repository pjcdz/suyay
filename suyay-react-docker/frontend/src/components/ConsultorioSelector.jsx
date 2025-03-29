import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConsultorioSelector({ selectedConsultorio, onSelectConsultorio }) {
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch consultorios from API
    const fetchConsultorios = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/consultorios');
        
        // Transform data to match expected format
        const formattedData = response.data.map(item => ({
          id: item.codConsultorio,
          nombre: item.descripcion
        }));
        
        setConsultorios(formattedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching consultorios:', err);
        setError('Error al cargar consultorios');
        // Fallback to hardcoded values if API fails
        setConsultorios([
          { id: 1, nombre: 'Consultorio 1' },
          { id: 2, nombre: 'Consultorio 2' },
          { id: 3, nombre: 'Consultorio 3' },
          { id: 4, nombre: 'Consultorio 4' },
          { id: 5, nombre: 'Consultorio 5' },
          { id: 6, nombre: 'Consultorio 6' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultorios();
  }, []);

  const handleChange = (event) => {
    onSelectConsultorio(parseInt(event.target.value));
  };

  if (loading) {
    return (
      <div className="mb-4 p-4 bg-white shadow rounded">
        <p>Cargando consultorios...</p>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 bg-white shadow rounded">
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      <label htmlFor="consultorioSelect" className="block text-sm font-medium text-gray-700 mb-1">
        Seleccionar Consultorio:
      </label>
      <select
        id="consultorioSelect"
        value={selectedConsultorio}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {consultorios.map((consultorio) => (
          <option key={consultorio.id} value={consultorio.id}>
            {consultorio.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ConsultorioSelector;
