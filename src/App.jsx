import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUserContext } from "./context/UserContext";
import { useEffect } from "react";

const App = () => {
  const { user } = useUserContext();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={user.rol === "Usuario"}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={user.rol === "Administrador"}>
                <HomeAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
