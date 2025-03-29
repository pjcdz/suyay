import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditForm() {
  const { codConsultorio, codHora } = useParams(); // Get params from URL
  const navigate = useNavigate(); // For navigation after submit

  const [formData, setFormData] = useState({
    dni: '',
    name: '', // Corresponds to 'nombre' in backend/db
    credito: '', // Corresponds to 'credito' in backend/db
  });
  const [initialData, setInitialData] = useState(null); // Store initially fetched data
  const [deudaCalculada, setDeudaCalculada] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' }); // For success/error messages

  // Fetch initial data for the form
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSubmitStatus({ message: '', type: '' }); // Clear previous submit status
      try {
        const apiUrl = `/api/horasalquiladas/${codConsultorio}/${codHora}`;
        console.log(`Fetching edit data from: ${apiUrl}`);
        const response = await axios.get(apiUrl);
        const data = response.data;
        setInitialData(data);
        setFormData({
          dni: data.dni === 0 ? '' : String(data.dni), // Handle DNI 0 case
          name: data.nombre || '',
          credito: data.credito === 0 ? '' : String(data.credito), // Handle credito 0
        });
        setDeudaCalculada(data.deuda); // Set calculated deuda from backend
      } catch (err) {
        console.error("Error fetching edit data:", err);
        setError('Error al cargar los datos para editar.');
        if (err.response && err.response.status === 404) {
             setError('No se encontró el horario especificado.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [codConsultorio, codHora]); // Refetch if params change

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Basic numeric validation for DNI and Credito
    if ((name === 'dni' || name === 'credito') && value !== '' && !/^\d*$/.test(value)) {
        return; // Prevent non-numeric input
    }
    setFormData(prev => ({ ...prev, [name]: value }));

    // Disable name/credito if DNI is empty or 0 (similar to original JS)
     if (name === 'dni') {
         const dniValue = value.trim();
         const nameInput = document.getElementsByName('name')[0];
         const creditInput = document.getElementsByName('credito')[0];
         if (nameInput && creditInput) {
             if (dniValue === '' || dniValue === '0') {
                 nameInput.setAttribute('readonly', true);
                 creditInput.setAttribute('readonly', true);
                 // Optionally clear name/credito when DNI is cleared
                 // setFormData(prev => ({ ...prev, name: '', credito: '' }));
             } else {
                 nameInput.removeAttribute('readonly');
                 creditInput.removeAttribute('readonly');
             }
         }
     }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Indicate submission process
    setError(null);
    setSubmitStatus({ message: '', type: '' });

    // Prepare data for PUT request (ensure numbers are numbers)
    const submitData = {
        dni: formData.dni.trim() === '' ? 0 : parseInt(formData.dni),
        name: formData.name.trim(),
        credito: formData.credito.trim() === '' ? 0 : parseInt(formData.credito),
    };

    try {
      const apiUrl = `/api/horasalquiladas/${codConsultorio}/${codHora}`;
      console.log(`Submitting edit data to: ${apiUrl}`, submitData);
      const response = await axios.put(apiUrl, submitData);
      setSubmitStatus({ message: response.data.message || 'Guardado exitosamente!', type: 'success' });
      // Optionally navigate back after a short delay
      setTimeout(() => {
        navigate(`/admin?consultorio=${codConsultorio}`); // Go back to admin calendar for the same consultorio
      }, 1500);

    } catch (err) {
      console.error("Error submitting edit data:", err);
      const message = err.response?.data?.message || 'Error al guardar los cambios.';
      setError(message); // Show specific error from backend if available
      setSubmitStatus({ message: message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !submitStatus.message) { // Show loading only if not showing submit status
    return <div className="text-center p-4">Cargando formulario...</div>;
  }

  // Show general error if initial fetch failed
  if (error && !initialData) {
     return <div className="text-center p-4 text-red-600">{error}</div>;
  }


  return (
    <div className="bg-white shadow rounded p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Editar Horario</h2>
      <p className="mb-2 text-sm text-gray-600">Consultorio: {codConsultorio}</p>
      {/* TODO: Fetch and display hora description */}
      <p className="mb-4 text-sm text-gray-600">Código Hora: {codHora}</p>

      {submitStatus.message && (
        <div className={`p-3 mb-4 rounded text-center ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}
       {/* Show specific submit error if it exists */}
       {error && submitStatus.type === 'error' && (
         <div className="p-3 mb-4 rounded text-center bg-red-100 text-red-800">
           {error}
         </div>
       )}


      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            inputMode="numeric" // Hint for mobile keyboards
            pattern="[0-9]*"    // Pattern for basic validation
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            readOnly={formData.dni === '' || formData.dni === '0'} // Set readonly based on DNI
          />
        </div>
        <div className="mb-4">
          <label htmlFor="credito" className="block text-sm font-medium text-gray-700 mb-1">Monto Pagado</label>
          <input
            type="text"
            id="credito"
            name="credito"
            value={formData.credito}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            inputMode="numeric"
            pattern="[0-9]*"
             readOnly={formData.dni === '' || formData.dni === '0'} // Set readonly based on DNI
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deuda" className="block text-sm font-medium text-gray-700 mb-1">Monto a Pagar Mensualmente</label>
          <input
            type="text"
            id="deuda"
            name="deuda"
            value={deudaCalculada} // Display calculated deuda
            readOnly // Always read-only
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
           <Link
             to={`/admin?consultorio=${codConsultorio}`} // Link back to admin calendar for context
             className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
             Cancelar
           </Link>
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
