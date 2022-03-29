import React from "react";
import Context from "./Context.js"
import useStorage from "../utils/useStorage.js";


const StoreProvider = ({ children }) => {
  const [authToken, setToken] = useStorage('authToken')

  return(
    <Context.Provider
      value={{
        authToken,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default StoreProvider;
