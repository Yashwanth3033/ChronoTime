import React, {useEffect} from "react";
import Admin from "../pages/Admin";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";


function AdminRoute() {
  const { user, isAuthenticated, isLoading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async function () {
      if (isLoading) {
        return;
      }
      
      // console.log("user: ", user && user);
      if (error) {
        toast.error(error);
        return;
      }

      if (!isAuthenticated) {
        navigate("/login", {replace: true});
        return;
      }

      if (user?.user_metadata.userRole !== "admin") {
        navigate("/", {replace: true});
        toast.error("Action Not Allowed!");
        return;
      }

    }

    fetchUser();
  }, [error, isAuthenticated, isLoading, user, navigate]);


  if (isLoading) {
    return <div className="font-bold text-5xl">Loading...</div>
  }

  return <Outlet />


}



export default AdminRoute;