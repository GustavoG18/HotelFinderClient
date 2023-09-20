import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [state, setState] = useState(
    storedData?.rol
      ? storedData
      : {
          rol: "Usuario",
        }
  );

  return (
    <UserContext.Provider
      value={{
        user: { ...state },
        setUser: (user) => setState(user),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
