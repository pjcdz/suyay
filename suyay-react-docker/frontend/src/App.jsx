import React, { useState } from 'react';
import { Routes, Route, Link, Outlet, Navigate, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import ConsultorioSelector from './components/ConsultorioSelector';
import CalendarGrid from './components/CalendarGrid';
import LoginForm from './components/LoginForm';
import PersonasTable from './components/PersonasTable';
import EditForm from './components/EditForm';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout component to share structure
function Layout() {
  const [selectedConsultorio, setSelectedConsultorio] = useState(1);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSelectConsultorio = (id) => {
    setSelectedConsultorio(id);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Suyay Consultorios
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Calendario Público</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
              <button 
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600 hover:underline">Iniciar Sesión</Link>
          )}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Only show consultorio selector on appropriate pages */}
        {location.pathname === '/' || location.pathname.startsWith('/admin') && !location.pathname.includes('/personas') ? (
          <ConsultorioSelector
            selectedConsultorio={selectedConsultorio}
            onSelectConsultorio={handleSelectConsultorio}
          />
        ) : null}
        
        {/* Outlet renders the matched child route component passing the selectedConsultorio */}
        <Outlet context={{ selectedConsultorio }} />
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Suyay Consultorios
      </footer>
    </div>
  );
}

// Component for the Public Calendar View
function PublicCalendarView() {
  const { selectedConsultorio } = useOutletContext(); // Get context from Layout
  return <CalendarGrid selectedConsultorio={selectedConsultorio} isAdmin={false} />;
}

// Component for the Admin Calendar View
function AdminCalendarView() {
  const { selectedConsultorio } = useOutletContext(); // Get context from Layout
  return (
    <div>
      <div className="mb-4 text-right">
        <Link to="/admin/personas" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ver Personas
        </Link>
      </div>
      <CalendarGrid selectedConsultorio={selectedConsultorio} isAdmin={true} />
    </div>
  );
}

// Component for the Personas View
function AdminPersonasView() {
  return <PersonasTable />;
}

// Component for the Edit View
function AdminEditView() {
  return <EditForm />;
}

// Main App component with AuthProvider and routes
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<PublicCalendarView />} />
          <Route path="login" element={<LoginForm />} />
          
          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin">
              <Route index element={<AdminCalendarView />} />
              <Route path="personas" element={<AdminPersonasView />} />
              <Route path="edit/:codConsultorio/:codHora" element={<AdminEditView />} />
            </Route>
          </Route>
          
          {/* Not found route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
