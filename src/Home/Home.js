// External Modules
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import readXlsxFile from 'read-excel-file';

// Local Styles
import {
  HomeContainer,
  TitleContainer,
  Title,
  AddButton,
  List
} from 'Home/Home.styles';

// Global Functions and Components
import { derive } from 'global/functions';
import Entry from 'global/components/Entry/Entry';
import { Form } from 'global/components/Modal/Modal';

const Home = ({ data = [], selected = -1, currRoute, setRoute, pushEntry }) => {
  const [visible, setVisible] = useState(false);

  return data.length !== 0 && selected !== -1 ? (
    <HomeContainer>
      <TitleContainer>
        <Title>{data[selected].name.replace('AY', 'Academic Year')}</Title>
        <AddButton onClick={() => setVisible(true)}>Add new entry</AddButton>
      </TitleContainer>
      <List>
        {selected >= 0
          ? data[selected].entries.map(({ courseName, courseCode }, i) => (
              <Entry
                key={`Entries (${i}) ${courseName} and ${courseCode}`}
                data={['Course name', courseName, 'Course code', courseCode]}
              />
            ))
          : null}
      </List>
      {visible ? (
        <Form
          name={data[selected].name.replace('AY', 'Academic Year')}
          cancel={() => setVisible(false)}
          confirm={async ({ courseName, courseCode, facultyName, file }) => {
            if (
              courseName !== '' &&
              courseCode !== '' &&
              facultyName !== '' &&
              !_.isEqual(file, {})
            ) {
              let fileData = await readXlsxFile(file);
              pushEntry(
                _.cloneDeep({
                  courseName,
                  courseCode,
                  facultyName,
                  fileData
                })
              );
              setVisible(false);
            }
          }}
        />
      ) : null}
    </HomeContainer>
  ) : null;
};

const mapStoresToProps = derive({
  currRoute: 'appStore',
  setRoute: 'appStore',
  data: 'appStore',
  selected: 'appStore',
  pushEntry: 'appStore'
});

export { Home };
export default inject(mapStoresToProps)(observer(Home));
