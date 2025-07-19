import React, {useState} from 'react'
import {Link} from "react-router-dom";
import useUser from '../hooks/useUser';
import toast from 'react-hot-toast';
import { logoutUser } from '../services/apiAuth';

const Header = ({className}) => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    
    const {isAuthenticated, user} = useUser();
    const handleLogout = async function () {
        try {
            setLogoutLoading(true);
            await logoutUser();
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLogoutLoading(false);
        }
    }

  return (
    <header className={className}>
        <nav className="px-8 py-4 bg-neutral-900 flex justify-between items-center">
            <h1 className="font-bold text-2xl tracking-tight"><Link to={"/"} >ChronoTime</Link></h1>
            <ul className="flex gap-x-6 font-semibold text-lg items-center">
                <li className="">
                    <Link to={"watches"} className='hover:underline hover:decoration-sky-600 hover:text-sky-600 transition-all duration-200'>
                        Browse Watches
                    </Link>
                </li>
                <li className="">
                    <Link to={"about"} className='hover:underline hover:decoration-sky-600 hover:text-sky-600 transition-all duration-200'>
                        About
                    </Link>
                </li>
                {(isAuthenticated && user?.user_metadata.userRole === "admin") && (
                    <li className="">
                        <Link to={"admin-dashboard"} className='hover:underline hover:decoration-sky-600 hover:text-sky-600 transition-all duration-200'>
                            Admin
                        </Link>
                    </li>
                )}
                
                {!isAuthenticated ? (
                    <>
                    <li className="">
                        <Link to={"login"} className='rounded px-4 py-1.5 bg-sky-600 hover:bg-sky-700 duration-200 transition-all'>
                            Login
                        </Link>
                    </li>
                    <li className="">
                        <Link to={"register"} className='rounded px-4 py-1.5 bg-blue-600 hover:bg-blue-700 duration-200 transition-all'>
                            Register
                        </Link>
                    </li>
                </>
                ) : (
                    <li className="">
                        <button onClick={handleLogout} disabled={logoutLoading} className='rounded cursor-pointer px-4 py-1.5 bg-blue-600 hover:bg-blue-700 duration-200 transition-all disabled:animate-pulse disabled:cursor-not-allowed'>
                            Logout
                        </button>
                    </li>
                )}
                

            </ul>
        </nav>
    </header>
  )
}

export default Header