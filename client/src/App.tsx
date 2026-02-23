import './App.css'
import { Login } from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/Task';
import { NavBar } from './components/NavBar';
import ProtectedRoute from './routes/Protected';
import { useState } from 'react';


function App() {

  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
  };

  return (
    <>
      <BrowserRouter>
        {
          token && <NavBar onLogout={handleLogout} />
        }
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />

          <Route path='/tasks' element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          } />
          <Route path='/create' element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
