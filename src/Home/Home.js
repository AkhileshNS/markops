// External Modules
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import readXlsxFile from 'read-excel-file';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

// Local Styles and Functions
import {
  HomeContainer,
  TitleContainer,
  Title,
  AddButton,
  List,
  DashBoard,
  DashBoardTitle,
  Scores,
  Score,
  ScoreTitle,
  ScoreValue
} from './Home.styles';
import {getStats, getPO} from './Home.functions';

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
  const [error, setError] = useState("");
  const PO = getPO(selected>=0 ?
    "entries" in data[selected] ? _.cloneDeep(data[selected].entries) : [] : []
  );

  const confirm = async ({ courseName, courseCode, facultyName, files }) => {
    if (courseName !== '' && courseCode !== '' && facultyName !== '' 
    && !_.isEqual(files[0], {}) && !_.isEqual(files[1], {}) && visible
    && _.findIndex(data[selected].entries,{courseCode})===-1) {
      let fileData = await readXlsxFile(files[0]);
      let mappingData = await readXlsxFile(files[1]);
      let res = getStats(fileData);

      pushEntry(_.cloneDeep({
        courseName,
        courseCode,
        facultyName,
        ...res,
        mappingData
      }));
      setVisible(false);
      setError("");
    }
    if (visible) {
      if (courseCode==="") {
        setError("Coursecode cannot be empty");
      } else if (selected>=0 && _.findIndex(data[selected].entries,{courseCode})!==-1) {
        setError("This course code has already been taken");
      } else if (courseName==="") {
        setError("Coursename cannot be empty");
      } else if (facultyName==="") {
        setError("Facultyname cannot be empty");
      } else if (_.isEqual(files[0], {})) {
        setError("You must upload a marks sheet");
      } else if (_.isEqual(files[1], {})) {
        setError("You must upload a CO/PO mapping sheet");
      }
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
      if (!_.isEqual(files[0], {})) {
        let fileData = await readXlsxFile(files[0]);
        let {contOutputs, avgOutputs} = getStats(_.cloneDeep(fileData));
        newEntry.contOutputs = contOutputs;
        newEntry.avgOutputs = avgOutputs;
      }
      if (!_.isEqual(files[1], {})) {
        let mappingData = await readXlsxFile(files[1]);
        newEntry.mappingData = mappingData;
      }
      updateEntry(update.courseCode, newEntry);
      setUpdate({visible: false})
    }
  };

  return data.length !== 0 && selected !== -1 ? (
    <HomeContainer>
      <TitleContainer>
        <Title>{data[selected].batch}</Title>
        <AddButton onClick={() => setVisible(true)}>Add new entry</AddButton>
      </TitleContainer>
      {(PO.length===0 ? null : <DashBoard>
        <DashBoardTitle>Program Outcome Count Attainment</DashBoardTitle>
        <Scores>
          {PO.map(({PO, count}, i) => <Score key={PO + i}>
            <ScoreTitle>{PO.replace(/program outcome /i, "PO")}</ScoreTitle>
            <ScoreValue>{Math.round(count.percentage * 100) / 100}</ScoreValue>
          </Score>)}
        </Scores>
      </DashBoard>)}
      {(PO.length===0 ? null : <DashBoard>
        <DashBoardTitle>Program Outcome Average Attainment</DashBoardTitle>
        <Scores>
          {PO.map(({PO, average}, i) => <Score key={PO + i}>
            <ScoreTitle>{PO.replace(/program outcome /i, "PO")}</ScoreTitle>
            <ScoreValue>{Math.round(average.percentage * 100) / 100}</ScoreValue>
          </Score>)}
        </Scores>
      </DashBoard>)}
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
          cancel={visible ? () => setVisible(false) : () => setUpdate({visible: false})}
          prevCourseCode={update.visible ? update.courseCode : ""}
          prevCourseName={update.visible ? update.courseName : ""}
          prevFacultyName={update.visible ? update.facultyName : ""}
          confirm={confirm}
          error={update.visible ? "" : error}
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
