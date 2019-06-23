// External Modules
import React from 'react';

const Router = ({currRoute, routes}) => {
  let res = null;

  for (let i=0; i<routes.length; i++) {
    let {name, component: Component} = routes[i];
    if (name.test(currRoute)) {
      res = <Component />;
      break;
    }
  }

  return res;
}

export default Router;