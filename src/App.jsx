import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/client/Home";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState({
    _id: "64fc744a62a8d62b7de34a90",
    name: "Gustavo",
    lastname: "Guerrero Fandiño",
    birthday: "2023-09-09T04:11:14.528Z",
    gender: "Masculino",
    type_of_document: "Cedula",
    number_of_document: "1234093091",
    email: "gustavo@gguerrero.co",
    phone_number: "3008913618",
    password: "admin123_",
    rol: "Usuario",
    __v: 0,
  });

  // useEffect(() => {
  //   const fillUser = () => {
  //     setUser({
  //       _id: "64fc744a62a8d62b7de34a90",
  //       name: "Gustavo",
  //       lastname: "Guerrero Fandiño",
  //       birthday: "2023-09-09T04:11:14.528Z",
  //       gender: "Masculino",
  //       type_of_document: "Cedula",
  //       number_of_document: "1234093091",
  //       email: "gustavo@gguerrero.co",
  //       phone_number: "3008913618",
  //       password: "admin123_",
  //       rol: "Administrador",
  //       __v: 0,
  //     });
  //   };
  //   if (!user) {
  //     fillUser();
  //   }
  // }, [user]);

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
