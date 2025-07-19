import React from 'react'
import AppLayout from './components/AppLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Watches from './pages/Watches';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from './components/AdminRoute';
import AdminLayout from "./components/AdminLayout";
import AddWatch from "./adminPages/AddWatch";

const App = function () {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="watches" element={<Watches />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="admin-dashboard" element={<Admin />} />
            <Route path="add-watch" element={<AddWatch />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>

    <Toaster
    toastOptions={{
      duration: 3000,
      success: {
        duration: 3000
      },
      error: {
        duration: 4000
      }
    }}
  />

    </>
  )
}

export default App;