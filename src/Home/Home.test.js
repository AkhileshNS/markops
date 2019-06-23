// External Modules
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { Home } from './Home'

describe('<Home />', () => {
 let wrapper;
 beforeEach(() => {
  wrapper = shallow(<Home />);
 })

 it('should have atleast one test', () => {
  expect(true).toBeTruthy();
 });
})