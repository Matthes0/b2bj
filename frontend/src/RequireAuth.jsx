import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "./api/auth";

function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Sprawdzanie autoryzacji...</div>;
  if (!user) return <Navigate to="/user" state={{ from: location }} replace />;

  return children;
}

export default RequireAuth;