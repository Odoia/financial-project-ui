import { createContext } from "react";

const StoreContext = createContext({
  authToken: null,
  setToken: () => {},
})

export default StoreContext;
