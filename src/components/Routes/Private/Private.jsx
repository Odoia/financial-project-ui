import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import StoreContext from "../../../Store/Context";

const RoutesPrivate = ({ component: Component, ...rest }) => {
  const { authToken } = useContext(StoreContext);

  return (
  <Route
    {...rest}
    render={() => authToken 
      ?<Component {...rest} />
      :<Redirect to="/login" />
    }
  />
  )
}

export default RoutesPrivate;
