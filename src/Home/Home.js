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
import { Form, Dialog } from 'global/components/Modal/Modal';

const EntryMenu = () => (
  <ContextMenu id="entry-menu">
    <MenuItem onClick={(e, data) => data.setUpdate({
      visible: true,
      courseCode: data.courseCode,
      courseName: data.courseName,
      facultyName: data.facultyName
    })}>
      Edit
    </MenuItem>
    <MenuItem onClick={(e, data) => data.setDeletion(data.courseCode)}>
      Delete
    </MenuItem>
  </ContextMenu>
);

const Home = ({ 
  data = [], 
  selected = -1, 
  currRoute, 
  setRoute, 
  pushEntry, 
  updateEntry,
  deleteEntry, 
  setEntrySelected 
}) => {
  const [visible, setVisible] = useState(false);
  const [deletion, setDeletion] = useState(""); // deletion holds a courseCode
  const [update, setUpdate] = useState({visible: false}); // update contains an entry

  return data.length !== 0 && selected !== -1 ? (
    <HomeContainer>
      <TitleContainer>
        <Title>{data[selected].batch}</Title>
        <AddButton onClick={() => setVisible(true)}>Add new entry</AddButton>
      </TitleContainer>
      <List>
        {selected >= 0
          ? data[selected].entries.map(({ courseName, courseCode, facultyName }, i) => (
              <ContextMenuTrigger
                id="entry-menu"
                key={`Entries (${i}) ${courseName} and ${courseCode}`}
                courseCode={courseCode}
                courseName={courseName}
                facultyName={facultyName}
                setDeletion={setDeletion}
                setUpdate={setUpdate}
                collect={({courseCode, courseName, facultyName, setDeletion, setUpdate}) => 
                ({courseCode, courseName, facultyName, setDeletion, setUpdate})}>
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
      {visible || update.visible ? (
        <Form
          name={data[selected].batch}
          cancel={() => setVisible(false)}
          prevCourseCode={update.visible ? update.courseCode : ""}
          prevCourseName={update.visible ? update.courseName : ""}
          prevFacultyName={update.visible ? update.facultyName : ""}
          confirm={async ({ courseName, courseCode, facultyName, file }) => {
            if (courseName !== '' && courseCode !== '' && facultyName !== '' && !_.isEqual(file, {})
            && visible) {
              let fileData = await readXlsxFile(file);
              pushEntry(_.cloneDeep({
                courseName,
                courseCode,
                facultyName,
                fileData
              }));
              setVisible(false);
            }
            if (update.visible) {
              let newEntry = {};
              if (courseCode!=="") {
                newEntry.courseCode = courseCode;
              }
              if (courseName!=="") {
                newEntry.courseName = courseName;
              }
              if (facultyName!=="") {
                newEntry.facultyName = facultyName;
              }
              if (!_.isEqual(file, {})) {
                let fileData = await readXlsxFile(file);
                newEntry.fileData = fileData;
              }
              updateEntry(update.courseCode, newEntry);
              setUpdate({visible: false})
            }
          }}
        />
      ) : null}
      {deletion!=="" ? <Dialog 
        message="Are you sure you want to delete this entry?"
        confirm={() => {
          deleteEntry(deletion);
          setDeletion("");
        }}
        cancel={() => setDeletion("")}
      /> : null}
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
  updateEntry: 'appStore',
  deleteEntry: 'appStore',
  setEntrySelected: "appStore"
});

export { Home };
export default inject(mapStoresToProps)(observer(Home));
