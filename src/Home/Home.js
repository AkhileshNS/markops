// External Modules
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import readXlsxFile from 'read-excel-file';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

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

const EntryMenu = () => (
  <ContextMenu id="entry-menu">
    <MenuItem onClick={(e, data) => console.log(`Edit ${data.courseCode}`)}>
      Edit
    </MenuItem>
    <MenuItem onClick={(e, data) => console.log(`Delete ${data.courseCode}`)}>
      Delete
    </MenuItem>
  </ContextMenu>
);

const Home = ({ data = [], selected = -1, currRoute, setRoute, pushEntry, setEntrySelected }) => {
  const [visible, setVisible] = useState(false);

  return data.length !== 0 && selected !== -1 ? (
    <HomeContainer>
      <TitleContainer>
        <Title>{data[selected].batch}</Title>
        <AddButton onClick={() => setVisible(true)}>Add new entry</AddButton>
      </TitleContainer>
      <List>
        {selected >= 0
          ? data[selected].entries.map(({ courseName, courseCode }, i) => (
              <ContextMenuTrigger
                id="entry-menu"
                key={`Entries (${i}) ${courseName} and ${courseCode}`}
                courseCode={courseCode}
                collect={({courseCode}) => ({courseCode})}>
                <Entry
                  data={['Course name', courseName, 'Course code', courseCode]}
                  passedProps={{
                    onClick() {
                      setEntrySelected(i);
                      setRoute(`${currRoute}/${data[selected].batch}/${courseCode}`);
                    }
                  }}
                />
              </ContextMenuTrigger>
            ))
          : null}
      </List>
      {visible ? (
        <Form
          name={data[selected].batch}
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
      <EntryMenu />
    </HomeContainer>
  ) : null;
};

const mapStoresToProps = derive({
  currRoute: 'appStore',
  setRoute: 'appStore',
  data: 'appStore',
  selected: 'appStore',
  pushEntry: 'appStore',
  setEntrySelected: "appStore"
});

export { Home };
export default inject(mapStoresToProps)(observer(Home));
