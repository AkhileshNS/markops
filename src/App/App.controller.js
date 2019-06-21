// External Modules
import React from 'react';
import { observer, inject } from 'mobx-react';

// Global Functions and Database
import { derive } from 'global/functions';
import db from 'global/database';

class controller extends React.Component {
  componentDidMount() {
    // Request for data from DB here
  }

  render() {
    return null;
  }
}

const mapStoresToProps = derive({});

export { controller };
export default inject(mapStoresToProps)(observer(controller));
