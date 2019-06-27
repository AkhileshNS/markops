// External Modules
import React, { useState, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

// Global Functions and Components
import { derive } from 'global/functions';
import { Dialog, Renamer } from 'global/components/Modal/Modal';

// Local Styles
import {
  SidebarContainer,
  List,
  ListItem,
  ListItemTitle,
  AddButton,
  Input
} from './Sidebar.styles';

const SidebarMenu = () => (
  <ContextMenu id="sidebar-menu">
    <MenuItem onClick={(e, data) => data.setUpdate(data.batch)}>
      Rename
    </MenuItem>
    <MenuItem onClick={(e, data) => data.setDeletion(data.batch)}>
      Delete
    </MenuItem>
  </ContextMenu>
);

const Sidebar = ({
  dates = [{
    name: '2016 Batch'
  }, {
    name: '2017 Batch'
  }],
  selectedDate = 0,
  setSelected = i => console.log(`Item ${i + 1} was selected`),
  pushBatch = batch => console.log(`New batch ${batch} added`),
  updateBatch = batch => console.log(`${batch} updated`),
  deleteBatch = batch => console.log(`${batch} deleted`),
  setRoute
}) => {
  const [value, setValue] = useState('');
  const [deletion, setDeletion] = useState(''); // deletion and update hold the name of a batch 
  const [update, setUpdate] = useState('');

  return <Fragment>
    <SidebarContainer>
      <Input
        placeholder='Enter Batch (Ex: 2016 Batch)'
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <AddButton
        onClick={() => {
          pushBatch(value);
          setValue('');
        }}>
        Add new batch
      </AddButton>
      <List>
        {dates.map(({batch}, i) => (
          <ContextMenuTrigger 
            id="sidebar-menu"
            key={`Sidebar Option (${i}) ${batch}`}
            batch={batch}
            setDeletion={setDeletion}
            setUpdate={setUpdate}
            collect={({batch, setDeletion, setUpdate}) => ({batch, setDeletion, setUpdate})}>
            <ListItem
              onClick={() => {
                setSelected(i);
                setRoute('/all')
              }}
              selected={selectedDate === i}>
              <ListItemTitle>{batch}</ListItemTitle>
            </ListItem>
          </ContextMenuTrigger>
        ))}
      </List>
      <SidebarMenu />
    </SidebarContainer>
    {deletion!=="" ? <Dialog 
      message="Are you sure you wish to delete this batch? (Note. All the entries inside the batch will be deleted as well)" 
      confirm={() => {
        deleteBatch(deletion);
        setDeletion("");
      }} 
      cancel={() => setDeletion("")} 
    /> : null}
    {update!=="" ? <Renamer 
      message="Enter the new batch name:-"
      prevName={update}
      confirm={value => {
        updateBatch(update, value);
        setUpdate("");
      }}
      cancel={() => setUpdate("")}
    /> : null}
  </Fragment>;
};

const mapStoresToProps = derive({
  dates: 'appStore.data',
  selectedDate: 'appStore.selected',
  pushBatch: 'appStore',
  updateBatch: 'appStore',
  deleteBatch: "appStore",
  setRoute: "appStore",
  setSelected: "appStore"
});

export { Sidebar };
export default inject(mapStoresToProps)(observer(Sidebar));
