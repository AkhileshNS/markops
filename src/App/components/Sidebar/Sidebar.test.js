// External Modules
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { Sidebar } from './Sidebar';
import { List, ListItem } from './Sidebar.styles';

describe('<Sidebar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Sidebar />);
  });

  it('should render a list of dates', () => {
    wrapper.setProps({
      dates: [
        {
          name: 'AY 2016-2017'
        },
        {
          name: 'AY 2017-2018'
        }
      ]
    });
    expect(wrapper.find(List).children()).toHaveLength(2);
  });

  it('should set "selected" as true in the ListItem whose index === props.selected', () => {
    wrapper.setProps({
      dates: [
        {
          name: 'AY 2016-2017'
        },
        {
          name: 'AY 2017-2018'
        }
      ],
      selectedDate: 1
    });
    expect(wrapper.find(ListItem).get(0).props.selected).toBeFalsy();
    expect(wrapper.find(ListItem).get(1).props.selected).toBeTruthy();
  });
});
