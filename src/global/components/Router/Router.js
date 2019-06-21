// External Modules
import React from 'react';
import _ from 'lodash';

const Router = ({currRoute, routes}) => {
  let res = null;

  _.forEach(routes, ({name, component: Component}) => {
    if (name===currRoute) {
      res = <Component />;
    }
  })

  return res;
}

export default Router;