import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const [user, loading] = useAuthState(auth);
    
    if (loading) {
        return <div>Cargando...</div>
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;