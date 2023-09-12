import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

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
