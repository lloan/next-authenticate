import {createContext} from "react";
import {MyAppContext} from "../";

const defaultAppContext = {
  user: undefined,
  setUser: () => {
    return;
  },
  clearUser: () => {
    return;
  },
};

const AppContext = createContext<MyAppContext>(defaultAppContext);

export default AppContext;
