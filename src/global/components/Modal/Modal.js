// External Modules
import React, { useState, Fragment } from 'react';
import Files from 'react-files';
import _ from 'lodash';
import { produce } from 'immer';

// Local Styles
import {
  ModalContainer,
  DialogContainer,
  DialogMessage,
  DialogOptions,
  DialogButton,
  DialogInput,
  FormMessage
} from './Modal.styles';

// Global Component
import Backdrop from 'global/components/Backdrop/Backdrop';

const Modal = ({ children }) => <ModalContainer>{children}</ModalContainer>;

let Dialog = ({ message, confirm, cancel }) => <Fragment>
  <Backdrop onClick={cancel} />
  <Modal>
    <DialogContainer>
      <DialogMessage>
        {
          /* Are you sure you wish to delete this folder (Note. All the entries
        inside the folder will be deleted as well) ? */ message
        }
      </DialogMessage>
      <DialogOptions>
        <DialogButton onClick={() => confirm()}>Confirm</DialogButton>
        <DialogButton onClick={cancel}>Cancel</DialogButton>
      </DialogOptions>
    </DialogContainer>
  </Modal>
</Fragment>;

let Renamer = ({ message, prevName = '', confirm, cancel }) => {
  const [value, setValue] = useState(prevName);

  return <Fragment>
    <Backdrop onClick={cancel} />
    <Modal>
      <DialogContainer>
        <DialogMessage>
          {/*Enter the new name for your folder:-*/ message}
        </DialogMessage>
        <DialogInput
          type='text'
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
        <DialogOptions>
          <DialogButton onClick={() => confirm(value)}>Confirm</DialogButton>
          <DialogButton onClick={cancel}>Cancel</DialogButton>
        </DialogOptions>
      </DialogContainer>
    </Modal>
  </Fragment>;
};

let Form = ({
  prevCourseName = '',
  prevCourseCode = '',
  prevFacultyName = '',
  name,
  confirm,
  cancel
}) => {
  const [state, setState] = useState({
    courseName: prevCourseName,
    courseCode: prevCourseCode,
    facultyName: prevFacultyName,
    file: {}
  });

  return <Fragment>
    <Backdrop onClick={cancel} />
    <Modal>
      <DialogContainer>
        <FormMessage>{/*Academic Year 2016-2017*/ name}</FormMessage>
        <DialogInput
          type='text'
          placeholder='Enter course name'
          value={state.courseName}
          onChange={({ target }) =>
            setState(
              produce(state, draft => {
                draft.courseName = target.value;
              })
            )
          }
        />
        <DialogInput
          type='text'
          placeholder='Enter course code'
          value={state.courseCode}
          onChange={({ target }) =>
            setState(
              produce(state, draft => {
                draft.courseCode = target.value;
              })
            )
          }
        />
        <DialogInput
          type='text'
          placeholder='Enter faculty name'
          value={state.facultyName}
          onChange={({ target }) =>
            setState(
              produce(state, draft => {
                draft.facultyName = target.value;
              })
            )
          }
        />
        <DialogMessage>
          Upload an excel sheet with the data to be parsed in the specified
          format:-
        </DialogMessage>
        <Files
          className='files-dropzone'
          onChange={files =>
            setState(
              produce(state, draft => {
                draft.file = files[0];
              })
            )
          }
          onError={err => console.log(err.code + ':' + err.message)}
          accepts={['.xlsx']}
          multiple={false}
          maxFiles={1}
          maxFileSize={10000000}
          minFileSize={0}
          clickable>
          Drop files here or click to upload
        </Files>
        <DialogMessage gray>{"name" in state.file ? state.file.name: ""}</DialogMessage>
        <DialogOptions>
          <DialogButton onClick={() => confirm(_.cloneDeep(state))}>
            Confirm
          </DialogButton>
          <DialogButton onClick={cancel}>Cancel</DialogButton>
        </DialogOptions>
      </DialogContainer>
    </Modal>
  </Fragment>;
};

export { Dialog, Renamer, Form };
