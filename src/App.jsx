import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUserContext } from "./context/UserContext";

const App = () => {
  const { user } = useUserContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
