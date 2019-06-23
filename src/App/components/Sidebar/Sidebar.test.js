// External Modules
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { Sidebar } from './Sidebar'

describe('<Sidebar />',() => {
 let wrapper;
 beforeEach(() => {
  wrapper = shallow(<Sidebar />);
 })

 it('should have atleast one test', () => {
  expect(true).toBeTruthy();
 });
})