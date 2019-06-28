// External Modules
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { Home } from './Home'

// Local Functions
import { filterData, filterMapping } from './Home.functions';

describe('<Home />', () => {
 let wrapper;
 beforeEach(() => {
  wrapper = shallow(<Home />);
 })

 it('should have atleast one test', () => {
  expect(true).toBeTruthy();
 });

 it("should return a filtered mapping", () => {
  expect(filterMapping([
    [null,null,null,null],
    ["markops","PO1","PO2","PO3"],
    ["CO1",1,4,2],
    ["CO2",2,1,2],
    ["CO3",3,1,2],
    ["end",null,null,null]
  ])).toEqual([
    ["markops","Program outcome 1","Program outcome 2","Program outcome 3"],
    ["Course outcome 1",1,4,2],
    ["Course outcome 2",2,1,2],
    ["Course outcome 3",3,1,2]
  ])
 });
})