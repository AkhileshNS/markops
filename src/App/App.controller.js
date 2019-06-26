// External Modules
import React from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

// Global Functions and Database
import { derive } from 'global/functions';
import db from 'global/database';

class controller extends React.Component {
  componentDidMount() {
    // Request for data from DB here
    db.entries.getAll().then(({err, entries}) => {
      if (err===null && entries.length>0) {
        let data = [];
        for (let i=0; i<entries.length; i++) {
          let {batch, courseName, courseCode, facultyName, fileData} = _.cloneDeep(entries[i]);
          let index = _.findIndex(data, {batch});
          if (index===-1) {
            data.push({
              batch,
              selected: -1,
              entries: [{
                courseName, courseCode, facultyName, fileData
              }] 
            });
          } else {
            data[index].entries.push({
              courseName, courseCode, facultyName, fileData
            });
          }
        }
        this.props.setData(data);
      }
    });
  }

  render() {
    return null;
  }
}

const mapStoresToProps = derive({
  setData: "appStore"
});

export { controller };
export default inject(mapStoresToProps)(observer(controller));
