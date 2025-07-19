import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const AppLayout = function() {
  return (
    <>
    <Header />
    <main className='max-w-screen-2xl mx-auto'>
      <Outlet />
    </main>

    
    </>
  )
}

export default AppLayout;