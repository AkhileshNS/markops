// External Modules
import React from 'react';
import Files from 'react-files';

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

const Modal = ({ children }) => <ModalContainer>{children}</ModalContainer>;

const Dialog = props => (
  <Modal>
    <DialogContainer>
      <DialogMessage>
        Are you sure you wish to delete this folder (Note. All the entries
        inside the folder will be deleted as well) ?
      </DialogMessage>
      <DialogOptions>
        <DialogButton>Yes, I'm Sure</DialogButton>
        <DialogButton>Cancel</DialogButton>
      </DialogOptions>
    </DialogContainer>
  </Modal>
);

const Renamer = props => (
  <Modal>
    <DialogContainer>
      <DialogMessage>Enter the new name for your folder:-</DialogMessage>
      <DialogInput type='text' />
      <DialogOptions>
        <DialogButton>Confirm</DialogButton>
        <DialogButton>Cancel</DialogButton>
      </DialogOptions>
    </DialogContainer>
  </Modal>
);

const Form = props => {
  return <Modal>
    <DialogContainer>
      <FormMessage>Academic Year 2016-2017</FormMessage>
      <DialogInput type='text' placeholder="Enter course name" />
      <DialogInput type='text' placeholder="Enter course code" />
      <DialogInput type='text' placeholder="Enter faculty name" />
      <DialogMessage>Upload an excel sheet with the data to be parsed in the specified format:-</DialogMessage>
      <Files
        className='files-dropzone'
        onChange={files => console.log(files)}
        onError={err => console.log(err.code + ":" + err.message)}  
        accepts={['.xlsx']}
        multiple={false}
        maxFiles={1}
        maxFileSize={10000000}
        minFileSize={0}
        clickable>
        Drop files here or click to upload
      </Files>
      <DialogOptions>
        <DialogButton>Confirm</DialogButton>
        <DialogButton>Cancel</DialogButton>
      </DialogOptions>  
    </DialogContainer>
  </Modal>;
};

export { Dialog, Renamer, Form };
