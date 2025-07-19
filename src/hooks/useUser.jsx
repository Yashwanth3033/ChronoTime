import React, { useState, useEffect } from "react";
import {getCurrentUser} from "../services/apiAuth";
import supabase from "../services/supabase";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadUser = async function () {
      setLoading(true);  
      try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (err) {
            setError(err.message || "Failed to fetch the user");
        } finally {
            setLoading(false);
        }
    };

    loadUser();
    
    const {data: listener} = supabase.auth.onAuthStateChange(
        function(_event, session) {
            if (session) {
              setUser(session.user);
            } else {
              setUser(null);
            }
            setLoading(false);
        }
    )

    const unsubscribe = listener.subscription.unsubscribe;

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };


  }, []);

  return {
    user: user,
    isLoading: loading,
    isAuthenticated: !!user && user?.role === "authenticated",
    error: error
  };
}
