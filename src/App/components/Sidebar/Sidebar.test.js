// External Modules
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { Sidebar } from './Sidebar';
import {
  SidebarContainer,
  List,
  ListItem,
  ListItemTitle
} from './Sidebar.styles';

describe('<Sidebar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Sidebar />);
  });

  it('should render a list of dates', () => {
    wrapper.setProps({
      dates: ["AY 2016-2017","AY 2017-2018"]
    })
    expect(wrapper.matchesElement(<SidebarContainer>
      <List>
        <ListItem selected>
          <ListItemTitle>AY 2016-2017</ListItemTitle>
        </ListItem>
        <ListItem>
          <ListItemTitle>AY 2017-2018</ListItemTitle>
        </ListItem>
      </List>
    </SidebarContainer>)).toBeTruthy();
  });

  it('should set "selected" as true in the ListItem whose index === props.selected', () => {
    wrapper.setProps({
      dates: ["AY 2016-2017","AY 2017-2018"],
      selectedDate: 1
    })
    expect(wrapper.find(ListItem).get(0).props.selected).toBeFalsy();
    expect(wrapper.find(ListItem).get(1).props.selected).toBeTruthy();
  });
});
